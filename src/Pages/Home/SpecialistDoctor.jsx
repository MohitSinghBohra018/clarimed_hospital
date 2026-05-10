import React, { useEffect, useState } from 'react';
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CommonService } from '../../services/common.service';

const SpecialistDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch Doctors
    CommonService.getDoctors()
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          const featured = res.data.filter(doc => doc.is_featured == "1");
          setDoctors(featured);
        }
      })
      .catch((err) => console.error("Error fetching doctors:", err))
      .finally(() => setLoading(false));

    // 2. Fetch Settings (Now correctly inside useEffect)
    CommonService.getSettings()
      .then((res) => {
        const phone = res?.data?.phone || res?.phone;
        if (phone) {
          // Format number: remove spaces and non-digit characters except +
          setWhatsappNumber(phone.replace(/[^\d+]/g, ""));
        }
      })
      .catch((err) => console.error("Error fetching settings:", err));
  }, []); // Only one dependency array here

  if (loading) return <div className="text-center py-5">Loading Specialists...</div>;

  return (
    <>
      <section className="specialist-section">
        <div className="container">
          <div className="tp-section-title-wrapper text-center mb-50">
            <h2 className="tp-section-title" style={{ fontSize: 27, color: "var(--tp-common-black)", marginBottom: 15 }}>
              Connect With The Best Specialists For Your Treatment
            </h2>
            <p style={{ color: "var(--tp-grey-1)", fontSize: 16 }}>
              Access top specialists for your treatment, ensuring precision, expertise, and care.
            </p>
          </div>

          <div className="doctor-container">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <div className="dr-card" key={doctor.id}>
                  <div className="dr-img-box">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=Doctor'; }}
                    />
                  </div>
                  <div className="dr-details">
                    <div className="dr-header">
                      <h3>{doctor.name}</h3>
                      <span className="dr-rating">⭐ {doctor.rating}</span>
                    </div>
                    <p className="dr-specialty">{doctor.designation}</p>
                    <p className="dr-meta">💼 {doctor.experience_years} Years Experience</p>
                    <p className="dr-meta">🏥 {doctor.hospital?.name}</p>

                    <Link to={`/doctors/${doctor.slug}`}>
                      <button className="view-btn w-100">View Profile</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-100">No featured specialists available.</p>
            )}
          </div>
        </div>

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <Link to="/consultation-form">
            <button
              type="button"
              style={{
               display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
                background: "rgb(4, 57, 110)",
              color: "#fff",
              border: "none",
              padding: "14px 40px",
              borderRadius: "50px",
              fontWeight: 700,
              margin: "5px",
              maxWidth: "280px",
              width: "100%",
              gap: "6px",
              cursor: "pointer"
              }}
            >
              <FaPhoneAlt className="me-2" /> Enquiry Now
            </button>
          </Link>

          <button
            type="button"
            onClick={() => window.open(`https://wa.me/${whatsappNumber}`, "_blank")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgb(5 158 59)",
              color: "#fff",
              border: "none",
              padding: "14px 40px",
              borderRadius: "50px",
              fontWeight: 700,
              margin: "5px",
              maxWidth: "280px",
              width: "100%",
              gap: "6px",
              cursor: "pointer"
            }}
          >
            <FaWhatsapp color="#fff" size={25} />
            Chat on WhatsApp
          </button>
        </div>
      </section>
    </>
  );
};

export default SpecialistDoctor;