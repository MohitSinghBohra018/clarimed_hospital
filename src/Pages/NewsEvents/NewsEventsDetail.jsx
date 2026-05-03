import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import EnquiryForm from "../../Components/Common/EnquiryForm";
import { NewsService } from "../../services/blog.service";


const NewsEventsDetail = () => {

  const { slug } = useParams(); 
    const [newsEvent, setNewsEvent] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchDetails = async () => {
        try {
          const response = await NewsService.getNewsEventDetails(slug);
        
          setNewsEvent(response.data); 
          console.log("Fetched News Event Details:", response.data); 
        } catch (error) {
          console.error("Error loading news event details:", error);
        } finally {
          setLoading(false);
        }
      };
  
      if (slug) fetchDetails();
    }, [slug]);
  
    if (loading) return <div className="text-center pt-100 pb-100"><h4>Loading...</h4></div>;
    if (!newsEvent) return <div className="text-center pt-100 pb-100"><h3>News Event not found.</h3></div>;

    
  return (
    <main>
      {/* Breadcrumb Section */}
      <div
        className="tp-breadcrumb-area tp-breadcrumb-overly bg-position"
        style={{ padding: "50px", backgroundColor: "#346fa3" }}
        data-background="assets/img/breadcrumb/bg-6.jpg"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="tp-breadcrumb-wrap text-center">
                <h2
                  className="tp-breadcrumb-title  text-center mb-0"
                  style={{ fontSize: "34px" }}
                >
                {newsEvent.title}
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
                                     src={newsEvent.image}
                                      alt={newsEvent.title}
                                      className="mb-30 w-100"
                                    />

                                    <p>
                                    <div 
                    dangerouslySetInnerHTML={{ __html: newsEvent.description }} 
                    style={{ lineHeight: '1.8', color: '#333', fontSize: '17px' }}
                  />
                                    </p>
                             

                                   {/* publish data  */}
                <div className="postbox-details-meta" style={{ borderTop: '1px solid #ddd', paddingTop: '20px', color: '#777' }}>
                  <span>Published on: {new Date(newsEvent.created_at).toLocaleDateString()}</span>
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
      </div>
    </main>
  );
};

export default NewsEventsDetail;
