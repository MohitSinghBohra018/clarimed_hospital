import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EnquiryForm from '../../../Components/Common/EnquiryForm';
import { CommonService } from "../../../services/common.service";

const DoctorProfile = () => {
  const { slug } = useParams(); // Get slug from URL
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);



  // ✅ Dynamic SEO Logic for Doctor Profile
  useEffect(() => {
    if (doctor) {
      // 1. Update the Browser Tab Title
      // Priority: Meta Title from API -> Doctor Name & Designation -> Default
      const pageTitle = doctor.meta_title || `${doctor.name} - ${doctor.designation || 'Specialist'} | ClariMed`;
      document.title = pageTitle;

      // 2. Update Meta Description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        const desc = doctor.meta_description || doctor.short_description || `Consult with ${doctor.name}, a leading specialist with ${doctor.experience_years}+ years of experience at ${doctor.hospital?.name}.`;
        metaDescription.setAttribute("content", desc);
      }

      // 3. Update Meta Keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        const keys = doctor.meta_keywords || `${doctor.name}, best doctor in ${doctor.city?.name}, ${doctor.designation}, ClariMed Healthcare`;
        metaKeywords.setAttribute("content", keys);
      }
    }

    // Cleanup: Reset title when leaving the profile page
    return () => {
      document.title = "ClariMed Healthcare";
    };
  }, [doctor]); // Runs whenever the doctor state changes

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);
        const response = await CommonService.getDoctorBySlug(slug);
        if (response.success) {
          setDoctor(response.data);
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [slug]);

  if (loading) return <div className="text-center mt-50"><h4>Loading Profile...</h4></div>;
  if (!doctor) return <div className="text-center mt-50"><h4>Doctor Not Found</h4></div>;

  return (
    <>
      <main>
        <div
          className="tp-breadcrumb-area tp-breadcrumb-overly"
          style={{
            padding: "30px 0",
            position: "relative",
            backgroundColor: "rgb(38, 89, 125)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden'
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              {/* Profile Image Section */}
              <div className="col-md-3 col-lg-3 text-center ">
                <div className="profile-img-wrap" style={{ position: 'relative', zIndex: 2 }}>
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    style={{
                      width: "100%",
                      maxWidth: "180px",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                    }}
                  />
                </div>
              </div>

              {/* Profile Content Section */}
              <div className="col-md-9 col-lg-9 text-white">
                <div className="tp-breadcrumb-content" style={{ position: 'relative', zIndex: 2 }}>
                  <div className="d-flex align-items-center flex-wrap gap-3 mb-2">
                    <h2 className="mb-0" style={{ fontSize: "32px", fontWeight: "700", color: 'white' }}>
                      {doctor.name}
                    </h2>
                    {/* <a
                      href={`https://wa.me/${doctor.hospital?.whatsapp || ''}`}
                      className="btn btn-sm d-flex align-items-center gap-2"
                      style={{
                        backgroundColor: "#25d366",
                        color: "white",
                        fontWeight: "600",
                        borderRadius: "50px",
                        padding: "6px 16px",
                        fontSize: "13px",
                        boxShadow: "0 4px 15px rgba(37, 211, 102, 0.3)"
                      }}
                    >
                      <i className="fab fa-whatsapp"></i> Get Online Medical Opinion
                    </a> */}
                  </div>

                  <div className="d-flex align-items-center flex-wrap gap-3 mb-3">
                    <span style={{
                      fontSize: "18px",
                      background: "rgba(255,255,255,0.15)",
                      padding: "2px 10px",
                      borderRadius: "4px"
                    }}>
                      {/* Show first department name or fallback to designation */}
                      { doctor.designation || "Specialist"}
                    </span>
                    <div className="d-flex align-items-center gap-1" style={{ fontSize: "14px" }}>
                      <span style={{ color: "#ffb400" }}>
                        <i className="fas fa-star"></i> {doctor.rating}
                      </span>
                      <span style={{ opacity: "0.8" }}>(Verified Reviews)</span>
                    </div>
                    <p style={{ color: 'white' }}>{doctor.short_description}</p>
                  </div>

                  {/* Info Grid */}
                 

                    {/* Info Grid: Polished icons and spacing */}
          <div className="d-flex flex-wrap gap-x-4 gap-y-2" style={{ fontSize: "14px", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "15px" }}>
            <div className="d-flex align-items-center gap-2" style={{ minWidth: "190px" }}>
              <i className="fas fa-briefcase text-info"></i> <span>{doctor.position}</span>
            </div>
            <div className="d-flex align-items-center gap-2" style={{ minWidth: "200px" }}>
              <i className="far fa-clock text-info"></i> <span>{doctor.experience_years}+ Years Experience</span>
            </div>
            <div className="d-flex align-items-center gap-2" style={{ minWidth: "200px" }}>
              <i className="fas fa-hospital text-info"></i> <span>{doctor.hospital?.name}</span>
            </div>
            <div className="d-flex align-items-center gap-2" style={{ minWidth: "200px" }}>
              <i className="fas fa-map-marker-alt text-info"></i> <span>{doctor.city?.name}, {doctor.country?.name}</span>
            </div>
            <div className="d-flex align-items-center gap-2" style={{ minWidth: "200px" }}>
              <i className="fas fa-globe text-info"></i> <span>Country: {doctor.country?.name}</span>
            </div>
          </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tp-tour-details-area pt-40 pb-40">
          <div className="container container-1350">
            <div className="row">
              <EnquiryForm />
              
              <div className="col-lg-8">
                <div className="tp-tour-details-content-wrap">
                  {/* DYNAMIC BIO CONTENT FROM API */}
                  <div 
                    className="doctor-bio-content"
                    dangerouslySetInnerHTML={{ __html: doctor.bio }} 
                  />
                  
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DoctorProfile;