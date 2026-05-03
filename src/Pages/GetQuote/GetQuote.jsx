import React, { useState, useEffect, useMemo } from "react";
import { CommonService } from "../../services/common.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetQuote = () => {
  const [specialties, setSpecialties] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeSpecialty, setActiveSpecialty] = useState(null);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ FIXED: added all fields
  const [patientData, setPatientData] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
    date: "",
    medicalHistory: "",
  });

  // ✅ FIXED: file state
  const [selectedFile, setSelectedFile] = useState(null);

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [_, deptsRes] = await CommonService.getHeaderData();
        const hospRes = await CommonService.getHospitals("india", "");

        setSpecialties(deptsRes?.data || []);
        setHospitals(hospRes?.data?.data || hospRes?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ CITY LIST
  const cities = useMemo(() => {
    return [
      ...new Set(
        hospitals.map((h) => h?.city?.name || h?.city).filter(Boolean),
      ),
    ];
  }, [hospitals]);

  // ✅ FILTER HOSPITAL
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((h) => (h?.city?.name || h?.city) === selectedCity);
  }, [hospitals, selectedCity]);

  // ✅ HANDLE INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredSpecialties = specialties.filter((item) =>
    item?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const validateForm = () => {
    if (!patientData.name.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (!patientData.phone) {
      toast.error("Phone number is required");
      return false;
    }

    // Indian phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(patientData.phone)) {
      toast.error("Enter valid 10-digit mobile number");
      return false;
    }

    if (!selectedCity) {
      toast.error("Please select city");
      return false;
    }

    if (!selectedHospital) {
      toast.error("Please select hospital");
      return false;
    }

    if (!activeSpecialty) {
      toast.error("Please select a specialty");
      return false;
    }

    if (!selectedProcedure) {
      toast.error("Please select a procedure");
      return false;
    }

    if (!patientData.gender) {
      toast.error("Please select gender");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION FIRST
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("full_name", patientData.name);
      formData.append("phone_number", patientData.phone);
      formData.append("email", "test@gmail.com");

      // ✅ IMPORTANT FIX
      formData.append("gender", patientData.gender.toLowerCase());

      formData.append("speciality", activeSpecialty?.name);
      formData.append("procedure_name", selectedProcedure);

      const selectedTreatmentObj = activeSpecialty?.treatments?.find(
        (t) => t.name === selectedProcedure,
      );

      formData.append("treatment_id", selectedTreatmentObj?.id || "");

      formData.append("city", selectedCity);
      formData.append("preferred_hospital", selectedHospital);

      formData.append("age", patientData.age);
      formData.append("preferred_date", patientData.date);
      formData.append("medical_history", patientData.medicalHistory);

      if (selectedFile) {
        formData.append("report", selectedFile);
      }

      const res = await CommonService.postQuote(formData);

      toast.success("Quote Request Submitted ✅");

      // ✅ RESET
      setPatientData({
        name: "",
        phone: "",
        age: "",
        gender: "",
        date: "",
        medicalHistory: "",
      });

      setSelectedCity("");
      setSelectedHospital("");
      setSelectedFile(null);
      setSelectedProcedure(null);
      setActiveSpecialty(null);
    } catch (error) {
      console.error("Submit Error:", error);

      // ✅ SHOW BACKEND ERROR IF EXISTS
      if (error?.response?.data?.errors) {
        const errors = error.response.data.errors;

        Object.keys(errors).forEach((key) => {
          toast.error(errors[key][0]);
        });
      } else {
        toast.error("Something went wrong ❌");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return <div className="text-center p-5">Loading available services...</div>;

  return (
    <>
      {/* HEADER */}
      <div
        className="tp-breadcrumb-area tp-breadcrumb-overly bg-position"
        style={{ padding: "50px", backgroundColor: "#346fa3" }}
      >
        <div className="container text-center">
          <h2 className="text-white" style={{ fontSize: "36px" }}>
            Get A Quote
          </h2>
          <p
            className="text-white opacity-75"
            style={{ fontSize: "18px", marginTop: "6px" }}
          >
            Clarimed envisions accessible and affordable healthcare for all.
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: "#f8f9fa", paddingBottom: "100px" }}>
        {/* SEARCH */}
        {!selectedProcedure && (
          <div
            className="container"
            style={{ marginTop: "-30px", position: "relative", zIndex: 4 }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "50px",
                    padding: "15px 30px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa fa-search"
                    style={{ color: "#346fa3", marginRight: "15px" }}
                  ></i>
                  <input
                    type="text"
                    placeholder="Search for a specialty..."
                    style={{
                      border: "none",
                      outline: "none",
                      width: "100%",
                      fontSize: "16px",
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1 */}
        <div className="container" style={{ marginTop: "50px" }}>
          <h5 className="fw-bold mb-4">1. Browse By Speciality</h5>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {filteredSpecialties.map((item) => {
              const isActive = activeSpecialty?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveSpecialty(item);
                    setSelectedProcedure(null);
                  }}
                  style={{
                    padding: "10px 22px",
                    borderRadius: "30px",
                    border: isActive
                      ? "2px solid #007684"
                      : "1.5px solid #d1d9e0",
                    backgroundColor: isActive ? "#007684" : "white",
                    color: isActive ? "white" : "#333",
                    cursor: "pointer",
                  }}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 2 */}
        {activeSpecialty && (
          <div className="container mt-5 pt-4 border-top">
            <h5 className="fw-bold mb-4">
              2. Select Procedure for {activeSpecialty.name}
            </h5>

            <div className="row g-3">
              {(activeSpecialty.treatments || []).map((treat) => (
                <div className="col-md-3" key={treat.id}>
                  <div
                    onClick={() => setSelectedProcedure(treat.name)}
                    style={{
                      padding: "15px",
                      textAlign: "center",
                      borderRadius: "10px",
                      cursor: "pointer",
                      border:
                        selectedProcedure === treat.name
                          ? "2px solid #346fa3"
                          : "1px solid #dee2e6",
                      backgroundColor:
                        selectedProcedure === treat.name ? "#eef6ff" : "white",
                      color: "#346fa3",
                      fontWeight: "bold",
                    }}
                  >
                    {treat.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {selectedProcedure && (
          <div className="container mt-5 pt-4 border-top">
            <h5 className="fw-bold mb-4">3. Provide Patient Details</h5>

            <div
              className="card shadow-lg border-0"
              style={{ borderRadius: "15px" }}
            >
              <div
                className="card-header text-white py-3"
                style={{ backgroundColor: "rgb(5, 40, 74)" }}
              >
                <h5 className="mb-0 text-white">
                  Quote Request: {selectedProcedure}
                </h5>
              </div>

              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="form-control"
                        value={patientData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        className="form-control"
                        value={patientData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold">Select City</label>
                      <select
                        className="form-select"
                        value={selectedCity}
                        onChange={(e) => {
                          setSelectedCity(e.target.value);
                          setSelectedHospital("");
                        }}
                        required
                      >
                        <option value="">Select City</option>
                        {cities.map((city, i) => (
                          <option key={i} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold">
                        Preferred Hospital
                      </label>
                      <select
                        className="form-select"
                        value={selectedHospital}
                        onChange={(e) => setSelectedHospital(e.target.value)}
                        disabled={!selectedCity}
                        required
                      >
                        <option value="">
                          {selectedCity
                            ? "Select Hospital"
                            : "First select city"}
                        </option>

                        {filteredHospitals.map((h) => (
                          <option key={h.id} value={h.slug || h.name}>
                            {h.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* FIXED FIELDS */}
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Age</label>
                      <input
                        type="number"
                        name="age"
                        className="form-control py-2"
                        placeholder="Patient Age"
                        value={patientData.age}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-bold">Gender</label>
                      <select
                        name="gender"
                        className="form-select py-2"
                        value={patientData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-bold">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        className="form-control py-2"
                        value={patientData.date}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-bold">
                        Medical History / Symptoms
                      </label>
                      <textarea
                        name="medicalHistory"
                        className="form-control"
                        rows="3"
                        placeholder="Briefly describe your condition..."
                        value={patientData.medicalHistory}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* FILE UPLOAD */}
                    <div className="col-12 mt-3">
                      <label className="form-label fw-bold">
                        Upload Medical Reports (Optional)
                      </label>

                      <input
                        style={{
                          border: "2px dashed #d1d9e0",
                          borderRadius: "10px",
                          padding: "20px",
                          textAlign: "center",
                          backgroundColor: "#fdfdfd",
                          cursor: "pointer",
                          transition: "0.3s",
                        }}
                        type="file"
                        className="form-control"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                      />

                      {selectedFile && (
                        <div className="mt-2 text-success">
                          File: {selectedFile.name}
                        </div>
                      )}
                    </div>

                    <div className="col-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary px-5 py-3"
                        disabled={isSubmitting}
                        style={{
                          backgroundColor: "#053c6c",
                          borderRadius: "50px",
                          border: "none",
                        }}
                      >
                        {isSubmitting ? "Sending..." : "Submit Quote Request"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default GetQuote;
