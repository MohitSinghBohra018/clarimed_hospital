import React from 'react';
import Faqs from '../Home/Faqs';

const VisionMission = () => {
  return (


    <>    

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
                  style={{ fontSize: "40px" }}
                >
             Vision & Mission

                </h2>

                <p
                  className="tp-breadcrumb-title  text-center mb-0"
                  style={{ fontSize: "18px", marginTop: "6px" }}
                >
                  {" "}
              Clarimed envisions accessible and affordable healthcare for all, while delivering compassionate , innovative and excellent care to improve lives.




                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        
    
    <section className="tp-mission-vision-area pt-50 pb-50 p-relative"style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
    
      <div className="container">
   

        <div className="row mt-20">
          {/* Mission Card */}
          <div className="col-xl-6 col-lg-6 mb-30 wow fadeInLeft" data-wow-duration=".9s" data-wow-delay=".3s">
            <div className="tp-mission-item p-relative z-index-1 white-bg p-5 rounded-4  " style={{border:'1px solid black' , backgroundColor: '#daeefe' }} >
               <div className="tp-mission-icon mb-25">
                  <span className="d-inline-block p-3 rounded-circle" style={{ backgroundColor: '#02406d' }}>
                    {/* Rocket Icon for Mission */}
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                      <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"></path>
                      <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"></path>
                    </svg>
                  </span>
               </div>
               <h3 className="tp-mission-title mb-15 fw-600">Our Mission</h3>
               <p className="mb-0 text-dark">
                Clarimed is dedicated to improving lives through compassionate care, innovative treatments, and personalized services, ensuring every patient receives quality healthcare and support.
               </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="col-xl-6 col-lg-6 mb-30 wow fadeInRight" data-wow-duration=".9s" data-wow-delay=".3s">
            <div className="tp-vision-item p-relative z-index-1 p-5 rounded-4 " style={{ backgroundColor: '#ecf99d', border:'1px solid black' }}>
               <div className="tp-vision-icon mb-25">
                  <span className="d-inline-block p-3 rounded-circle " style={{ backgroundColor: '#e3be1b' }}>
                    {/* Eye/Globe Icon for Vision */}
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </span>
               </div>
               <h3 className="tp-vision-title mb-15 fw-600">Our Vision</h3>
               <p className="mb-0 text-dark">
                 Clarimed envisions a future where healthcare is accessible, affordable, and centered around the needs of every individual, creating a healthier and happier community through trust, innovation, and quality care for all.
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Faqs/>

    </>

  );
};

export default VisionMission;