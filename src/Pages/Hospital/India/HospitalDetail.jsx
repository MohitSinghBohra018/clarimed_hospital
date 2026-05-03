import React, { useEffect, useState } from "react";
import EnquiryForm from "../../../Components/Common/EnquiryForm";
import { Link, useParams } from "react-router-dom";
import { CommonService } from "../../../services/common.service";

const HospitalDetail = () => {
  const { slug } = useParams();

  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);


  // ✅ Dynamic SEO Update for Hospital Detail
  useEffect(() => {
    if (hospital) {
      // 1. Update the Browser Tab Title
      // Priority: Meta Title from API -> Hospital Name -> Default
      document.title = hospital.meta_title || `${hospital.name} | ClariMed Healthcare`;

      // 2. Update Meta Description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          hospital.meta_description || `Learn more about ${hospital.name}. Facilities, doctors, and specialties.`
        );
      }

      // 3. Update Meta Keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute(
          "content",
          hospital.meta_keywords || "hospital, healthcare, doctor"
        );
      }
    }
    
    // Optional: Cleanup when leaving the page to return to default title
    return () => {
      document.title = "ClariMed Healthcare";
    };
  }, [hospital]); // Runs whenever the hospital data is loaded

  useEffect(() => {
    fetchHospital();
  }, [slug]);

  const fetchHospital = async () => {
    try {
      setLoading(true);

      const res = await CommonService.getHospitalBySlug(slug);

      // ⚠️ Adjust according to API response
      const data = res?.data?.data || res?.data;

      setHospital(data);
    } catch (error) {
      console.error("Hospital Detail API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  if (!hospital) {
    return <h3 className="text-center mt-5">No Data Found</h3>;
  }

  return (
    <main>
      {/* 🔥 Dynamic Title */}
      <div
        className="tp-breadcrumb-area tp-breadcrumb-overly bg-position"
        style={{ padding: "50px", backgroundColor: "#346fa3" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="tp-breadcrumb-wrap text-center">
                <h2
                  className="tp-breadcrumb-title mb-0"
                  style={{ fontSize: "36px" }}
                >
                  {hospital.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="tp-tour-details-area pb-50"
        style={{ backgroundColor: "#f0f8ff" }}
      >
        <div className="container container-1350">
          <div className="row">
            <div className="tp-tour-details-area pt-10">
              <div className="container container-1350">
                <div className="row gx-25">
                  <div className="col-12">
                    <div className="tp-tour-details">
                      <div className="tp-tour-details-content-wrap mt-30">
                        <div className="row">
                          <EnquiryForm />

                          <div className="col-lg-7">
                            {/* 🔥 IMAGE */}
                            <img
                              src={hospital.main_image}
                              alt={hospital.name}
                              className="mb-30 w-100"
                            />

                            {/* 🔥 INFO GRID */}
                            <div
                              className="hospital-info-grid mb-40 p-4"
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "15px",
                                border: "1px solid #e1e1e1",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                              }}
                            >
                              <div className="row g-4">
                                {/* Doctors List */}
                                <div className="col-md-4 col-sm-6 border-end border-bottom pb-3">
                                  <div className="d-flex align-items-center">
                                    <i
                                      className="fa-solid fa-user-doctor me-3"
                                      style={{
                                        fontSize: "24px",
                                        color: "#346fa3",
                                      }}
                                    ></i>
                                    <div>
                                      <span
                                        className="d-block text-secondary"
                                        style={{ fontSize: "14px" }}
                                      >
                                        Doctors{" "}
                                      </span>
                                      <span className="fw-bold d-block">
                                        {hospital.doctors_count || "N/A"}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/*  */}
                                {/* Location */}
                                <div className="col-md-4 col-sm-6 border-end border-bottom pb-3">
                                  <div className="d-flex align-items-center">
                                    <i
                                      className="fa-solid fa-location-dot me-3"
                                      style={{
                                        fontSize: "24px",
                                        color: "#346fa3",
                                      }}
                                    ></i>
                                    <div>
                                      <span
                                        className="d-block text-secondary"
                                        style={{ fontSize: "14px" }}
                                      >
                                        Location
                                      </span>
                                      <span className="fw-bold d-block">
                                        {hospital.city?.name ||
                                          hospital.address}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/*  */}

                                {/* Established */}
                                <div className="col-md-4 col-sm-6 border-bottom pb-3">
                                  <div className="d-flex align-items-center">
                                    <i
                                      className="fa-solid fa-award me-3"
                                      style={{
                                        fontSize: "24px",
                                        color: "#346fa3",
                                      }}
                                    ></i>
                                    <div>
                                      <span
                                        className="d-block text-secondary"
                                        style={{ fontSize: "14px" }}
                                      >
                                        Established in
                                      </span>
                                      <span className="fw-bold d-block">
                                        {hospital.established_year}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-4 col-sm-6 border-end pt-3">
                                  <div className="d-flex align-items-center">
                                    <i
                                      className="fa-solid fa-hand-holding-heart me-3"
                                      style={{
                                        fontSize: "24px",
                                        color: "#346fa3",
                                      }}
                                    ></i>
                                    <div>
                                      <span
                                        className="d-block text-secondary"
                                        style={{ fontSize: "14px" }}
                                      >
                                        Specialty
                                      </span>
                                       <span className="fw-bold d-block">
                                      {hospital.speciality || "Super Specialty"}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* campus */}
                                <div className="col-md-4 col-sm-6 border-end pt-3">
                                  <div className="d-flex align-items-center">
                                    <i
                                      className="fa-solid fa-images me-3"
                                      style={{
                                        fontSize: "24px",
                                        color: "#346fa3",
                                      }}
                                    ></i>
                                    <div>
                                      <span
                                        className="d-block text-secondary"
                                        style={{ fontSize: "14px" }}
                                      >
                                        Campus Size:
                                      </span>
                                       <span className="fw-bold d-block">
                                      {hospital.size || "N/A"}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-4 col-sm-6 pt-3">
                                  <div className="d-flex align-items-center">
                                    <i
                                      className="fa-solid fa-bed me-3"
                                      style={{
                                        fontSize: "24px",
                                        color: "#346fa3",
                                      }}
                                    ></i>
                                    <div>
                                      <span
                                        className="d-block text-secondary"
                                        style={{ fontSize: "14px" }}
                                      >
                                        Number of beds
                                      </span>
                                       <span className="fw-bold d-block">
                                      {hospital.bed_capacity}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* 🔥 DESCRIPTION */}
                            {/* <h3 className="fw-600 mb-25">About Hospital</h3> */}

                            <div
                              dangerouslySetInnerHTML={{
                                __html: hospital.description,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HospitalDetail;
