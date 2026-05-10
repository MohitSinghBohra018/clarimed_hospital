import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CommonService } from "../../services/common.service";


export default function TreatmentPackagesSlider() {
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const cardWidth = 340;
  const [activeDot, setActiveDot] = useState(0);

  const totalDots = Math.ceil(packages.length / 2);

  const scrollNext = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    if (
      slider.scrollLeft + slider.offsetWidth >=
      slider.scrollWidth - 10
    ) {
      slider.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      slider.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: -cardWidth,
      behavior: "smooth",
    });
  };

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      scrollNext();
    }, 3000);
  };

  const stopAutoScroll = () => {
    clearInterval(intervalRef.current);
  };

  const resetAutoScroll = () => {
    stopAutoScroll();
    startAutoScroll();
  };
useEffect(() => {
  const fetchPackages = async () => {
    try {
      setLoading(true);

      const res = await CommonService.getPackages();

      if (res.success && Array.isArray(res.data)) {
        const featuredPackages = res.data.filter(
          (pkg) => pkg.is_featured == "1"
        );

        setPackages(featuredPackages);
      }

    } catch (err) {
      console.error("Package API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchPackages();
}, []);
  // useEffect(() => {
  //   startAutoScroll();

  //   return () => stopAutoScroll();
  // }, []);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const index = Math.round(slider.scrollLeft / cardWidth);
    setActiveDot(index % totalDots);
  };

  return (
    <section className="med-pck-section">
      <div className="tp-section-title-wrapper text-center mb-50">
        <h2
          className="tp-section-title"
          style={{
            fontSize: "27px",
            color: "var(--tp-common-black)",
            marginBottom: "15px",
          }}
        >
          All-Inclusive Treatment Packages
        </h2>

        <p
          style={{
            color: "var(--tp-grey-1)",
            fontSize: "16px",
          }}
        >
          One package, complete care—covering consultations, procedures, and
          recovery for a smooth healthcare experience.
        </p>
      </div>

      <div className="med-pck-slider-outer">
        <button
          className="med-pck-nav-btn med-pck-prev"
          onClick={() => {
            scrollPrev();
            resetAutoScroll();
          }}
        >
          &#10094;
        </button>

        <button
          className="med-pck-nav-btn med-pck-next"
          onClick={() => {
            scrollNext();
            resetAutoScroll();
          }}
        >
          &#10095;
        </button>

        <div
          ref={sliderRef}
          className="med-pck-slider-inner"
          onScroll={handleScroll}
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
         {loading ? (
  <p style={{ textAlign: "center" }}>Loading packages...</p>
) : (
  packages.map((item) => (
    <div className="med-pck-card" key={item.id}>
      
      <div className="med-pck-image-box">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="med-pck-content">
        <p className="med-pck-cat">
          {item.speciality?.name || "Premium Care"}
        </p>

        <h3 className="med-pck-title">{item.name}</h3>

        {/* <p className="med-pck-loc">
          {item.hospital_name}, {item.location}
        </p> */}

        {/* <div className="med-pck-stats">
          <span>
            <b>{item.total_days}</b> Days Total
          </span>

          <span>
            <b>{item.hospital_days}</b> Hosp. Days
          </span>
        </div> */}
      </div>

      <div className="med-pck-footer">
        <div className="med-pck-price-grp">
          <span className="med-pck-label" style={{ fontWeight: 600 }}>
            Cost in INR
          </span>
          <span className="med-pck-amt">
             {item.cost_in_inr}
          </span>
        </div>

        <Link to="/consultation-form">
          <button className="med-pck-view-btn">
            Book Consultation
          </button>
        </Link>
      </div>

    </div>
  ))
)}
        </div>
      </div>

      <div className="med-pck-dots-wrap">
        {[...Array(totalDots)].map((_, index) => (
          <span
            key={index}
            className={`med-pck-dot ${
              activeDot === index ? "med-pck-active" : ""
            }`}
          />
        ))}
      </div>


      <div className="col-12 text-center mt-20">
      <Link to="all-packages">
              <button
                type="button"
                 style={{
                  width: 320,
                  background: "rgb(4, 57, 110)",
                  color: "#ffffff",
                  border: "2px solid #ffffff",
                  padding: "14px 16px",
                  borderRadius: 50,
                  fontWeight: 700,
                  boxShadow: "0 8px 20px rgba(0, 102, 102, 0.25)",
                  cursor: "pointer",
                }}
              >
              View  All Treatment Packages
              </button>
              </Link>
            </div>
    </section>
  );
}