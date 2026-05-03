import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PatientService } from "../../services/patient.service";
PatientService

const PatientStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await PatientService.getPatientStories();
      
        setStories(response.data || []);
      } catch (error) {
        console.error("Error fetching patient stories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  // Helper function to format the date (e.g., "17 Apr 2026")
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

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
                <h2 className="tp-breadcrumb-title mb-0" style={{ fontSize: "34px", color: '#fff' }}>
                  Patient Stories
                </h2>
                <p className="text-center mb-0" style={{ fontSize: "18px", marginTop: "6px", color: '#fff' }}>
                  A patient fought a serious illness with courage and support from doctors and family. 
                  After treatment, they recovered and returned to a happy life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tp-tour-details-area pt-60 pb-60" style={{ backgroundColor: "#f4f7f9" }}>
        <div className="container container-1350">
          <div className="row g-4">
            {loading ? (
              <div className="col-12 text-center">
              <h3>Loading ...</h3>
              </div>
            ) : stories.length > 0 ? (
              stories.map((story) => (
                <div key={story.id} className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="card h-100 border-0 shadow-sm overflow-hidden" style={{ borderRadius: "15px" }}>
                    
                    {/* Card Image */}
                    <div className="position-relative">
                    <Link   to={`/patient-stories-details/${story.slug}`} >
                      <img 
                        src={story.image} 
                        alt={story.title} 
                        className="card-img-top" 
                        style={{ height: "220px", objectFit: "cover" }} 
                      />
                      </Link>
                      <div className="position-absolute bottom-0 start-0 bg-primary text-white px-3 py-1 m-3 rounded" style={{ fontSize: "12px", fontWeight: "600" }}>
                        {formatDate(story.created_at)}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="card-body d-flex flex-column p-4">
                      <h5 className="card-title mb-3" style={{ fontSize: "18px", fontWeight: "600", color: "#333", lineHeight: "1.5" }}>
                        {story.title}
                      </h5>
                      <p className="card-text text-muted mb-4" style={{ fontSize: "14px" }}>
                        {/* Stripping HTML tags for the short preview text */}
                        {story.description.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                      </p>
                      
                      <div className="mt-auto">
                        <Link 
                          to={`/patient-stories-details/${story.slug}`} 
                          className="fw-bold text-primary text-decoration-none d-inline-flex align-items-center" 
                          style={{ fontSize: "15px" }}
                        >
                          Read More <i className="fa-solid fa-arrow-right-long ms-2"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center"><h3>No Stories Found</h3></div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PatientStories;