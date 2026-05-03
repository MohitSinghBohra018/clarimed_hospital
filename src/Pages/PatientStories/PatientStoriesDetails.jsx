import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import EnquiryForm from "../../Components/Common/EnquiryForm";
import { PatientService } from "../../services/patient.service";

const PatientStoriesDetails = () => {

    const { slug } = useParams(); 
    const [stories, setStories] = useState(null);
    const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchDetails = async () => {
          try {
            const response = await PatientService.getPatientStoryDetails(slug);
          
            setStories(response.data); 
            console.log("Fetched Patient Story:", response.data); // Debug log
          } catch (error) {
            console.error("Error loading patient story:", error);
          } finally {
            setLoading(false);
          }
        };
    
        if (slug) fetchDetails();
      }, [slug]);
    
      if (loading) return <div className="text-center pt-100 pb-100"><h4>Loading...</h4></div>;
      if (!stories) return <div className="text-center pt-100 pb-100">
      <h3>Patient story not found.</h3>
      </div>;
  return (
    <main>
      {/* Breadcrumb Section */}
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
                  style={{ fontSize: "34px" }}
                >
                 {stories.title}
                </h2>

                <p
                  className="tp-breadcrumb-title  text-center mb-0"
                  style={{ fontSize: "18px", marginTop: "6px" }}
                >
                  {" "}
                  {/* News & Events: Official update */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="tp-tour-details-area pt-50 pb-50"
        style={{ backgroundColor: "rgb(240, 248, 255)" }}
      >
        <div className="container container-1350">
          <div className="row">
            {/* Left Side: Doctor Cards & Filter */}
            {/* tp-tour-details-area-start */}
            <div className="tp-tour-details-area pt-10">
              <div className="container container-1350">
                <div className="row gx-25">
                  <div className="col-12">
                    <div className="tp-tour-details">
                      <div className="tp-tour-details-price-wrap mb-35 d-flex align-items-center flex-wrap gap-2 justify-content-between">
                        <div className="d-flex align-items-center flex-wrap mb-10">
                          <div className="tp-tour-review-meta d-flex align-items-center"></div>
                        </div>
                      </div>

                      <div className="tp-tour-details-content-wrap tp-tour-details-3-content-wrap mt-30">
                        <div className="row ">
                          <EnquiryForm />
                          <div className="col-lg-7">
                            <div className="tp-tour-details-gallery-wrap tp-tour-details-3-gallery-wrap">
                              <div className="row ">
                                <div className="col-lg-12 mb-10">
                                  <div className="tp-tour-details-content tp-tour-details-3-content mb-30">
                                    <img
                                      src={stories.image}
                                      alt="Hospital Image"
                                      className="mb-30 w-100"
                                    />

                                   <p 
  className="your-class-name" 
  dangerouslySetInnerHTML={{ __html: stories.description }} 
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PatientStoriesDetails;
