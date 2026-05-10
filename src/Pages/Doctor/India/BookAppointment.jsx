import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommonService } from "../../../services/common.service";

const BookAppointment = () => {
  const { slug } = useParams();
  const fileRef = useRef(); // ✅ For resetting file input UI

  // API Data States
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Selection & UI States
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
  const [isFinalSuccess, setIsFinalSuccess] = useState(false);

  // Form State
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    phoneNumber: "",
    email: "", // ✅ Added Email
    city: "",
    ageOrDob: "",
    gender: "Male",
    symptoms: "", // ✅ Added Symptoms
    medical_report: null, // ✅ Added for file
  });

  // 1. Generate Next 7 Days
  const generateDates = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push({
        fullDate: d.toLocaleDateString('sv-SE'),
        displayDate: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
        dayName: d.toLocaleDateString("en-GB", { weekday: "short" }),
      });
    }
    return days;
  };
  const datePills = generateDates();

  useEffect(() => {
    const getDoc = async () => {
      try {
        const res = await CommonService.getDoctorBySlug(slug);
        setDoctorInfo(res.data?.doctor || res.data);
        setSelectedDate(datePills[0].fullDate);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getDoc();
  }, [slug]);

  useEffect(() => {
    if (selectedDate && slug) {
      const fetchSlots = async () => {
        setSlotsLoading(true);
        try {
          const res = await CommonService.getDoctorSlots(slug, selectedDate);
          setAvailableSlots(res.slots || []);
        } catch (err) {
          setAvailableSlots([]);
        } finally {
          setSlotsLoading(false);
        }
      };
      fetchSlots();
    }
  }, [selectedDate, slug]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "medical_report") {
      setPatientDetails((prev) => ({ ...prev, medical_report: files[0] }));
    } else {
      setPatientDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ VALIDATION LOGIC
const validateForm = () => {
  const { name, phoneNumber, email, ageOrDob , gender} = patientDetails;

  // 1. Name Validation
  if (!name.trim()) { 
    toast.error("Please enter the patient's full name."); 
    return false; 
  }

  // 2. Phone Validation (Basic 10-digit check)
  const phoneRegex = /^[0-9]{10}$/; 
  if (!phoneNumber.trim()) {
    toast.error("Phone number is required.");
    return false;
  } else if (!phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
    toast.error("Please enter a valid 10-digit phone number.");
    return false;
  }

  // 3. Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    toast.error("Email address is required.");
    return false;
  } else if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  // 4. Age/DOB Validation
  if (!ageOrDob.trim()) { 
    toast.error("Please provide Age or Date of Birth."); 
    return false; 
  }

  // 4. Gender Validation (if no default is set)
  if (!gender) {
    toast.error("Please select a gender.");
    return false;
  }

  return true;
};

  // ✅ SUBMIT & RESET LOGIC
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!validateForm()) return;

    setSubmitting(true);

    const data = new FormData();
    data.append("doctor_id", doctorInfo?.id);
    data.append("date", selectedDate);
    data.append("start_time", selectedTime);
    data.append("patient_name", patientDetails.name);
    data.append("patient_phone", patientDetails.phoneNumber);
    data.append("patient_email", patientDetails.email);
    data.append("patient_city", patientDetails.city);
    data.append("patient_dob_age", patientDetails.ageOrDob);
    data.append("patient_gender", patientDetails.gender.toLowerCase());
    data.append("symptoms", patientDetails.symptoms);
    if (patientDetails.medical_report) {
      data.append("report", patientDetails.medical_report);
    }

    try {
      const res = await CommonService.bookAppointment(data);
      toast.success(res?.data?.message || "Appointment Booked Successfully! ✅");
      
      // ✅ RESET FORM DATA
      setPatientDetails({
        name: "", phoneNumber: "", email: "", city: "", ageOrDob: "", gender: "Male", symptoms: "", medical_report: null
      });
      if (fileRef.current) fileRef.current.value = "";
      
      setIsFinalSuccess(true); // Move to success screen
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed ❌");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime12Hour = (timeString) => {
  if (!timeString) return "";
  // Split by ':' to get hours and minutes
  let [hours, minutes] = timeString.split(':');
  hours = parseInt(hours);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${hours}:${minutes.substring(0, 2)} ${ampm}`;
};

  // ✅ Filter out past slots for today
  const isToday = (dateString) => {
    const today = new Date().toLocaleDateString('sv-SE');
    return dateString === today;
  };

  const isTimeInFuture = (timeString) => {
    const now = new Date();
    const [hours, minutes] = timeString.split(':').map(Number);
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);
    return slotTime > now;
  };

  const filteredSlots = availableSlots.filter((slot) => {
    if (!isToday(selectedDate)) return true; // Future dates: show all
    return isTimeInFuture(slot.start_time);  // Today: only future slots
  });

  if (loading) return <div className="text-center p-5">Loading...</div>;

  return (
    <div className="container py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="row justify-content-center">
        <div className="col-lg-8">
          
          {/* PROFILE SECTION - PRESERVED */}
          {!isFinalSuccess && (
            <div className="card border-0 shadow-sm rounded-4 mb-4 p-1">
              <div className="card-body d-flex align-items-center text-start">
                <img src={doctorInfo?.photo} alt={doctorInfo?.name} className="rounded-circle me-4" style={{ width: "90px", height: "90px", objectFit: "cover" }} />
                <div className="flex-grow-1">
                  <h4 className="mb-0 fw-bold">{doctorInfo?.name}</h4>
                  <p className="text-muted mb-0">{ doctorInfo?.designation}</p>
                </div>
                <div className="text-end d-none d-md-block">
                  <p className="mb-0 text-muted"><FaMapMarkerAlt className="text-danger" /> {doctorInfo?.hospital?.city || "Delhi"}</p>
                  <p className="fw-bold mb-0 text-primary">Fees: ₹{doctorInfo?.consultation_fee}</p>
                </div>
              </div>
            </div>
          )}

          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              {isFinalSuccess ? (
                <div className="text-center py-3">
                  <div className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle" style={{ width: "90px", height: "90px", background: "#e8f9ee" }}>
                    <i className="fa-solid fa-check text-success fs-1"></i>
                  </div>
                  <h3 className="fw-bold text-success">Booking Request Sent!</h3>
                  <p>Check your email for confirmation details.</p>
                  <button className="btn btn-primary mt-3" onClick={() => { setIsFinalSuccess(false); setAppointmentConfirmed(false); }}>Book Another</button>
                </div>
              ) : !appointmentConfirmed ? (
                /* STEP 1: DATE & TIME PILLS */
                <div className="text-start">
                  <h5 className="fw-bold mb-4">1. Select Appointment Date & Time</h5>
                  <div className="d-flex overflow-auto gap-2 pb-3 mb-2">
                    {datePills.map((item, index) => (
                      <button key={index} onClick={() => { setSelectedDate(item.fullDate); setSelectedTime(null); }} className={`btn rounded-pill px-4 py-2 flex-shrink-0 ${selectedDate === item.fullDate ? "btn-info shadow" : "btn-outline-secondary bg-white"}`} style={{ minWidth: "110px" }}>
                        <div className="small text-dark">{item.dayName}</div>
                        <div className="small fw-bold text-dark">{item.displayDate}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-top">
                    {slotsLoading ? <div className="text-center">Loading slots...</div> : filteredSlots.length > 0 ? (
                      <div className="row g-2">
                      {/* Replace the old mapping logic with this */}
{filteredSlots.map((slot) => (
  <div key={slot.id} className="col-6 col-md-3">
    <button 
      onClick={() => setSelectedTime(slot.start_time)} 
      className={`btn w-100 py-2 rounded-3 fw-medium ${
        selectedTime === slot.start_time ? "btn-success shadow-sm" : "btn-outline-primary bg-Blue"
      }`}
    >
      {/* ✅ Use the helper function here */}
      {formatTime12Hour(slot.start_time)}
    </button>
  </div>
))}
                      </div>
                    ) : <p className="text-center text-muted py-4">No slots available for this date.</p>}
                  </div>
                  <button disabled={!selectedTime} onClick={() => setAppointmentConfirmed(true)} className="btn btn-primary w-100 py-3 fw-bold rounded-4 mt-4" style={{ backgroundColor: "#083f76" }}>Confirm Slot & Continue</button>
                </div>
              ) : (
                /* STEP 2: FORM SECTION */
                <div className="p-2 text-start">
                  <h5 className="fw-bold mb-4" style={{ color: "#0056b3" }}>2. Complete Patient Details</h5>
                  <form onSubmit={handleFinalSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold small">Full Name *</label>
                        <input type="text" name="name" value={patientDetails.name} className="form-control" placeholder="Name" onChange={handleInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold small">Phone Number *</label>
                        <input type="tel" name="phoneNumber" value={patientDetails.phoneNumber} className="form-control" placeholder="Phone" onChange={handleInputChange} />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label fw-bold small">Email Address *</label>
                        <input type="email" name="email" value={patientDetails.email} className="form-control" placeholder="Email" onChange={handleInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold small">City</label>
                        <input type="text" name="city" value={patientDetails.city} className="form-control" placeholder="City" onChange={handleInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold small">Age/DOB *</label>
                        <input type="text" name="ageOrDob" value={patientDetails.ageOrDob} className="form-control" placeholder="eg: 25yrs" onChange={handleInputChange} />
                      </div>
                      {/* Gender Selection */}
<div className="col-md-12">
  <label className="form-label fw-bold small">Gender *</label>
  <div className="d-flex gap-3">
    {["Male", "Female", "Other"].map((option) => (
      <div key={option} className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="gender"
          id={`gender-${option}`}
          value={option}
          checked={patientDetails.gender === option}
          onChange={handleInputChange}
        />
        <label className="form-check-label" htmlFor={`gender-${option}`}>
          {option}
        </label>
      </div>
    ))}
  </div>
</div>
                      <div className="col-md-12">
                        <label className="form-label fw-bold small">Symptoms / Medical Issue</label>
                        <textarea name="symptoms" value={patientDetails.symptoms} className="form-control" rows="2" placeholder="Briefly describe symptoms..." onChange={handleInputChange}></textarea>
                      </div>


                      <div className="col-md-12">
                        <label className="form-label fw-bold small">Upload Reports (Optional)</label>
                        <input type="file" name="medical_report" ref={fileRef} className="form-control" onChange={handleInputChange} />
                      </div>
                      <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-danger w-100 py-3 fw-bold rounded-3" style={{ backgroundColor: "rgb(8, 63, 118)", border: "none" }} disabled={submitting}>
                          {submitting ? "Processing..." : "Submit & Confirm Appointment"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;