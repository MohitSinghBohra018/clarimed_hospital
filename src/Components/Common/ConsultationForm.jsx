import React, { useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast'; 
import bgImage from '../../../assets/img/hero/doctor_image.jfif';
import { EnquiryService } from '../../services/enquiry.service';


const ConsultationForm = () => {

  const fileRef = useRef();

  const cities = [
    "New Delhi","Mumbai","Bangalore","Hyderabad","Chennai","Kolkata",
    "Pune","Ahmedabad","Jaipur","Surat","Lucknow","Kanpur","Nagpur",
    "Indore","Bhopal","Patna","Chandigarh","Noida","Gurgaon","Ghaziabad"
  ];

  const initialFormState = {
    fullName: '',
    email: '',
    phone: '',
    city: '',
    ageOrDOB: '',
    medicalIssue: '',
    report: null
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle File
  const handleFileChange = (e) => {
    setFormData({ ...formData, report: e.target.files[0] });
  };

  // ✅ Validation
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Patient name is required");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Invalid phone number");
      return false;
    }

    if (!formData.ageOrDOB.trim()) {
      toast.error("Age or DOB is required");
      return false;
    }

    if (!formData.medicalIssue.trim()) {
      toast.error("Medical issue is required");
      return false;
    }

    return true;
  };

  // ✅ Submit API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    if (!validateForm()) return;

    setLoading(true);

    const data = new FormData();

    data.append("full_name", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("city", formData.city);
    data.append("medical_description", formData.medicalIssue);
    data.append("age_or_dob", formData.ageOrDOB);

    if (formData.report) {
      data.append("medical_reports[]", formData.report);
    }

    try {
      const res = await EnquiryService.submitEnquiry(data);

      toast.success(res?.data?.message || "Consultation submitted ✅");

      setFormData(initialFormState);

      if (fileRef.current) {
        fileRef.current.value = "";
      }

    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Submission failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Toaster position="top-center" />

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 className='mb-4' style={styles.heading}>
          Patient Identification & Details
        </h2>

        {/* Row 1 */}
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Patient Name*</label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName}
              required 
              style={styles.input} 
              placeholder="Patient Name" 
              onChange={handleChange} 
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address*</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              required 
              style={styles.input} 
              placeholder="Email Address" 
              onChange={handleChange} 
            />
          </div>
        </div>

        {/* Row 2 */}
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Phone Number*</label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone}
              required 
              style={styles.input} 
              placeholder="Enter phone number" 
              onChange={handleChange} 
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Age or DOB*</label>
            <input 
              type="text" 
              name="ageOrDOB" 
              value={formData.ageOrDOB}
              placeholder="e.g. 25 or 12/05/1998" 
              required 
              style={styles.input} 
              onChange={handleChange} 
            />
          </div>
         
        </div>

        {/* Row 3 */}
        <div style={styles.row}>
         <div style={styles.fieldGroup}>
            <label style={styles.label}>City</label>
            <select
              name="city"
              value={formData.city}
              style={styles.input}
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

        {/* Medical Issue */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Medical Issue*</label>
          <textarea 
            name="medicalIssue" 
            value={formData.medicalIssue}
            rows="4" 
            placeholder="Please describe the symptoms..." 
            required 
            style={{...styles.input, resize: 'vertical'}} 
            onChange={handleChange}
          ></textarea>
        </div>

        {/* File Upload */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Upload Medical Report</label>
          <div style={styles.fileUploadWrapper}>
            <input 
              ref={fileRef}
              type="file" 
              name="report" 
              accept=".pdf,.jpg,.png" 
              onChange={handleFileChange} 
              style={styles.fileInput} 
            />
            <span style={styles.fileLabel}>
              {formData.report 
                ? `Selected: ${formData.report.name}` 
                : "Drag & drop or click to upload report"}
            </span>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" style={styles.button}>
          {loading ? "Submitting..." : "Submit Consultation"}
        </button>

      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 15px',
    minHeight: '100vh',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  form: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    maxWidth: '650px',
    width: '100%',
  },
  heading: { marginBottom: '20px', color: '#1768d3', fontSize: '28px' },
  row: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
  fieldGroup: { marginBottom: '20px', flex: '1 1 200px', display: 'flex', flexDirection: 'column' },
  label: { marginBottom: '6px', fontWeight: '600' },
  input: { padding: '10px', borderRadius: '8px', border: '1px solid #ccc' },
  fileUploadWrapper: { position: 'relative', border: '2px dashed #ccc', padding: '20px', textAlign: 'center' },
  fileInput: { position: 'absolute', width: '100%', height: '100%', opacity: 0, cursor: 'pointer' },
  fileLabel: { fontSize: '14px', color: '#777' },
  button: { width: '100%', padding: '12px', background: '#003985', color: '#fff', border: 'none', borderRadius: '8px' }
};

export default ConsultationForm;