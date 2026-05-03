import React, { useEffect, useState } from "react";
import { TestimonialService } from "../../services/blog.service";
import { CommonService } from "../../services/common.service";
import "./Patient.css";

const Patient = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [videoUrl, setVideoUrl] = useState(""); // State for dynamic video
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch testimonials and site settings in parallel
        const [res, settingsRes] = await Promise.all([
          TestimonialService.getTestimonials(),
          CommonService.getSettings() 
        ]);

        setTestimonials(res.data || []);
        
    
        if (settingsRes.success && settingsRes.data?.testimonial_video) {
          setVideoUrl(settingsRes.data.testimonial_video);
        }
      } catch (error) {
        console.error("ERROR FETCHING DATA:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);

  return (
    <section className="patient-feedback-section">
      <div className="testimonial-header">
        <h2>Patient Success Stories</h2>
        <p>Verified feedback from our community</p>
      </div>

      <div className="section-wrapper">
        <div className="video-container">
          <div className="video-box">
           
            {videoUrl ? (
              <video key={videoUrl} width="100%" height="auto" controls autoPlay muted loop>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="video-loader">
                {loading ? "Loading Video..." : "No Video Available"}
              </div>
            )}
          </div>
        </div>

        <div className="testimonial-container">
          {loading ? (
            <div className="loader"><h4>Loading...</h4></div>
          ) : testimonials.length > 0 ? (
            <div className="content-flex-container">
              <div className="review-card">
                <div className="stars-display">
                  {"★".repeat(Math.floor(testimonials[current].rating || 5))}
                </div>

                <blockquote className="feedback-quote">
                  "{testimonials[current].description}"
                </blockquote>

                <div className="patient-meta">
                  <div className="patient-avatar">
                    {testimonials[current].name?.charAt(0)}
                  </div>
                  <div className="patient-info">
                    <h4>{testimonials[current].name}</h4>
                    <p>{testimonials[current].badge || "Verified Patient"}</p>
                  </div>
                </div>
              </div>

              <div className="controls-footer">
                <div className="slider-dots">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${index === current ? "active" : ""}`}
                      onClick={() => setCurrent(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="google-review-badge">
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-google-icon-svg-download-png-1507807.png"
                    alt="Google Logo"
                  />
                  <div className="badge-text">
                    <span className="rating-num">4.9 Rating </span>
                    <span className="rating-stars">★★★★★</span>
                    <p className="review-count">(500+ Google Reviews)</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h4>No Testimonials Found</h4>
          )}
        </div>
      </div>
    </section>
  );
};

export default Patient;