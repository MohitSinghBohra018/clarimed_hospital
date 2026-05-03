import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CommonService } from "../../services/common.service";

const HospitalLocation = () => {
  const [hospitals, setHospitals] = useState([]);
  const [cities, setCities] = useState(["All"]);
  const [selectedCity, setSelectedCity] = useState("All");
  const [currentPosition, setCurrentPosition] = useState(0);
  const [loading, setLoading] = useState(true);

  const cardWidth = 300;
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const res = await CommonService.getHospitals();

        let hospitalData = [];
        // Handle various API response structures
        if (Array.isArray(res)) {
          hospitalData = res;
        } else if (Array.isArray(res.data)) {
          hospitalData = res.data;
        } else if (Array.isArray(res.data?.data)) {
          hospitalData = res.data.data;
        }

        // ✅ FILTER: Only keep hospitals where is_featured is "1"
        const featuredHospitals = hospitalData.filter(
          (h) => h.is_featured == 1 || h.is_featured == 1,
        );

        console.log("Hospitals :" + hospitalData);
        setHospitals(featuredHospitals);

        // ✅ DYNAMIC CITIES: Get cities only from the featured hospitals
        const cityList = featuredHospitals
          .map((h) => h?.city?.name)
          .filter(Boolean);

        const uniqueCities = ["All", ...new Set(cityList)];
        setCities(uniqueCities);
      } catch (err) {
        console.error("Error fetching hospitals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // ✅ FILTER BY SELECTED CITY
  const filteredHospitals =
    selectedCity === "All"
      ? hospitals
      : hospitals.filter((h) => h?.city?.name === selectedCity);

  // ✅ SLIDER LOGIC
  const moveSlider = (direction) => {
    if (filteredHospitals.length <= 1) return;
    const maxMove = (filteredHospitals.length - 1) * cardWidth;

    setCurrentPosition((prev) => {
      if (direction === 1 && Math.abs(prev) >= maxMove) return 0;
      if (direction === -1 && prev === 0) return -maxMove;
      return prev + direction * -cardWidth;
    });
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    if (filteredHospitals.length > 1) {
      autoPlayRef.current = setInterval(() => moveSlider(1), 3000);
    }
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [filteredHospitals]);

  useEffect(() => {
    setCurrentPosition(0);
  }, [selectedCity]);

  if (loading) {
    return (
      <div className="text-center py-5">Loading Featured Hospitals...</div>
    );
  }

  return (
    <section className="hospital-section">
      <div className="tp-section-title-wrapper text-center mb-50">
        <h2
          className="tp-section-title"
          style={{
            fontSize: 27,
            color: "var(--tp-common-black)",
            marginBottom: 15,
          }}
        >
          Top Hospitals in Every Location You Choose
        </h2>
      </div>

      {/* ✅ DYNAMIC TABS (FIXED) */}
      {/* <div className="filter-tabs">
        {cities.map((city, index) => (
          <button
            key={index}
            className={`filter-btn ${selectedCity === city ? 'active' : ''}`}
            onClick={() => setSelectedCity(city)}
          >
            {city === 'All' ? 'All Locations' : city}
          </button>
        ))}
      </div> */}

      {/* ✅ HORIZONTAL SCROLLABLE TABS */}
      <div className="filter-tabs-container">
        <div className="filter-tabs">
          {cities.map((city, index) => (
            <button
              key={index}
              className={`filter-btn ${selectedCity === city ? "active" : ""}`}
              onClick={() => setSelectedCity(city)}
            >
              {city === "All" ? "All Locations" : city}
            </button>
          ))}
        </div>
      </div>

      <div
        className="slider-container"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        <div className="slider-nav">
          <button onClick={() => moveSlider(-1)}>‹</button>
          <button onClick={() => moveSlider(1)}>›</button>
        </div>

        <div className="slider-wrapper">
          <div className="info-card">
            <h2>Our Hospital Network</h2>
            <p>
              Our hospital network delivers quality care for Medicare
              beneficiaries.
            </p>
            <Link to="/hospitals/india">
              <button className="cta-btn">
                View All Hospitals <span>›</span>
              </button>
            </Link>
          </div>

          <div className="cards-viewport">
            <div
              className="cards-track"
              style={{
                transform: `translateX(${currentPosition}px)`,
                transition: "transform 0.5s ease",
              }}
            >
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map((hospital) => (
                  <div key={hospital.id} className="hospital-card">
                    <img
                      src={hospital.main_image}
                      alt={hospital.name}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Hospital";
                      }}
                    />
                    <div className="card-content">
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          lineHeight: "1.4",
                          whiteSpace: "normal",
                          wordBreak: "keep-all", // ❗ don't break letters
                          overflowWrap: "break-word",
                        }}
                      >
                        {hospital.name}
                      </h3>
                      <div>⭐ {hospital.rating || 4.5}</div>
                      <p style={{ fontSize: "13px", color: "#666" }}>
                        {hospital.city?.name}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hospitals found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalLocation;
