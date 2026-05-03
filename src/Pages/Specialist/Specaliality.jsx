import React, { useState, useEffect, useMemo } from "react";

import { Link, useParams } from "react-router-dom";
// CommonService
import EnquiryForm from "../../Components/Common/EnquiryForm";
import { CommonService } from "../../services/common.service";

const Specaliality = () => {
  const { treatment_slug, department_slug } = useParams();

  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  // Filter States
  const [selectedHospital, setSelectedHospital] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");

  // Applied Filters
  const [appliedHospital, setAppliedHospital] = useState("All");
  const [appliedCity, setAppliedCity] = useState("All");

  const [treatmentDetails, setTreatmentDetails] = useState(null);

  // Dynamic cities
  const [cities, setCities] = useState(["All"]);

  // Show filters
  const [showFilters, setShowFilters] = useState(false);

  // ✅ Load on slug change
  useEffect(() => {
    fetchInitialData();
    fetchDoctors();
    fetchSettings();
    fetchTreatmentDetails(); // New call
  }, [treatment_slug]);

  const fetchTreatmentDetails = async () => {
    try {
      // Safety 1: Use the service correctly
      const res = await CommonService.getTreatmentBySlug();

      // Safety 2: Check all possible data paths from your axios instance
      const allTreatments = res?.data?.data || res?.data || [];

      if (Array.isArray(allTreatments)) {
        const currentTreatment = allTreatments.find(
          (t) => t.slug === treatment_slug,
        );
        if (currentTreatment) {
          setTreatmentDetails(currentTreatment);
        }
      }
    } catch (error) {
      console.error("Treatment Details Error:", error);
    }
  };

  // ✅ Fetch hospitals
  const fetchInitialData = async () => {
    try {
      // hospitals
      const hospRes = await CommonService.getHospitals("india", "");
      const hospData = hospRes?.data?.data || hospRes?.data || [];
      setHospitals(hospData);

      // Extract cities from hospitals
      const cityList = hospData.map((h) => h?.city?.name).filter(Boolean);
      const uniqueCities = ["All", ...new Set(cityList)];
      setCities(uniqueCities);
    } catch (error) {
      console.error("Filter Data Error:", error);
      setCities(["All"]);
    }
  };

  // ✅ Fetch doctors based on treatment
  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const response = await CommonService.getSpecialities("", treatment_slug);

      const apiData = response?.data?.data || response?.data || [];

      if (Array.isArray(apiData)) {
        setDoctors(apiData);
        // Extract unique cities from doctors and combine with existing cities
        const doctorCityList = apiData
          .map((d) => d?.hospital?.city?.name || d?.city?.name)
          .filter(Boolean);
        const hospitalCityList = hospitals
          .map((h) => h?.city?.name)
          .filter(Boolean);
        const allCities = [...doctorCityList, ...hospitalCityList];
        const uniqueCities = ["All", ...new Set(allCities)];
        setCities(uniqueCities);
      } else {
        setDoctors([]);
        // Keep cities from hospitals
      }
    } catch (error) {
      console.error("API Error:", error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Search button
  const handleSearch = () => {
    setAppliedHospital(selectedHospital);
    setAppliedCity(selectedCity);
    setShowFilters(true);
  };

  // Clear Filters
  const handleClearFilters = () => {
    setSelectedHospital("All");
    setSelectedCity("All");
    setAppliedHospital("All");
    setAppliedCity("All");
    setShowFilters(false);
  };

  // Local filtering
  const filteredDoctors = useMemo(() => {
    let filtered = doctors;
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
  }, [doctors, appliedHospital, appliedCity]);

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
      {/* Breadcrumb */}
      <div
        className="tp-breadcrumb-area tp-breadcrumb-overly bg-position"
        style={{ padding: "50px", backgroundColor: "#346fa3" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="tp-breadcrumb-wrap text-center">
                <h2
                  className="tp-breadcrumb-title fs-10 text-center mb-0"
                  style={{ fontSize: "36px", color: "white" }}
                >
                  Best {department_slug?.replace("-", " ") || "Specialists"} in{" "}
                  {treatment_slug?.replace("-", " ") || "India"}
                </h2>

                {treatmentDetails?.description ? (
                  <div
                    style={{
                      fontSize: "18px",
                      color: "white",
                      marginTop: "10px",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: treatmentDetails.description,
                    }}
                  />
                ) : (
                  <p className="text-white mt-2">
                    Expert care and advanced treatment options for{" "}
                    {treatmentDetails?.name}.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="tp-tour-details-area pt-50 pb-50"
        style={{ backgroundColor: "#f0f8ff" }}
      >
        <div className="container container-1350">
          <div className="row">
            <EnquiryForm />

            <div className="col-lg-8">
              {/* FILTER */}
              <div className="filter-bar mb-4 p-3 bg-white rounded-4 shadow-sm">
                <div className="row g-2 align-items-center">
                  {/* City */}
                  <div className="col-12 col-md-4">
                    <select
                      className="form-select"
                      style={{ borderRadius: "20px" }}
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
                  <div className="col-12 col-md-4">
                    <select
                      className="form-select"
                      style={{ borderRadius: "20px" }}
                      value={selectedHospital}
                      onChange={(e) => setSelectedHospital(e.target.value)}
                    >
                      <option value="All">All Hospitals</option>
                      {hospitals.map((h) => (
                        <option key={h.id} value={h.slug}>
                          {h.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Search Button */}
                  <div className="col-12 col-md-4">
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="btn w-100"
                      style={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        borderRadius: "20px",
                        height: "38px",
                      }}
                    >
                      <i className="fa fa-search me-2"></i>
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Show Filter Results */}
              {showFilters && (
                <div
                  className="filter-results mb-4 p-3 bg-light rounded-3 border-start border-danger"
                  style={{ borderLeftWidth: "4px" }}
                >
                  <p className="mb-0">
                    <strong>🔍 Showing Results For:</strong>
                    Hospital:{" "}
                    {appliedHospital !== "All"
                      ? hospitals.find((h) => h.slug === appliedHospital)?.name
                      : "All Hospitals"}{" "}
                    | City: {appliedCity !== "All" ? appliedCity : "All Cities"}
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

              {/* DOCTORS */}
              {loading ? (
                <h4 className="text-center">Loading...</h4>
              ) : filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div className="doctor-card-container mt-4" key={doctor.id}>
                    <div className="d-flex flex-md-row flex-column align-items-center">
                      {/* Image */}
                      <div>
                        <img
                          src={doctor.photo || doctor.main_image}
                          alt={doctor.name}
                          className="img-fluid"
                          style={{ maxWidth: "210px", borderRadius: "8px" }}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/200";
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div className="doctor-info ms-md-4 mt-3">
                        <h2 className="doctor-name">{doctor.name}</h2>

                        <h5 className="doctor-specialty">
                          {doctor.speciality || doctor.designation}
                        </h5>

                        <div className="doctor-meta-info mt-3">
                          <p>
                            <i className="fa-solid fa-stethoscope me-2 text-warning"></i>
                            <strong>Position:</strong>{" "}
                            {doctor.designation || "N/A"}
                          </p>

                          <p>
                            <i className="fa-solid fa-user-doctor me-2 text-primary"></i>
                            <strong>Experience:</strong>{" "}
                            {doctor.experience_years
                              ? `${doctor.experience_years} Years of Experience`
                              : "N/A"}
                          </p>

                          <p>
                            <i className="fa-solid fa-location-dot me-2 text-danger"></i>
                            <strong>Address:</strong> {doctor.address || "N/A"}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="doctor-actions d-flex flex-wrap gap-2 mt-4">
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
                            to={`/doctors/${doctor.slug}`}
                            className="btn btn-readmore"
                          >
                            Read More
                          </Link>

                          <Link
                            to={`/book-appointment/${doctor.slug}`}
                            className="btn btn-book"
                          >
                            <i className="fa-solid fa-calendar-plus me-1"></i>
                            Book Free Appointment
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h4 className="text-center">No Doctors Found</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Specaliality;
