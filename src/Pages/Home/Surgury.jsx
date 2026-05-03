import React, { useState } from "react";

import icon from "../../../assets/img/icon/apendectomy.png"
import icon1 from "../../../assets/img/icon/kidney.png"
import icon2 from "../../../assets/img/icon/cataract-eye.png"
import icon3 from "../../../assets/img/icon/laser-eye.png"
import icon4 from "../../../assets/img/icon/piles.png"
import icon5 from "../../../assets/img/icon/hernia.png"
const Surgury = () => {
  const [showAll, setShowAll] = useState(false);

  const toggleSurgeries = () => {
    setShowAll(!showAll);
  };

  // Helper to manage extra item visibility
  const extraItemStyle = { display: showAll ? "block" : "none" };

  return (
    <>
      <section
        className="specialty-area pt-50 pb-40"
        style={{
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
          backgroundColor: "#f8f8f8",
        }}
      >
        <div className="container">
          <div className="row" id="surgery-container">
            <div className="tp-section-title-wrapper text-center mb-50">
              <h2
                className="tp-section-title"
                style={{
                  fontSize: 27,
                  color: "var(--tp-common-black)",
                  marginBottom: 15,
                }}
              >
                Advanced Surgical Care, Wherever You Choose
              </h2>
              <p style={{ color: "var(--tp-grey-1)", fontSize: 16 }}>
                Find the best surgical care nationwide—expert doctors, trusted
                hospitals, and transparent pricing.
              </p>
            </div>

            {/* --- Regular Items (Always Visible) --- */}
            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3323/3323110.png"
                    alt="gall bladder"
                    style={{ width: 55 }}
                  />
                </div>
                <h4 className="tp-specialty-title">Gall bladder Stone</h4>
              </div>
            </div>

            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src={icon}
                    style={{ width: 70 }}
                    alt="Paediatrics"
                  />
                </div>
                <h4 className="tp-specialty-title">Appendectomy</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src={icon1}
                    alt="Paediatrics"
                    style={{ width: 80 }}
                  />
                </div>
                <h4 className="tp-specialty-title">Kidney Stone</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src={icon2}
                    alt="Paediatrics"
                    style={{ width: 90 }}
                  />
                </div>
                <h4 className="tp-specialty-title">Cataract</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src={icon3}
                    alt="Paediatrics"
                    style={{ width: 100 }}
                  />
                </div>
                <h4 className="tp-specialty-title">Lasik Eye Surgery</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src={icon4}
                    alt="Paediatrics"
                    style={{ width: 80 }}
                  />
                </div>
                <h4 className="tp-specialty-title">Piles</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src={icon5}
                    alt="Paediatrics"
                    style={{ width: 80 }}
                  />
                </div>
                <h4 className="tp-specialty-title">Hernia</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src="https://svenkneeclinic.co.uk/wp-content/uploads/2023/10/Knee_replacement_total.png"
                    alt="Paediatrics"
                    style={{ width: 70 }}
                  />
                </div>
                <h4 className="tp-specialty-title">Knee Replacement</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1974/1974660.png"
                    alt="Paediatrics"
                    style={{ width: 80 }}
                  />
                </div>
                <h4 className="tp-specialty-title">Hip Replacement</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src="https://png.pngtree.com/png-vector/20221109/ourmid/pngtree-backbone-care-organ-surgery-vector-png-image_40938814.jpg"
                    alt="Paediatrics"
                    style={{ width: 80 }}
                  />
                </div>
                <h4 className="tp-specialty-title">Spine Surgery</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src="https://www.carewellmedicalcentre.com/wp-content/uploads/2025/04/laser-circumcision-icon.webp"
                    alt="Paediatrics"
                    width="90px"
                  />
                </div>
                <h4 className="tp-specialty-title">Laser Circumcision</h4>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30">
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src="https://media.istockphoto.com/id/936377118/vector/sinus-system-icon.jpg?s=612x612&w=0&k=20&c=e41i79mUIBbJUmRirFRnyV7k8P3_9Mp0Y-INsm4Glx4="
                    alt="Paediatrics"
                    style={{ width: 70 }}
                  />
                </div>
                <h4 className="tp-specialty-title">FESS</h4>
              </div>
            </div>

            {/* --- Extra Items (Conditional Visibility) --- */}
            <div
              className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30 extra-content "
              style={extraItemStyle}
            >
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxTArOGJVY20eIwM_s6lFFtMwQ681itTz2IA&s"
                    alt="Paediatrics"
                    style={{ width: 90 }}
                  />
                </div>
                <h4 className="tp-specialty-title">Rhinoplasty</h4>
              </div>
            </div>
            <div
              className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30 extra-content"
              style={extraItemStyle}
            >
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src="https://media.istockphoto.com/id/986035762/vector/hospital-bed-icon.jpg?s=612x612&w=0&k=20&c=Qak1IzMqd5PNccC3YFsZQyVj27p4mBGUV2Ys3_sp6QM="
                    alt="Paediatrics"
                    style={{ width: 100 }}
                  />
                </div>
                <h4 className="tp-specialty-title">Normal Delivery</h4>
              </div>
            </div>
            <div
              className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30 extra-content"
              style={extraItemStyle}
            >
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src="https://www.shutterstock.com/image-vector/cesarean-section-scar-icon-600nw-2306662021.jpg"
                    alt="Paediatrics"
                    style={{ width: 100 }}
                  />
                </div>
                <h4 className="tp-specialty-title">C - Section</h4>
              </div>
            </div>
            <div
              className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30 extra-content"
              style={extraItemStyle}
            >
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src="https://www.ivein.com/wp-content/uploads/Varicocele-1.jpg"
                    alt="Paediatrics"
                    style={{ width: 90 }}
                  />
                </div>
                <h4 className="tp-specialty-title">Varicocele</h4>
              </div>
            </div>
            <div
              className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30 extra-content"
              style={extraItemStyle}
            >
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/10136/10136035.png"
                    alt="Paediatrics"
                    style={{ width: 85 }}
                  />
                </div>
                <h4 className="tp-specialty-title">Uterine Fibroid</h4>
              </div>
            </div>
            <div
              className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-30 extra-content"
              style={extraItemStyle}
            >
              <div className="tp-specialty-card text-center">
                <div className="tp-specialty-icon">
                  <img
                    src="https://www.shutterstock.com/image-vector/diseases-anus-hemorrhoids-anal-fissures-600nw-2435422143.jpg "
                    style={{ width: 120 }}
                    alt="Paediatrics"
                  />
                </div>
                <h4 className="tp-specialty-title">Anal Fissure</h4>
              </div>
            </div>

            {/* --- Toggle Button --- */}
            <div className="col-12 text-center mt-20">
              <button
                onClick={toggleSurgeries}
                type="button"
                style={{
                  width: 320,
                  background: "rgb(4, 57, 110)",
                  color: "#ffffff",
                  border: "2px solid #ffffff",
                  padding: "14px 45px",
                  borderRadius: 50,
                  fontWeight: 700,
                  boxShadow: "0 8px 20px rgba(0, 102, 102, 0.25)",
                  cursor: "pointer",
                }}
              >
                {showAll ? "View Less Surgery" : "View All Surgery"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Surgury;
