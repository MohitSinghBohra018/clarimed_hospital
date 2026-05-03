import React from "react";
import EnquiryForm from "../../../Components/Common/EnquiryForm";
import { Link } from "react-router-dom";

const WeightLose = () => {
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
                 Weight Loss (Bariatric)
                </h2>
                <p
                  className="tp-breadcrumb-title  text-center mb-0"
                  style={{ fontSize: "18px", marginTop: "6px" }}
                >
                  {" "}
                  India’s leading Weight Loss  — trusted hands for every
                  heartbeat.
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
            {/* Right Side Sticky Form */}
            <EnquiryForm />

            {/* Left Side: Doctor Cards & Filter */}
            <div className="col-lg-8 mb-30">
                  {/* --- NEW FILTER SECTION --- */}
              <div className="filter-bar d-flex align-items-center mb-4 p-3 bg-white rounded-4 shadow-sm">
                {/* <h4 className="mb-0 me-3 fw-bold" style={{ fontSize: '20px', color: '#333' }}>Filter by</h4> */}
                <div className="d-flex gap-3">
                  <select
                    className="form-select"
                    style={{
                      borderRadius: "20px",
                      minWidth: "150px",
                      borderColor: "#ddd",
                    }}
                  >
                    <option value="india">All Departments</option>
                    <option value="india">Cardiology</option>
                    <option value="india">Cardiac Sx </option>
                    <option value="india">
                      {" "}
                      <option value="india">EYE </option>{" "}
                    </option>
                    <option value="india">
                      {" "}
                      <option value="india">ENT </option>{" "}
                    </option>
                    <option value="india">
                      {" "}
                      <option value="india">Gynae </option>{" "}
                    </option>
                    <option value="india">
                      {" "}
                      <option value="india">Neurosurgery </option>{" "}
                    </option>
                    <option value="india">
                      {" "}
                      <option value="india">Orthopedics </option>{" "}
                    </option>
                    <option value="india">
                      {" "}
                      <option value="india">General Surgery </option>{" "}
                    </option>
                    <option value="india">
                      {" "}
                      <option value="india">Urology </option>{" "}
                    </option>

                    {/* <option value="usa">USA</option>
                    <option value="uk">UK</option> */}
                  </select>
                  <select
                    className="form-select"
                    style={{
                      borderRadius: "20px",
                      minWidth: "150px",
                      borderColor: "#ddd",
                    }}
                  >
                    <option value="">Select City</option>
                    <option value="noida">Delhi/NCR</option>
                    <option value="delhi">Chennai</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="mumbai">Bangalore</option>
                    <option value="mumbai">Hyderabad</option>
                    <option value="mumbai">Kolkata</option>
                    <option value="mumbai">Pune</option>
                    <option value="mumbai">Lucknow</option>
                    <option value="mumbai">Ranchi</option>
                    <option value="mumbai">Vishakhapatnam</option>
                  </select>
                  <select
                    className="form-select"
                    style={{
                      borderRadius: "20px",
                      minWidth: "150px",
                      borderColor: "#ddd",
                    }}
                  >
                    <option value="">All Hospital</option>
                    <option value="noida">
                      Medanta - The Medicity, Gurgaon
                    </option>
                    
                    <option value="mumbai">
                     Fortis (fmri gurugram & Haryana)
                    </option>
                  </select>

                  <button
                    type="button"
                    className="btn d-flex align-items-center gap-2 px-4"
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      borderRadius: "20px",
                      border: "none",
                      height: "38px",
                    }}
                  >
                    <i className="fa fa-search"></i>
                    Search
                  </button>
                </div>
              </div>
              {/* --- END FILTER SECTION --- */}

              {/* Doctor Card 1 */}
              <div className="doctor-card-container">
                <div className="doctor-card-content d-flex flex-column flex-md-row align-items-center">
                  <div className="doctor-image-wrapper me-md-5 mb-3 mb-md-0">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm_an1-eX_YUVD7X09znOIJ-Jzm3ATRD-ccQ&s"
                      alt="Dr. Ajay Kaul"
                      className="img-fluid"
                      style={{ maxWidth: "210px" }}
                    />
                  </div>
                  <div className="doctor-info">
                    <h2 className="doctor-name">Dr. Adarsh Chaudhary </h2>
                    <h5 className="doctor-specialty">
                      Bariatric (weight loss), pancreatic surgery, minimally invasive surgery 
                    </h5>
                    <div className="doctor-meta-info mt-3">
                      <p>
                        <i className="fa-solid fa-stethoscope me-2 text-warning"></i>{" "}
                        <strong>Position:</strong> Chairman – GI & General Surgery
                      </p>
                      <p>
                        <i className="fa-solid fa-user-doctor me-2 text-primary"></i>{" "}
                        <strong>Experience:</strong> 28 Years of Experience
                      </p>
                      <p>
                        {" "}
                        <i className="fa-solid fa-location-dot me-2 text-danger"></i>{" "}
                        <strong>Address:</strong> gurgaon, Haryana
                      </p>
                    </div>
                    <div className="doctor-actions d-flex flex-wrap gap-2 mt-4">
                      <Link
                        to="/doctor/dr-ashok-seth/"
                        className="btn btn-readmore"
                      >
                        Read More
                      </Link>
                      {/* <button className="btn btn-readmore">Read More</button> */}
                      <button className="btn btn-chat">
                        <i className="fa-brands fa-whatsapp me-1"></i> Chat Now
                      </button>
                      <Link to="/book-appointment" className="btn btn-book">
                        {" "}
                        <i className="fa-solid fa-calendar-plus me-1"></i> Book
                        Appointment
                      </Link>
                      {/* <button className="btn btn-book"> <i className="fa-solid fa-calendar-plus me-1"></i> Book Appointment</button> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Card 2 */}
              <div className="doctor-card-container mt-4">
                <div className="doctor-card-content d-flex flex-column flex-md-row align-items-center">
                  <div className="doctor-image-wrapper me-md-5 mb-3 mb-md-0">
                    <img
                      src="https://lyfboat-os.s3.fr-par.scw.cloud/lyfboat/uploads/doctors/762-profile-dr-ajay-kumar-kriplani-profile.jpg"
                      alt="Dr. Ajay Kaul"
                      className="img-fluid"
                      style={{ maxWidth: "210px" }}
                    />
                  </div>
                  <div className="doctor-info">
                    <h2 className="doctor-name">Dr. Ajay Kumar Kriplani</h2>
                    <h5 className="doctor-specialty">
                      Laparoscopic, robotic, weight loss surgery 
                    </h5>
                    <div className="doctor-meta-info mt-3">
                      <p>
                        <i className="fa-solid fa-stethoscope me-2 text-warning"></i>{" "}
                        <strong>Position:</strong> Principal Director – GI & Bariatric Surgery
                      </p>
                      <p>
                        <i className="fa-solid fa-user-doctor me-2 text-primary"></i>{" "}
                        <strong>Experience:</strong> 40+ Years of Experience
                      </p>
                      <p>
                        {" "}
                        <i className="fa-solid fa-location-dot me-2 text-danger"></i>{" "}
                        <strong>Address:</strong> gurgaon, Haryana
                      </p>
                    </div>
                    <div className="doctor-actions d-flex flex-wrap gap-2 mt-4">
                       <Link
                        to="/doctor/dr-ashok-seth/"
                        className="btn btn-readmore"
                      >
                        Read More
                      </Link>
                      <button className="btn btn-chat">
                        <i className="fa-brands fa-whatsapp me-1"></i> Chat Now
                      </button>
                      <button className="btn btn-book">
                        {" "}
                        <i className="fa-solid fa-calendar-plus me-1"></i> Book
                        Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Card 3 */}
              <div className="doctor-card-container mt-4">
                <div className="doctor-card-content d-flex flex-column flex-md-row align-items-center">
                  <div className="doctor-image-wrapper me-md-5 mb-3 mb-md-0">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6hlysLmGKwithK0FFYhPBuh_iovUc1qCaAQ&s"
                      alt="Dr. Ajay Kaul"
                      className="img-fluid"
                      style={{ maxWidth: "210px" }}
                    />
                  </div>
                  <div className="doctor-info">
                    <h2 className="doctor-name">Dr. Amit Javed</h2>
                    <h5 className="doctor-specialty">
                      Bariatric, minimal access surgery 
                    </h5>
                    <div className="doctor-meta-info mt-3">
                      <p>
                        <i className="fa-solid fa-stethoscope me-2 text-warning"></i>{" "}
                        <strong>Position:</strong> HOD – GI Surgery
                      </p>
                      <p>
                        <i className="fa-solid fa-user-doctor me-2 text-primary"></i>{" "}
                        <strong>Experience:</strong> 25 Years of Experience
                      </p>
                      <p>
                        {" "}
                        <i className="fa-solid fa-location-dot me-2 text-danger"></i>{" "}
                        <strong>Address:</strong> gurgaon, Haryana
                      </p>
                    </div>
                    <div className="doctor-actions d-flex flex-wrap gap-2 mt-4">
                      <button className="btn btn-readmore">Read More</button>
                      <button className="btn btn-chat">
                        <i className="fa-brands fa-whatsapp me-1"></i> Chat Now
                      </button>
                      <button className="btn btn-book">
                        {" "}
                        <i className="fa-solid fa-calendar-plus me-1"></i> Book
                        Appointment
                      </button>
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

export default WeightLose ;
