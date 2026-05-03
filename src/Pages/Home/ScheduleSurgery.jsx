import React, { useState } from "react";
import { EnquiryService } from "../../services/enquiry.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScheduleSurgery = () => {

    const cities = [
    "New Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Bhopal",
    "Patna",
    "Chandigarh",
    "Noida",
    "Gurgaon",
    "Ghaziabad",
    "Faridabad",
    "Meerut",
    "Varanasi",
    "Amritsar",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Vadodara",
    "Rajkot",
    "Ranchi",
    "Raipur",
    "Jodhpur",
    "Udaipur",
    "Coimbatore",
    "Madurai",
    "Salem",
    "Tiruchirappalli",
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Warangal",
    "Mysore",
    "Hubli",
    "Mangalore",
    "Belgaum",
    "Thiruvananthapuram",
    "Kochi",
    "Kozhikode",
    "Dehradun",
    "Haridwar",
    "Roorkee",
    "Shimla",
    "Manali",
    "Srinagar",
    "Jammu",
    "Panaji",
    "Margao",
    "Shillong",
    "Imphal",
    "Aizawl",
    "Gangtok",
    "Dhanbad",
    "Jamshedpur",
    "Aligarh",
    "Bareilly",
    "Moradabad",
    "Haldwani",
    "Nainital",
  ];
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    city: "",
    surgery: "",
    medical_reports: [],
  });

  const [loading, setLoading] = useState(false);

  // ✅ handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "medical_reports") {
      setFormData({ ...formData, medical_reports: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ validation
  const validateForm = () => {
    if (!formData.full_name.trim()) {
      toast.error("Patient name is required");
      return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Enter valid 10-digit mobile number");
      return false;
    }

    if (!formData.city) {
      toast.error("Please select a city");
      return false;
    }

    if (!formData.surgery) {
      toast.error("Please select surgery");
      return false;
    }

    return true;
  };

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const data = new FormData();
    data.append("full_name", formData.full_name);
    data.append("phone", formData.phone);
    data.append("city", formData.city);

    // 🔥 surgery mapped to medical_description
    data.append("medical_description", formData.surgery);

    for (let i = 0; i < formData.medical_reports.length; i++) {
      data.append("medical_reports[]", formData.medical_reports[i]);
    }

    try {
      await EnquiryService.submitEnquiry(data);

      toast.success("Appointment booked successfully ✅");

      setFormData({
        full_name: "",
        phone: "",
        city: "",
        surgery: "",
        medical_reports: [],
      });
    } catch (err) {
      console.error(err);
      toast.error("Submission failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="contact-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-12 mb-4">
              <div className="contact-left">
                <h2>Get in Touch</h2>
                <p className="mt-2">
                  Tell Clarimed Healthcare about your problems and we'll figure
                  out the <br />
                  best treatment option for you.
                </p>

                <h3 style={{ marginBottom: "5px" }}>
                  Clarimed Healthcare services are accessible Pan India
                </h3>
                <p className="mt-2">
                  Clarimed Healthcare has taken the latest medical technologies
                  to ensure
                  <br /> consistent quality of advanced surgical care in 20+
                  cities of India including <br /> Delhi/NCR, Bangalore,
                  Chennai, Mumbai, Hyderabad, Kolkata , Pune, <br /> Lucknow,
                  Ranchi and Vishakhapatnam.
                </p>
              </div>
            </div>

            <div className="col-lg-5 col-md-12">
              <div className="contact-form">
                <h3>Let's Schedule Your Surgery</h3>

                {/* ✅ form submit */}
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Patient Name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Mobile Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />


                           <select
                    className="form-select"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option value="">Select City</option>

                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>


                  <select
                    className="form-select"
                    name="surgery"
                    value={formData.surgery}
                    onChange={handleChange}
                  >
                    <option value="">Select Surgery</option>
                    <option>Gall bladder Stone</option>
                    <option>Appendectomy</option>
                    <option>Kidney Stone</option>
                    <option>Cataract</option>
                    <option>Lasik Eye Surgery</option>
                    <option>Piles</option>
                    <option>Hernia</option>
                    <option>Knee Replacement</option>
                    <option>Hip Replacement</option>
                    <option>Spine Surgery</option>
                    <option>Laser Circumcision</option>
                    <option>FESS</option>
                    <option>Rhinoplasty</option>
                    <option>Normal Delivery</option>
                    <option>C - Section</option>
                    <option>Varicocele</option>
                    <option>Uterine Fibroid</option>
                    <option>Anal Fissure</option>
                  </select>

                  <div
                    className="tp-booking-location-input p-relative"
                    style={{
                      border: "1px dashed black",
                      background: "var(--tp-common-petals)",
                      borderRadius: "8px",
                    }}
                  >
                    <span className="tp-booking-input-icon">
                      <i className="fa-solid fa-file-arrow-up"></i>
                    </span>
                    <label
                      htmlFor="file-upload"
                      style={{
                        cursor: "pointer",
                        display: "block",
                        padding: "12px 15px 12px 45px",
                        color: "var(--tp-grey-1)",
                        fontSize: "13px",
                        margin: "0",
                      }}
                    >
                      Upload Medical Reports (Optional)
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      name="medical_reports"
                      multiple
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn w-100"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Book FREE Appointment"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Toast only for this section */}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default ScheduleSurgery;
