import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CommonService } from "../../services/common.service";

const CityFilter = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState("");

  const [cities, setCities] = useState([]);
  const [treatments, setTreatments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHospitals();
    fetchDepartments();
  }, []);

  // ✅ Fetch Cities (ONLY VALID API CITIES)
  const fetchHospitals = async () => {
    try {
      const res = await CommonService.getHospitals("india", "");
      const data = res?.data || res;

      if (Array.isArray(data)) {
        const cityList = data.map((h) => h?.city?.name).filter(Boolean);

        const uniqueCities = [...new Set(cityList)].map((city) => ({
          label: city,
          value: city, // IMPORTANT → must match IndiaHospital
        }));

        setCities(uniqueCities);
      }
    } catch (error) {
      console.error("City API Error:", error);
    }
  };

  // ✅ Fetch Treatments
  const fetchDepartments = async () => {
    try {
      const res = await CommonService.getHeaderData();
      const deptData = res[1]?.data || res[1];

      if (Array.isArray(deptData)) {
        setTreatments(deptData);
      }
    } catch (error) {
      console.error("Department API Error:", error);
    }
  };

  // ✅ Search (ONLY pass valid values)
  const handleCitySearch = () => {
    const params = new URLSearchParams();

    const validCity = cities.find((c) => c.value === selectedCity);

    if (validCity) {
      params.set("city", validCity.value);
    }

    if (selectedTreatment) {
      params.set("department", selectedTreatment);
    }

    navigate(
      `/hospitals/india${
        params.toString() ? `?${params.toString()}` : ""
      }`
    );
  };

  // ✅ Card Click (only valid cities already)
  const handleCityCardClick = (cityValue) => {
    const params = new URLSearchParams();
    params.set("city", cityValue);

    navigate(`/hospitals/india?${params.toString()}`);
  };

  return (
    <>
      <section
        className="tp-destination-area pt-40 pb-100"
        style={{ backgroundColor: "#ecf5f5", overflowX: "hidden" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="tp-section-title-wrapper text-center mb-50">
                <h2
                  className="tp-section-title"
                  style={{
                    fontSize: 27,
                    color: "var(--tp-common-black)",
                    marginBottom: 15,
                  }}
                >
                  World-Class Care, Anywhere You Need It.
                </h2>
                <p style={{ color: "var(--tp-grey-1)", fontSize: 16 }}>
                  Our network connects you with elite medical hubs across the
                  Country—giving you the power to choose the right expertise at
                  the right price.
                </p>
              </div>
            </div>
          </div>
  <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">
      <div className="col">
        <div
          className="tp-destination-item d-flex align-items-center"
          style={{
            background: "#fff",
            border: "1.5px solid rgb(4, 57, 110)",
            borderRadius: 12,
            padding: "15px 18px",
            transition: "0.3s",
            // cursor: "pointer"
          }}
        >


          <div
            className="tp-location-marker me-3"
            style={{
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <i
              className="fa-solid fa-location-dot"
              style={{ color: "rgb(4, 57, 110)" }}
            />
          </div>
          <span style={{ fontWeight: 700, color: "rgb(4, 57, 110)", fontSize: 17 }}>
            Delhi/NCR
          </span>
        </div>
      </div>

      <div className="col">
        <div
          className="tp-destination-item d-flex align-items-center"
          style={{
            background: "#fff",
            border: "1.5px solid rgb(4, 57, 110)",
            borderRadius: 12,
            padding: "15px 18px",
            transition: "0.3s",
            cursor: "pointer"
          }}
        >
          <div
            className="tp-location-marker me-3"
            style={{
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <i
              className="fa-solid fa-location-dot"
              style={{ color: "rgb(4, 57, 110)" }}
            />
          </div>
          <span style={{ fontWeight: 700, color: "rgb(4, 57, 110)", fontSize: 17 }}>
            Chennai
          </span>
        </div>
      </div>
      <div className="col">
        <div
          className="tp-destination-item d-flex align-items-center"
          style={{
            background: "#fff",
            border: "1.5px solid rgb(4, 57, 110)",
            borderRadius: 12,
            padding: "15px 18px",
            transition: "0.3s",
            cursor: "pointer"
          }}
        >
          <div
            className="tp-location-marker me-3"
            style={{
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <i
              className="fa-solid fa-location-dot"
              style={{ color: "rgb(4, 57, 110)" }}
            />
          </div>
          <span style={{ fontWeight: 700, color: "rgb(4, 57, 110)", fontSize: 17 }}>
            Mumbai
          </span>
        </div>
      </div>
      <div className="col">
        <div
          className="tp-destination-item d-flex align-items-center"
          style={{
            background: "#fff",
            border: "1.5px solid rgb(4, 57, 110)",
            borderRadius: 12,
            padding: "15px 18px",
            transition: "0.3s",
            cursor: "pointer"
          }}
        >
          <div
            className="tp-location-marker me-3"
            style={{
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <i
              className="fa-solid fa-location-dot"
              style={{ color: "rgb(4, 57, 110)" }}
            />
          </div>
          <span style={{ fontWeight: 700, color: "rgb(4, 57, 110)", fontSize: 17 }}>
            Bangalore
          </span>
        </div>
      </div>
      <div className="col">
        <div
          className="tp-destination-item d-flex align-items-center"
          style={{
            background: "#fff",
            border: "1.5px solid rgb(4, 57, 110)",
            borderRadius: 12,
            padding: "15px 18px",
            transition: "0.3s",
            cursor: "pointer"
          }}
        >
          <div
            className="tp-location-marker me-3"
            style={{
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <i
              className="fa-solid fa-location-dot"
              style={{ color: "rgb(4, 57, 110)" }}
            />
          </div>
          <span style={{ fontWeight: 700, color: "rgb(4, 57, 110)", fontSize: 17 }}>
            Hyderabad
          </span>
        </div>
      </div>
      <div className="col">
        <div
          className="tp-destination-item d-flex align-items-center"
          style={{
            background: "#fff",
            border: "1.5px solid rgb(4, 57, 110)",
            borderRadius: 12,
            padding: "15px 18px",
            transition: "0.3s",
            cursor: "pointer"
          }}
        >
          <div
            className="tp-location-marker me-3"
            style={{
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <i
              className="fa-solid fa-location-dot"
              style={{ color: "rgb(4, 57, 110)" }}
            />
          </div>
          <span style={{ fontWeight: 700, color: "#006666", fontSize: 17 }}>
            Kolkata{" "}
          </span>
        </div>
      </div>
    </div>

          {/* Search Section */}
          <div className="row justify-content-center mt-60">
            <div className="col-xl-9 col-lg-11 col-md-12">
              <div
                className="tp-search-container text-center"
                style={{ position: "relative" }}
              >
                <div className="tp-search-box-wrap">

                  {/* Treatment */}
                  <div
                    className="tp-search-input-item"
                    style={{ border: "1px solid #006666" }}
                  >
                    <label className="tp-label">Select Treatment</label>

                    <select
                      value={selectedTreatment}
                      onChange={(e) => setSelectedTreatment(e.target.value)}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontSize: 16,
                        fontWeight: 600,
                        width: "100%",
                      }}
                    >
                      <option value="">Choose Treatment...</option>

                      {treatments.map((dept) => (
                        <option key={dept.id} value={dept.slug}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City */}
                  <div
                    className="tp-search-input-item"
                    style={{
                      border: "1px solid #006666",
                      padding: 10,
                      borderRadius: 8,
                    }}
                  >
                    <label className="tp-label">Select City</label>

                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontSize: 16,
                        fontWeight: 600,
                        width: "100%",
                      }}
                    >
                      <option value="">Choose City...</option>

                      {cities.map((city) => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={handleCitySearch}
                  style={{
                    position: "absolute",
                    bottom: "-25px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgb(4, 57, 110)",
                    color: "#fff",
                    padding: "14px 45px",
                    borderRadius: 50,
                    fontWeight: 700,
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass me-2" />
                  Search Hospital
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CityFilter;