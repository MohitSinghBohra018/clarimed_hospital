import React from "react";
import EnquiryForm from "../../../Components/Common/EnquiryForm";

const ExtraPage = () => {
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
                  className="tp-breadcrumb-title fs-10 text-center mb-0"
                  style={{ fontSize: "38px" }}
                >
                  Best Cardiac Sx Hospitals in India
                </h2>
                <p
                  className="tp-breadcrumb-title  text-center mb-0"
                  style={{ fontSize: "18px", marginTop: "5px" }}
                >
                  {" "}
                   Your Gateway to Premium Healthcare
                  with ClariMed India Health Value Card.
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
            {/* Right Side Common enquiry form  they will founf common section  */}
            <EnquiryForm />

            {/* Left Side: Doctor Cards & Filter */}
            <div className="col-lg-8 mb-30">
              {/* --- NEW FILTER SECTION --- */}
              <div className="filter-bar d-flex align-items-center mb-4 p-3 bg-white rounded-4 shadow-sm">
                <h4
                  className="mb-0 me-3 fw-bold"
                  style={{ fontSize: "20px", color: "#333" }}
                >
                  Filter by
                </h4>
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
                    <option value="india">
                     Cardiology{" "}
                    </option>
                    <option value="india">Cardiac Sx </option>
                    <option value="india">
                      {" "}
                      <option value="india">EYE</option>{" "}
                    </option>
                    <option value="ENT">ENT</option>
                    <option value="Gynae">Gynae</option>
                       <option value="ENT">Neurosurgery</option>
                    <option value="Gynae">Orthopedics</option>
                    <option value="Gynae">General Surgery</option>
                    <option value="Urology">Urology</option>
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
                    <option value="mumbai">Kolkata </option>
                    <option value="mumbai">Pune </option>
                    <option value="mumbai">Lucknow </option>
                    <option value="mumbai">Ranchi </option>
                     <option value="mumbai">Vishakhapatnam </option>
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


                   {/* Hospital Card1 */}
              <div className="doctor-card-container ">
                <div className="doctor-card-content d-flex flex-column flex-md-row align-items-center">
                  <div className="doctor-image-wrapper me-md-4 mb-3 mb-md-0">
                    <img
                      src="https://medsurgeindia.com/wp-content/uploads/2020/02/Medanta-Hospital-Gurgaon.jpg"
                      alt="Fortis Hospital Gurgaon"
                      className="img-fluid"
                      style={{ maxWidth: "210px" }}
                    />
                  </div>

                  <div className="doctor-info">
                    <h2 className="doctor-name">
                      <i className="fa-solid fa-hospital me-2"></i>
                    Medanta – The Medicity Hospital, Gurgaon
                    </h2>

                    <div className="doctor-meta-info mt-3">
                      <p>
                        <i className="fa-solid fa-location-dot me-2 text-danger"></i>
                        <strong>Location :</strong>  Sector - 38 Gurgaon Haryana 122001


                      </p>

                      <p>
                        <i className="fa-solid fa-calendar-check me-2 text-primary"></i>
                        <strong>Established in:</strong> 2009
                      </p>

                      <p>
                        <i className="fa-solid fa-bed me-2 text-success"></i>
                        <strong>Number of Beds:</strong> 1600
                      </p>
                    </div>

                    <div className="doctor-actions d-flex flex-wrap gap-2 mt-4">
                      <button className="btn btn-readmore">
                        <i className="fa-solid fa-circle-info me-1"></i>
                        Read More
                      </button>

                      <button className="btn btn-chat">
                        <i className="fa-brands fa-whatsapp me-1"></i>
                        Chat Now
                      </button>

                      <button className="btn btn-book">
                        <i className="fa-solid fa-phone me-1"></i>
                        Enquiry Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hospital Card 2 */}
              <div className="doctor-card-container mt-3">
                <div className="doctor-card-content d-flex flex-column flex-md-row align-items-center">
                  <div className="doctor-image-wrapper me-md-4 mb-3 mb-md-0">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT84gRUYccEtPQSUtekOMVUM2WFpc0kY2EApQ&s"
                      alt="Fortis Hospital Gurgaon"
                      className="img-fluid"
                      style={{ maxWidth: "210px" }}
                    />
                  </div>

                  <div className="doctor-info">
                    <h2 className="doctor-name">
                      <i className="fa-solid fa-hospital me-2"></i>
                      Fortis Hospital Gurgaon
                    </h2>

                    <div className="doctor-meta-info mt-3">
                      <p>
                        <i className="fa-solid fa-location-dot me-2 text-danger"></i>
                        <strong>Location :</strong> 44, Opposite HUDA City
                        Centre Gurgaon Haryana 122002 India
                      </p>

                      <p>
                        <i className="fa-solid fa-calendar-check me-2 text-primary"></i>
                        <strong>Established in:</strong> 2001
                      </p>

                      <p>
                        <i className="fa-solid fa-bed me-2 text-success"></i>
                        <strong>Number of Beds:</strong> 500
                      </p>
                    </div>

                    <div className="doctor-actions d-flex flex-wrap gap-2 mt-4">
                      <button className="btn btn-readmore">
                        <i className="fa-solid fa-circle-info me-1"></i>
                        Read More
                      </button>

                      <button className="btn btn-chat">
                        <i className="fa-brands fa-whatsapp me-1"></i>
                        Chat Now
                      </button>

                      <button className="btn btn-book">
                        <i className="fa-solid fa-phone me-1"></i>
                        Enquiry Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

             {/* Hospital Card 3 */}
              {/* <div className="doctor-card-container mt-3">
                <div className="doctor-card-content d-flex flex-column flex-md-row align-items-center">
                  <div className="doctor-image-wrapper me-md-4 mb-3 mb-md-0">
                    <img
                      src="https://karetrip.com/_next/image?url=https%3A%2F%2Fdxfqlcpql5f3t.cloudfront.net%2Fhospital%2Findraprastha-apollo-hospital-new-delhi-s.webp&w=828&q=75"
                      alt="Fortis Hospital Gurgaon"
                      className="img-fluid"
                      style={{ maxWidth: "210px" }}
                    />
                  </div>

                  <div className="doctor-info">
                    <h2 className="doctor-name">
                      <i className="fa-solid fa-hospital me-2"></i>
                     Indraprastha Apollo Hospital New Delhi
                    </h2>

                    <div className="doctor-meta-info mt-3">
                      <p>
                        <i className="fa-solid fa-location-dot me-2 text-danger"></i>
                        <strong>Location :</strong>  Sarita Vihar, Delhi Mathura Road New Delhi (Delhi) 110076


                      </p>

                      <p>
                        <i className="fa-solid fa-calendar-check me-2 text-primary"></i>
                        <strong>Established in:</strong> 1996
                      </p>

                      <p>
                        <i className="fa-solid fa-bed me-2 text-success"></i>
                        <strong>Number of Beds:</strong> 1000
                      </p>
                    </div>

                    <div className="doctor-actions d-flex flex-wrap gap-2 mt-4">
                      <button className="btn btn-readmore">
                        <i className="fa-solid fa-circle-info me-1"></i>
                        Read More
                      </button>

                      <button className="btn btn-chat">
                        <i className="fa-brands fa-whatsapp me-1"></i>
                        Chat Now
                      </button>

                      <button className="btn btn-book">
                        <i className="fa-solid fa-phone me-1"></i>
                        Enquiry Now
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}

          


                  {/* Hospital Card 4 */}
              {/* <div className="doctor-card-container mt-3">
                <div className="doctor-card-content d-flex flex-column flex-md-row align-items-center">
                  <div className="doctor-image-wrapper me-md-4 mb-3 mb-md-0">
                    <img
                      src="https://content.jdmagicbox.com/v2/comp/delhi/p4/011pxx11.xx11.090818134858.q9p4/catalogue/blk-max-super-speciality-hospital-pusa-road-delhi-hospitals-vysjdv6lu1.jpg"
                      alt="Fortis Hospital Gurgaon"
                      className="img-fluid"
                      style={{ maxWidth: "210px" }}
                    />
                  </div>

                  <div className="doctor-info">
                    <h2 className="doctor-name">
                      <i className="fa-solid fa-hospital me-2"></i>
                     BLK Hospital New Delhi
                    </h2>

                    <div className="doctor-meta-info mt-3">
                      <p>
                        <i className="fa-solid fa-location-dot me-2 text-danger"></i>
                        <strong>Location :</strong>  Pusa Rd, Radha Soami Satsang, Rajendra Place New Delhi Delhi 110005 India


                      </p>

                      <p>
                        <i className="fa-solid fa-calendar-check me-2 text-primary"></i>
                        <strong>Established in:</strong> 1959
                      </p>

                      <p>
                        <i className="fa-solid fa-bed me-2 text-success"></i>
                        <strong>Number of Beds:</strong> 780
                      </p>
                    </div>

                    <div className="doctor-actions d-flex flex-wrap gap-2 mt-4">
                      <button className="btn btn-readmore">
                        <i className="fa-solid fa-circle-info me-1"></i>
                        Read More
                      </button>

                      <button className="btn btn-chat">
                        <i className="fa-brands fa-whatsapp me-1"></i>
                        Chat Now
                      </button>

                      <button className="btn btn-book">
                        <i className="fa-solid fa-phone me-1"></i>
                        Enquiry Now
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}


            
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExtraPage;
