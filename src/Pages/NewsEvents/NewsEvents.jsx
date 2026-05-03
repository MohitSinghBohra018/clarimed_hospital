import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EnquiryForm from "../../Components/Common/EnquiryForm";
import { NewsService } from "../../services/blog.service";


const NewsEvents = () => {

     const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
  
  
     useEffect(() => {
      const fetchAllNewsEvents = async () => {
        try {
          const response = await NewsService.getNewsEvents();
          
          setNews(response.data || response); 
        } catch (error) {
          console.error("Error fetching news:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAllNewsEvents();
    }, []);


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
                  style={{ fontSize: "36px" }}
                >
               Latest News & Events
                </h2>
                <p
                  className="tp-breadcrumb-title  text-center mb-0"
                  style={{ fontSize: "18px", marginTop: "6px" }}
                >
                  {" "}
                 Stay Updated: Read the latest updates, announcements, and event highlights.


                </p>
                {/* <div className="tp-breadcrumb-wrap text-center" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <p className="tp-breadcrumb-title text-center mb-0" style={{ fontSize: '19px' }}>Home</p> <span style={{ color: 'white' }}>/</span>
                  <p className="tp-breadcrumb-title fs-5 text-center mb-0" style={{ fontSize: '18px' }}> Cardiology</p>
                </div> */}
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
             {loading ? (
              <div className="col-12 text-center"><h4>Loading Blogs...</h4></div>
            ) : news.length > 0 ? (
              news.map((newsItem) => (
                  

          
            <div className="col-lg-8 mb-30">
              {/* --- NEW FILTER SECTION --- */}
              
              {/* --- END FILTER SECTION --- */}

              {/* Doctor Card 1 */}
              <div className="doctor-card-container" style={{padding: '18px 30px'}} key={newsItem.id}>
                <div className="doctor-card-content d-flex flex-column flex-md-row align-items-center" style={{height:'auto'}}>
                  <div className="doctor-image-wrapper me-md-5 mb-3 mb-md-0">
                    <img
                      src={newsItem.image || "https://medsurgeindia.com/wp-content/uploads/2025/12/Dr.-Raghav-Singla.jpg"}
                      alt={newsItem.title}
                      className="img-fluid"
                      style={{ height: "150px" , objectFit: 'cover'}}
                    />
                  </div>
                  <div className="doctor-info">
                    <h2 className="doctor-name">{newsItem.title}</h2>
                   
               
                    <div className="doctor-actions d-flex flex-wrap gap-2 mt-4">
                     
                   
                      <Link  to={`/news-events/${newsItem.slug}`} className="btn btn-book">
                        {" "}
                         Read More
                      </Link>
                      {/* <button className="btn btn-book"> <i className="fa-solid fa-calendar-plus me-1"></i> Book Appointment</button> */}
                    </div>
                  </div>
                </div>
              </div>
              

            </div>

              ))
            ) : (
              <div className="col-12 text-center"><h3>No Blogs Found</h3></div>
            )}
            


              <EnquiryForm/>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewsEvents;
