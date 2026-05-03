import React, { useState } from "react";
import { EnquiryService } from "../../services/enquiry.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeBannerForm = () => {
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
    medical_description: "",
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
      toast.error("Full name is required");
      return false;
    }

    if (!formData.phone) {
      toast.error("Mobile number is required");
      return false;
    }

    // 🔥 Indian mobile validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Enter valid 10-digit mobile number");
      return false;
    }

    if (!formData.city) {
      toast.error("Please select a city");
      return false;
    }

    return true;
  };

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 👉 stop if invalid
    if (!validateForm()) return;

    setLoading(true);

    const data = new FormData();
    data.append("full_name", formData.full_name);
    data.append("phone", formData.phone);
    data.append("city", formData.city);
    data.append("medical_description", formData.medical_description);

    for (let i = 0; i < formData.medical_reports.length; i++) {
      data.append("medical_reports[]", formData.medical_reports[i]);
    }

    try {
      await EnquiryService.submitEnquiry(data);

      toast.success("Form submitted successfully ✅");

      setFormData({
        full_name: "",
        phone: "",
        city: "",
        medical_description: "",
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
    <div className="col-xl-5 col-lg-6">
      <div
        className="tp-booking-form-one mb-30 wow fadeInUp"
        data-wow-duration=".9s"
        data-wow-delay=".5s"
        style={{
          background: "#ffffff",
          padding: 35,
          borderRadius: 15,
          boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
          width: 490,
        }}
      >
        <h2
          className="tp-booking-form-one-title mb-25 text-center"
          style={{ fontSize: 26 }}
        >
          Book Your Consultation
        </h2>

        <div className="tp-booking-form">
          <form onSubmit={handleSubmit}>
            <div className="tp-booking-wrap p-relative">
              <div className="tp-booking-location mb-15 p-relative">
                <div className="tp-booking-location-input tp-booking-toggle p-relative">
                  <span className="tp-booking-input-icon">
                    <i className="fa-solid fa-user-doctor" />
                  </span>
                  <input
                    className="tp-input"
                    type="text"
                    name="full_name"
                    placeholder="Patient Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="tp-booking-location mb-15 p-relative">
                <div className="tp-booking-location-input tp-booking-toggle p-relative">
                  <span className="tp-booking-input-icon">
                    <i className="fa-solid fa-phone" />
                  </span>
                  <input
                    className="tp-input"
                    type="tel"
                    name="phone"
                    placeholder="Contact Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="tp-booking-location mb-15 p-relative">
                <div className="tp-booking-location-input tp-booking-toggle no-border p-relative">
                  <span className="tp-booking-input-icon">
                    <i className="fa-solid fa-location-dot" />
                  </span>
                  <select
                    className="tp-input"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    style={{
                      appearance: "none",
                      background: "transparent",
                      width: "100%",
                    }}
                  >
                    <option value="">Select City</option>

                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="tp-booking-location mb-15 p-relative">
                <div
                  className="tp-booking-location-input p-relative"
                  style={{ height: "auto" }}
                >
                  <span className="tp-booking-input-icon" style={{ top: 25 }}>
                    <i className="fa-solid fa-notes-medical" />
                  </span>
                  <textarea
                    className="tp-input"
                    name="medical_description"
                    placeholder="Medical Reason / Description"
                    value={formData.medical_description}
                    onChange={handleChange}
                    style={{ paddingTop: 15, height: 60, resize: "none" }}
                  />
                </div>
              </div>

              <div className="tp-booking-location mb-20 p-relative">
                <div
                  className="tp-booking-location-input p-relative"
                  style={{
                    border: "1px dashed var(--tp-theme-2)",
                    background: "var(--tp-common-petals)",
                    borderRadius: 8,
                  }}
                >
                  <span className="tp-booking-input-icon">
                    <i className="fa-solid fa-file-arrow-up" />
                  </span>
                  <label
                    htmlFor="file-upload"
                    style={{
                      cursor: "pointer",
                      display: "block",
                      padding: "12px 15px 12px 45px",
                      color: "var(--tp-grey-1)",
                      fontSize: 13,
                      margin: 0,
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
              </div>

              <button
                className="tp-btn w-100"
                type="submit"
                disabled={loading}
                style={{
                  background:
                    "linear-gradient(90deg, var(--tp-theme-1), var(--tp-theme-2))",
                  border: "none",
                  fontWeight: 700,
                  padding: 18,
                  borderRadius: 8,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Submitting..." : "Confirm Appointment"}
              </button>
            </div>
          </form>
        </div>

        {/* ✅ Toast only for this section */}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default HomeBannerForm;
