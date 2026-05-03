import React, { useEffect, useState } from "react";
import { CheckCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { CommonService } from "../../services/common.service";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await CommonService.getTeam();

        const data = res?.data?.data || res?.data || [];

        setTeam(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Team API Error:", error);
        setTeam([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <>
      {/* BREADCRUMB (same style) */}
      <div
        className="tp-breadcrumb-area tp-breadcrumb-overly bg-position"
        style={{ padding: "50px", backgroundColor: "#346fa3" }}
      >
        <div className="container">
          <div className="row justify-content-center">
             <div className="col-lg-12">
              <div className="tp-breadcrumb-wrap text-center">
                <h2
                  className="tp-breadcrumb-title  text-center mb-0"
                  style={{ fontSize: "40px" }}
                >
               Our Team

                </h2>

                <p
                  className="tp-breadcrumb-title  text-center mb-0"
                  style={{ fontSize: "18px", marginTop: "6px" }}
                >
                  {" "}
                Dedicated to exceptional care and compassionate support, we put your wellness at the heart of everything we do.


                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TEAM SECTION (same UI like your old design) */}
      <section className="tp-featured-team pt-120 pb-100" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">

          {loading ? (
            <h4 className="text-center">Loading team...</h4>
          ) : team.length === 0 ? (
            <h4 className="text-center">No Team Found</h4>
          ) : (
            team.map((member, index) => {
              const isReverse = index % 2 !== 0;

              return (
                <div
                  key={member.id}
                  className={`row align-items-center mb-100 ${
                    isReverse ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* IMAGE SIDE */}
                  <div className="col-lg-6">
                    <div
                      className={`tp-featured-thumb p-relative ${
                        isReverse ? "ms-lg-5" : "me-lg-5"
                      }`}
                    >
                      <div className="main-img-wrapper rounded-4 overflow-hidden shadow-lg">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-100 img-fluid"
                          style={{
                            minHeight: "500px",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      {/* EXPERIENCE BADGE */}
                      {/* <div
                        className="exp-badge bg-primary text-white p-4 rounded-4 position-absolute shadow-lg d-none d-md-block"
                        style={{
                          bottom: "-30px",
                          [isReverse ? "left" : "right"]: "-30px",
                        }}
                      >
                        <h3 className="mb-0 fw-bold text-white">
                          {member.experience?.replace(/\D/g, "") || "10+"}
                        </h3>
                        <span className="small uppercase text-white">
                          Years of Exp.
                        </span>
                      </div> */}
                    </div>
                  </div>

                  {/* DETAILS SIDE */}
                  <div className="col-lg-6">
                    <div className="tp-featured-details mt-50 mt-lg-0">

                      <span className="text-primary fw-bold text-uppercase ls-1 small mb-10 d-block">
                        {member.badge || "Leadership Team"}
                      </span>

                      <h2 className="display-6 fw-bold mb-10">
                        {member.name}
                      </h2>

                      <h5 className="text-muted mb-30 fw-medium">
                        {member.designation}
                      </h5>

                 <div
  className="lead text-secondary mb-40"
  dangerouslySetInnerHTML={{ __html: member.short_description }}
/>

                      {/* POINTS */}
                      <div className="tp-points mb-45">
                        {member.additional_points?.map((point, i) => (
                          <div
                            key={i}
                            className="d-flex align-items-center mb-3"
                          >
                            <CheckCircle size={22} className="text-primary me-3" />
                            <span className="fw-semibold text-dark">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* BUTTON */}
                      {/* <div className="d-flex gap-3">
                        <Link
                          to="/consultation-form"
                          className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm d-inline-flex align-items-center"
                        >
                          <Calendar size={18} className="me-2" />
                          Book Appointment
                        </Link>
                      </div> */}

                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* SAME CSS */}
        <style>{`
          .ls-1 { letter-spacing: 2px; }
          .main-img-wrapper img {
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          }
          .tp-featured-thumb:hover .main-img-wrapper img {
            transform: scale(1.05);
          }
          .tp-featured-details h2 {
            color: #002244;
          }
        `}</style>
      </section>
    </>
  );
};

export default Team;