import React, { useState, useEffect, useMemo } from "react";
import EnquiryForm from "../../../Components/Common/EnquiryForm";
import { Link, useParams } from "react-router-dom";
import { CommonService } from "../../../services/common.service";

const DoctorList = () => {
  const { country_slug, department_slug } = useParams();

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [whatsappNumber, setWhatsappNumber] = useState("");

  // ✅ EXISTING (current selections - before search)
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");

  // 🔥 NEW (applied filters - only update on search)
  const [appliedDept, setAppliedDept] = useState("");
  const [appliedHospital, setAppliedHospital] = useState("All");
  const [appliedCity, setAppliedCity] = useState("All");

  // 🔥 NEW (dynamic cities)
  const [cities, setCities] = useState(["All"]);

  // 🔥 NEW (show filter text after search)
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchDoctors();
    fetchInitialData();
    fetchSettings();
  }, [country_slug, department_slug]);

  // ✅ Dynamic SEO Logic for Doctor Listing
  useEffect(() => {
    if (doctors.length > 0) {
      // 1. Get default meta data from the first doctor/hospital in the list
      const seoSource = doctors[0];

      // 2. Create a Dynamic Title based on SEARCH results
      let dynamicTitle = "";
      
      // Get readable department name
      const currentDeptName = appliedDept 
        ? departments.find((d) => d.slug === appliedDept)?.name 
        : (department_slug ? department_slug.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()) : "");

      if (appliedCity !== "All" && currentDeptName) {
        dynamicTitle = `Best ${currentDeptName} Doctors in ${appliedCity} | ClariMed`;
      } else if (appliedCity !== "All") {
        dynamicTitle = `Best Doctors in ${appliedCity} | ClariMed Healthcare`;
      } else if (currentDeptName) {
        dynamicTitle = `Best ${currentDeptName} Specialists in India | ClariMed`;
      } else {
        // Fallback to API meta_title or a generic one
        dynamicTitle = seoSource.meta_title || "Find the Best Doctors in India | ClariMed Healthcare";
      }

      // 3. Update Browser Tab
      document.title = dynamicTitle;

      // 4. Update Meta Description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          seoSource.meta_description || `Find and book appointments with leading ${currentDeptName || 'medical'} specialists in ${appliedCity !== 'All' ? appliedCity : 'India'}.`
        );
      }

      // 5. Update Meta Keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute(
          "content",
          seoSource.meta_keywords || "best doctors, book appointment, specialist doctors India"
        );
      }
    }
  }, [doctors, appliedDept, appliedCity, department_slug, departments]);

  // 🔥 NEW: Auto-apply filter if coming from header with department_slug
  useEffect(() => {
    if (department_slug) {
      setSelectedDept(department_slug);
      setAppliedDept(department_slug);
      setShowFilters(true);
      console.log("Auto-applied department from URL:", department_slug);
    }
  }, [department_slug]);

  const fetchInitialData = async () => {
    try {
      const res = await CommonService.getHeaderData();
      setDepartments(res[1]?.data || res[1] || []);

      // Fetching all hospitals to show in the dropdown
      const hospRes = await CommonService.getHospitals(
        country_slug || "india",
        "",
      );
      const hospData = hospRes?.data || hospRes || [];
      setHospitals(hospData);
    } catch (error) {
      console.error("Filter Data Error:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const c_slug = country_slug || "india";

      // Always fetch all doctors for the country, filter locally
      const response = await CommonService.getDoctors(c_slug, "", "");
      const apiData = response?.data || response;

      if (Array.isArray(apiData) && apiData.length > 0) {
        setDoctors(apiData);
        // Extract unique cities
        const cityList = apiData
          .map((d) => d?.hospital?.city?.name || d?.city?.name)
          .filter(Boolean);
        const uniqueCities = ["All", ...new Set(cityList)];
        setCities(uniqueCities);
      } else {
        setDoctors([]);
        setCities(["All"]);
      }
    } catch (error) {
      console.error("API Error:", error);
      setDoctors([]);
      setCities(["All"]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Triggered when "Search" button is clicked
  const handleSearch = () => {
    // Apply the selected filters only when Search is clicked
    setAppliedDept(selectedDept);
    setAppliedHospital(selectedHospital);
    setAppliedCity(selectedCity);
    setShowFilters(true);
    console.log("Search clicked - filtering by:", {
      selectedDept,
      selectedHospital,
      selectedCity,
    });
  };

  // 🔥 NEW: Clear Filters Function
  const handleClearFilters = () => {
    setSelectedDept("");
    setSelectedHospital("All");
    setSelectedCity("All");
    setAppliedDept("");
    setAppliedHospital("All");
    setAppliedCity("All");
    setShowFilters(false);
  };

  // 🔥 NEW: Local filtering (using APPLIED filters)
  const filteredDoctors = useMemo(() => {
    let filtered = doctors;
    if (appliedDept) {
      filtered = filtered.filter(
        (d) =>
          d.speciality?.some?.((s) => s?.slug === appliedDept) ||
          d.speciality?.slug === appliedDept ||
          d.department?.slug === appliedDept ||
          d.departments?.some((dp) => dp?.slug === appliedDept),
      );
    }
    if (appliedHospital !== "All" && appliedHospital) {
      filtered = filtered.filter((d) => d.hospital?.slug === appliedHospital);
    }
    if (appliedCity !== "All" && appliedCity) {
      filtered = filtered.filter(
        (d) =>
          d.hospital?.city?.name === appliedCity ||
          d.city?.name === appliedCity,
      );
    }
    return filtered;
  }, [doctors, appliedDept, appliedHospital, appliedCity]);

  const fetchSettings = async () => {
    try {
      const res = await CommonService.getSettings();
      const phone = res?.data?.phone || res?.phone;
      if (phone) {
        // Remove spaces or plus signs for the WhatsApp URL, but keep it clean
        setWhatsappNumber(phone.replace(/\s+/g, ""));
      }
    } catch (error) {
      console.error("Settings Error:", error);
    }
  };

  return (
    <main>
      {/* Breadcrumb Section - UI Unchanged */}
      <div
        className="tp-breadcrumb-area tp-breadcrumb-overly bg-position"
        style={{ padding: "50px", backgroundColor: "#346fa3" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="tp-breadcrumb-wrap text-center">
                <h2
                  className="tp-breadcrumb-title text-center mb-0"
                  style={{ fontSize: "36px", color: "white" }}
                >
                  Best {department_slug?.replace("-", " ") || "Specialists"} in{" "}
                  {country_slug?.toUpperCase() || "India"}
                </h2>
                <p
                  className="tp-breadcrumb-title text-center mb-0"
                  style={{ fontSize: "18px", marginTop: "6px", color: "white" }}
                >
                  India’s leading specialists — trusted hands for every
                  heartbeat.
                </p>
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
            <EnquiryForm />

            <div className="col-lg-8 mb-30">
              {/* --- FILTER SECTION --- */}
              <div className="filter-bar mb-4 p-3 bg-white rounded-4 shadow-sm">
                <div className="row g-2 align-items-center">
                  {/* Department */}
                  <div className="col-12 col-md-3">
                    <select
                      className="form-select"
                      style={{ borderRadius: "20px", borderColor: "#ddd" }}
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                    >
                      <option value="">All Departments</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.slug}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City */}
                  <div className="col-12 col-md-3">
                    <select
                      className="form-select"
                      style={{ borderRadius: "20px", borderColor: "#ddd" }}
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city === "All" ? "All Cities" : city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Hospital */}
                  <div className="col-12 col-md-3">
                    <select
                      className="form-select"
                      style={{ borderRadius: "20px", borderColor: "#ddd" }}
                      value={selectedHospital}
                      onChange={(e) => setSelectedHospital(e.target.value)}
                    >
                      <option value="All">All Hospitals</option>
                      {hospitals.length > 0 ? (
                        hospitals.map((hosp) => (
                          <option key={hosp.id} value={hosp.slug}>
                            {hosp.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>Loading hospitals...</option>
                      )}
                    </select>
                  </div>

                  {/* Search Button */}
                  <div className="col-12 col-md-3">
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="btn w-100 d-flex justify-content-center align-items-center gap-2"
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
              </div>

              {/* 🔥 Show Filter Results */}
              {showFilters && (
                <div
                  className="filter-results mb-4 p-3 bg-light rounded-3 border-start border-danger"
                  style={{ borderLeftWidth: "4px" }}
                >
                  <p className="mb-0">
                    <strong>🔍 Showing Results For:</strong>
                    {appliedDept
                      ? ` Department: ${departments.find((d) => d.slug === appliedDept)?.name}`
                      : " All Departments"}
                    {appliedHospital !== "All"
                      ? ` | Hospital: ${hospitals.find((h) => h.slug === appliedHospital)?.name}`
                      : " | All Hospitals"}
                    {appliedCity !== "All"
                      ? ` | City: ${appliedCity}`
                      : " | All Cities"}
                    <span
                      style={{
                        cursor: "pointer",
                        marginLeft: "15px",
                        color: "#dc3545",
                      }}
                      onClick={handleClearFilters}
                    >
                      ✕ Clear Filters
                    </span>
                  </p>
                </div>
              )}

              {/* --- DOCTOR LISTING --- */}
              {loading ? (
                <div className="text-center mt-5">
                  <h4>Loading...</h4>
                </div>
              ) : filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div className="doctor-card-container mt-4" key={doctor.id}>
                    <div className="doctor-card-content d-flex flex-column flex-md-row align-items-center">
                      <div className="doctor-image-wrapper me-md-5 mb-3 mb-md-0">
                        <img
                          src={doctor.photo || doctor.main_image}
                          alt={doctor.name}
                          className="img-fluid"
                          style={{ maxWidth: "210px", borderRadius: "8px" }}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/210x210?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="doctor-info">
                        <h2 className="doctor-name">{doctor.name}</h2>
                        <h5 className="doctor-specialty">
                          {doctor.designation || doctor.speciality}
                        </h5>
                        <div className="doctor-meta-info mt-3">
                          <p>
                            <i className="fa-solid fa-stethoscope me-2 text-warning"></i>{" "}
                            <strong>Position:</strong>{" "}
                            {doctor.position || "Chairman"}
                          </p>
                          <p>
                            <i className="fa-solid fa-user-doctor me-2 text-primary"></i>{" "}
                            <strong>Experience:</strong>{" "}
                            {doctor.experience_years} Years
                          </p>
                          <p>
                            <i className="fa-solid fa-location-dot me-2 text-danger"></i>{" "}
                            <strong>Address:</strong>{" "}
                            {doctor.address || "India"}
                          </p>
                        </div>
                        <div className="doctor-actions d-flex flex-wrap gap-2 mt-4">
                          <Link
                            to={`/doctors/${doctor.slug}`}
                            className="btn btn-readmore"
                          >
                            Read More
                          </Link>
                          <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-chat"
                            style={{ textDecoration: "none" }}
                          >
                            <i className="fa-brands fa-whatsapp me-1"></i>
                            Chat Now
                          </a>
                          <Link
                            to={`/book-appointment/${doctor.slug}`}
                            className="btn btn-book"
                          >
                            <i className="fa-solid fa-calendar-plus me-1"></i>{" "}
                            Book Appointment
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mt-5">
                  <h4>No Doctors Found.</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DoctorList;
