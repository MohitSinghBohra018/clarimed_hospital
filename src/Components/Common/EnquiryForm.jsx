import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { EnquiryService } from "../../services/enquiry.service";

const EnquiryForm = () => {
  const fileRef = useRef();

  const cities = [
    "New Delhi","Mumbai","Bangalore","Hyderabad","Chennai","Kolkata",
    "Pune","Ahmedabad","Jaipur","Surat","Lucknow","Kanpur","Nagpur",
    "Indore","Bhopal","Patna","Chandigarh","Noida","Gurgaon","Ghaziabad"
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    city: "",
    phone: "",
    email: "",
    medicalIssue: "",
    report: null
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ File change
  const handleFileChange = (e) => {
    setFormData({ ...formData, report: e.target.files[0] });
  };

  // ✅ Validation
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Patient name required");
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error("Phone required");
      return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Invalid phone number");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email required");
      return false;
    }

    return true;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    if (!validateForm()) return;

    setLoading(true);

    const data = new FormData();

    data.append("full_name", formData.fullName);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("city", formData.city);
    data.append("medical_description", formData.medicalIssue);

    if (formData.report) {
      data.append("medical_reports[]", formData.report);
    }

    try {
      const res = await EnquiryService.submitEnquiry(data);

      toast.success(res?.data?.message || "Submitted successfully ✅");

      setFormData({
        fullName: "",
        city: "",
        phone: "",
        email: "",
        medicalIssue: "",
        report: null
      });

      if (fileRef.current) fileRef.current.value = "";

    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-4">
      <Toaster position="top-center" />

      <div style={{ position: "sticky", top: "10px", marginBottom: "20px" }}>
        <div className="tp-booking-sidebar-wrap">
          <div
            className="tp-booking-sidebar-item p-4 shadow"
            style={{ backgroundColor: "rgb(21, 112, 186)" }}
          >
            <form onSubmit={handleSubmit}>
              
              {/* Header */}
              <p className="text-white text-center fw-bold mb-4" style={{ fontSize: "15px" }}>
                Fill out this form and our health expert will get back to you within 24 hours.
              </p>

              {/* Name */}
              <div className="mb-3">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-control py-2"
                  placeholder="Patient name"
                  style={{ borderRadius: "8px", border: "none" }}
                />
              </div>

              {/* ✅ City Dropdown */}
              <div className="mb-3">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-select py-2"
                  style={{ borderRadius: "8px", border: "none" }}
                >
                  <option value="">Select City</option>
                  {cities.map((city, i) => (
                    <option key={i} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Phone */}
              <div className="d-flex gap-2 mb-3">
                <div style={{ width: "25%" }}>
                  <input
                    type="text"
                    className="form-control py-2 text-center"
                    value="+91"
                    disabled
                    style={{ borderRadius: "8px", border: "none" }}
                  />
                </div>
                <div style={{ width: "75%" }}>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control py-2"
                    placeholder="Enter 10 digit phone"
                    style={{ borderRadius: "8px", border: "none" }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control py-2"
                  placeholder="Enter your email"
                  style={{ borderRadius: "8px", border: "none" }}
                />
              </div>

                      {/* Medical Issue */}
              <div className=" mt-3">
                <textarea
                  name="medicalIssue"
                  value={formData.medicalIssue}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Describe your medical concern"
                  rows="3"
                  style={{ borderRadius: "8px", border: "none" }}
                ></textarea>
              </div>  

              {/* File Upload */}
              <div className="col-12 mt-3 mb-3">
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.jpg,.png"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  id="file-upload"
                />

                <label
                  htmlFor="file-upload"
                  style={{
                    cursor: "pointer",
                    display: "block",
                    padding: "12px",
                    backgroundColor: "#eee",
                    fontSize: 13,
                    borderRadius: "8px"
                  }}
                >
                  {formData.report
                    ? formData.report.name
                    : "Upload Medical Reports (Optional)"}
                </label>
              </div>

      

              {/* Terms */}
              <p className="text-white text-center mb-4" style={{ fontSize: "11px" }}>
                By submitting the form I agree to Terms & Privacy Policy
              </p>

              {/* Submit */}
              <button
                type="submit"
                className="btn w-100 py-3 fw-bold text-white"
                style={{
                  backgroundColor: "rgb(1, 39, 78)",
                  borderRadius: "12px"
                }}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;