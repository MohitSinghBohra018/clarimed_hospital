import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// EnquiryService
import { Contact } from "lucide-react";
import { EnquiryService } from "../../services/enquiry.service";

const ContactForm = () => {
  const fileRef = useRef(); // ✅ for resetting file input

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
  ];

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    medical_description: "",
    medical_reports: [],
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "medical_reports") {
      setFormData({ ...formData, medical_reports: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Validation
  const validateForm = () => {
    if (!formData.full_name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error("Phone is required");
      return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Invalid phone number");
      return false;
    }

    if (!formData.medical_description.trim()) {
      toast.error("Medical issue is required");
      return false;
    }

    return true;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // ✅ prevent double click
    if (!validateForm()) return;

    setLoading(true);

    const data = new FormData();
    data.append("full_name", formData.full_name.trim());
    data.append("email", formData.email.trim());
    data.append("phone", formData.phone.trim());
    data.append("city", formData.city);
    data.append("medical_description", formData.medical_description.trim());

    // ✅ Only append if files exist
    if (formData.medical_reports.length > 0) {
      for (let i = 0; i < formData.medical_reports.length; i++) {
        data.append("medical_reports[]", formData.medical_reports[i]);
      }
    }

    try {
      const res = await EnquiryService.submitEnquiry(data);

      toast.success(res?.data?.message || "Submitted successfully ✅");

      // ✅ Reset form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        city: "",
        medical_description: "",
        medical_reports: [],
      });

      // ✅ Reset file input UI
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Submission failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="col-lg-5"
      style={{
        backgroundColor: "rgb(225, 242, 241)",
        padding: "32px",
      }}
    >
      <div className="tp-tour-review-form-wrap mb-0">
        <div className="tp-tour-review-form-content d-block">
          <h2 className="tp-section-title fs-32 fw-600 mb-20">
            Looking For Any Help
          </h2>
          <div className="tp-contact-form tp-tour-review-form">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="tp-review-input mb-20">
                    <label className="tp-label mb-5" htmlFor="name">
                      Name <span>*</span>
                    </label>
                    <input
                      className="tp-input"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Your Name..."
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="tp-review-input mb-20">
                    <label className="tp-label mb-5" htmlFor="email">
                      Email <span>*</span>
                    </label>
                    <input
                      className="tp-input"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email..."
                    />
                  </div>
                </div>

                {/* City */}
                <div className="col-lg-6">
                  <div className="tp-review-input mb-20">
                    <label className="tp-label mb-5" htmlFor="city">
                      City
                    </label>
                    <br></br>
                    <select
                      className="tp-input w-100"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    >
                      <option value="">Select City</option>
                      {cities.map((city, i) => (
                        <option key={i} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="tp-review-input mb-20">
                    <label className="tp-label mb-5" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      className="tp-input"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Medical Issue */}
                <div className="col-lg-12">
                  <div className="tp-review-input mb-20">
                    <label className="tp-label mb-5" htmlFor="medicalIssue">
                      Medical Issue <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="tp-input tp-textarea"
                      name="medical_description"
                      value={formData.medical_description}
                      onChange={handleChange}
                      placeholder="Please describe the symptoms..."
                      style={{ height: "100px"  , border: "1px solid #bbbdbd", borderRadius: "4px", padding: "10px"    }}
                    />
                  </div>
                </div>

                {/* File Upload Section */}
                <div className="col-lg-12">
                  <div className="tp-review-input mb-20">
                    <label
                      htmlFor="file-upload"
                      style={{
                        cursor: "pointer",
                        display: "block",
                        padding: "12px 15px 12px 45px",
                        color: "var(--tp-grey-1)",
                        fontSize: 13,
                        margin: 0,
                        border: "1.5px dashed #0b98ef",
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
                <div className="col-lg-12">
                  {/* Submit */}
                  <div className="col-lg-12">
                    <button
                      className="tp-btn w-100"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit Now"}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <ToastContainer position="top-center" autoClose={3000} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
