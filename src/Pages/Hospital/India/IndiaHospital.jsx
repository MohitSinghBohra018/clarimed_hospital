import React, { useState, useEffect, useMemo } from "react";
import EnquiryForm from "../../../Components/Common/EnquiryForm";
import { Link, useParams, useLocation } from "react-router-dom";
import { CommonService } from "../../../services/common.service";

const IndiaHospital = () => {
  const { country_slug, department_slug } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const normalizeText = (text) =>
    text?.toString().trim().toLowerCase().replace(/[\s\/]+/g, " ").replace(/\s+/g, " ") || "";

  // ✅ 1. Draft State (Dropdown selections)
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "All");

  // 🔥 2. Applied State (Actual filtering - updates ONLY on search click)
  const [appliedDept, setAppliedDept] = useState("");
  const [appliedCity, setAppliedCity] = useState(searchParams.get("city") || "All");

  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState(["All"]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchHospitals();
    fetchDepartments();
    fetchSettings();
  }, [country_slug, department_slug]);

  // Handle URL changes and initial URL slugs
  useEffect(() => {
    const city = searchParams.get("city");
    const department = searchParams.get("department");
    
    // Auto-apply if department_slug exists in URL path or query
    const activeDept = department || department_slug;

    if (city || activeDept) {
      if (city) { setSelectedCity(city); setAppliedCity(city); }
      if (activeDept) { setSelectedDept(activeDept); setAppliedDept(activeDept); }
      setShowFilters(true);
    }
  }, [location.search, department_slug]);

  // Dynamic SEO Logic
  useEffect(() => {
    if (hospitals.length > 0) {
      const seoSource = hospitals[0];
      let dynamicTitle = "";
      const currentDeptName = appliedDept 
        ? departments.find((d) => d.slug === appliedDept)?.name 
        : (department_slug ? department_slug.charAt(0).toUpperCase() + department_slug.slice(1) : "");

      if (appliedCity !== "All" && currentDeptName) {
        dynamicTitle = `Best ${currentDeptName} Hospitals in ${appliedCity}`;
      } else if (appliedCity !== "All") {
        dynamicTitle = `Best Hospitals in ${appliedCity}`;
      } else if (currentDeptName) {
        dynamicTitle = `Best ${currentDeptName} Hospitals in India`;
      } else {
        dynamicTitle = seoSource.meta_title || "Best Hospitals in India";
      }

      document.title = dynamicTitle;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", seoSource.meta_description || "Find top multi-speciality hospitals on Clarimed.");
      }
    }
  }, [hospitals, appliedDept, appliedCity, department_slug, departments]);

  const fetchDepartments = async () => {
    try {
      const res = await CommonService.getHeaderData();
      const deptData = res[1]?.data || res[1];
      if (Array.isArray(deptData)) setDepartments(deptData);
    } catch (error) { console.error("Department API Error:", error); }
  };

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      const c_slug = country_slug || "india";
      const response = await CommonService.getHospitals(c_slug, "");
      const apiData = response?.data || response;

      if (Array.isArray(apiData) && apiData.length > 0) {
        setHospitals(apiData);
        const cityList = apiData.map((h) => h?.city?.name).filter(Boolean);
        setCities(["All", ...new Set(cityList)]);
      }
    } catch (error) { console.error("API ERROR:", error); } 
    finally { setLoading(false); }
  };

  // ✅ 3. Local filtering (Linked to APPLIED state)
  const filteredHospitals = useMemo(() => {
    let filtered = hospitals;
    if (appliedDept) {
      filtered = filtered.filter((h) =>
        h.departments?.some((d) => d.slug === appliedDept)
      );
    }
    if (appliedCity !== "All") {
      const normalizedAppliedCity = normalizeText(appliedCity);
      filtered = filtered.filter((h) => {
        const hospitalCity = normalizeText(h.city?.name);
        return hospitalCity.includes(normalizedAppliedCity);
      });
    }
    return filtered;
  }, [hospitals, appliedDept, appliedCity]);

  // ✅ 4. Search Handler
  const handleSearch = () => {
    setAppliedDept(selectedDept);
    setAppliedCity(selectedCity);
    setShowFilters(true);
  };

  // ✅ 5. Clear Filters Handler
  const handleClearFilters = () => {
    setSelectedDept("");
    setSelectedCity("All");
    setAppliedDept("");
    setAppliedCity("All");
    setShowFilters(false);
  };

  const fetchSettings = async () => {
    try {
      const res = await CommonService.getSettings();
      const phone = res?.data?.phone || res?.phone;
      if (phone) setWhatsappNumber(phone.replace(/\s+/g, ""));
    } catch (error) { console.error("Settings Error:", error); }
  };

  return (
    <main>
      <div className="tp-breadcrumb-area tp-breadcrumb-overly bg-position" style={{ padding: "50px", backgroundColor: "#346fa3" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="tp-breadcrumb-wrap text-center">
                <h2 className="tp-breadcrumb-title fs-10 text-center mb-0" style={{ fontSize: "38px", color: "white" }}>
                  Best {showFilters && appliedDept
                    ? `${departments.find((d) => d.slug === appliedDept)?.name || appliedDept}`
                    : department_slug?.charAt(0).toUpperCase() + department_slug?.slice(1) || "Speciality"} Hospitals {showFilters && appliedCity !== "All"
                    ? `in ${appliedCity}`
                    : `in ${country_slug?.toUpperCase() || "India"}`}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tp-tour-details-area pt-50 pb-50" style={{ backgroundColor: "rgb(240, 248, 255)" }}>
        <div className="container container-1350">
          <div className="row">
            <EnquiryForm />
            <div className="col-lg-8 mb-30">
              
              {/* Filter UI - Unchanged Design */}
              <div className="filter-bar mb-4 p-3 bg-white rounded-4 shadow-sm">
                <div className="row g-2 align-items-center">
                  <div className="col-12 col-md-4">
                    <select className="form-select" style={{ borderRadius: "20px" }} value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                      <option value="">All Departments</option>
                      {departments.map((dept) => (<option key={dept.id} value={dept.slug}>{dept.name}</option>))}
                    </select>
                  </div>
                  <div className="col-12 col-md-4">
                    <select className="form-select" style={{ borderRadius: "20px" }} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                      {cities.map((city, index) => (<option key={index} value={city}>{city === "All" ? "All Cities" : city}</option>))}
                    </select>
                  </div>
                  <div className="col-12 col-md-4">
                    <button type="button" onClick={handleSearch} className="btn w-100" style={{ backgroundColor: "#dc3545", color: "#fff", borderRadius: "20px", height: "38px" }}>Search</button>
                  </div>
                </div>
              </div>

              {/* Showing Results Info */}
              {showFilters && (
                <div className="filter-results mb-4 p-3 bg-light rounded-3 border-start border-danger" style={{ borderLeftWidth: "4px" }}>
                  <p className="mb-0">
                    <strong>🔍 Showing Results For:</strong>
                    {appliedDept ? ` Department: ${departments.find((d) => d.slug === appliedDept)?.name}` : " All Departments"}
                    {appliedCity !== "All" ? ` | City: ${appliedCity}` : " | All Cities"}
                    <span style={{ cursor: "pointer", marginLeft: "15px", color: "#dc3545" }} onClick={handleClearFilters}>✕ Clear Filters</span>
                  </p>
                </div>
              )}

              {/* Hospital List Rendering */}
              {loading ? (
                <div className="text-center mt-5"><h4>Loading...</h4></div>
              ) : filteredHospitals.length > 0 ? (
                filteredHospitals.map((hospital) => (
                  <div className="doctor-card-container mt-3" key={hospital.id}>
                    <div className="doctor-card-content d-flex flex-column flex-md-row align-items-center">
                      <div className="doctor-image-wrapper me-md-4 mb-3 mb-md-0">
                        <img src={hospital.main_image} alt={hospital.name} className="img-fluid" style={{ maxWidth: "210px", borderRadius: "8px" }} />
                      </div>
                      <div className="doctor-info">
                        <h2 className="doctor-name"><i className="fa-solid fa-hospital me-2"></i>{hospital.name}</h2>
                        <div className="doctor-meta-info mt-3">
                          <p><i className="fa-solid fa-location-dot me-2 text-danger"></i><strong>Location :</strong> {hospital.address}</p>
                          <p><i className="fa-solid fa-calendar-check me-2 text-primary"></i><strong>Established in:</strong> {hospital.established_year}</p>
                          <p><i className="fa-solid fa-bed me-2 text-success"></i><strong>Number of Beds:</strong> {hospital.bed_capacity}</p>
                        </div>
                        <div className="doctor-actions d-flex flex-wrap gap-2 mt-4">
                          <Link to={`/hospital/${hospital.slug}`}><button className="btn btn-readmore"><i className="fa-solid fa-circle-info me-1"></i>Read More</button></Link>
                          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="btn btn-chat" style={{ textDecoration: "none" }}><i className="fa-brands fa-whatsapp me-1"></i>Chat Now</a>
                          <Link to="/consultation-form"><button className="btn btn-book"><i className="fa-solid fa-phone me-1"></i>Enquiry Now</button></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mt-5"><h4>No Hospitals Found.</h4></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndiaHospital;


// ------------



// import React, { useState, useEffect, useMemo } from "react";
// import EnquiryForm from "../../../Components/Common/EnquiryForm";
// import { Link, useParams, useLocation } from "react-router-dom";
// import { CommonService } from "../../../services/common.service";

// const IndiaHospital = () => {
//   const { country_slug, department_slug } = useParams();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);

//   const [hospitals, setHospitals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [whatsappNumber, setWhatsappNumber] = useState("");

//   // ✅ EXISTING Selections (Temporary state)
//   const [selectedDept, setSelectedDept] = useState(department_slug || "");
//   const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "All");

//   // 🔥 APPLIED Filters (Only updates on Search click)
//   const [appliedDept, setAppliedDept] = useState(department_slug || "");
//   const [appliedCity, setAppliedCity] = useState(searchParams.get("city") || "All");

//   const [departments, setDepartments] = useState([]);
//   const [cities, setCities] = useState(["All"]);
//   const [showFilters, setShowFilters] = useState(!!(department_slug || searchParams.get("city")));

//   const normalizeText = (text) =>
//     text?.toString().trim().toLowerCase().replace(/[\s\/]+/g, " ").replace(/\s+/g, " ") || "";

//   useEffect(() => {
//     fetchHospitals();
//     fetchDepartments();
//     fetchSettings();
//   }, [country_slug, department_slug]);

//   // Sync with URL params if they change
//   useEffect(() => {
//     const city = searchParams.get("city");
//     const department = searchParams.get("department") || department_slug;
//     if (city || department) {
//       if (city) { setSelectedCity(city); setAppliedCity(city); }
//       if (department) { setSelectedDept(department); setAppliedDept(department); }
//       setShowFilters(true);
//     }
//   }, [location.search, department_slug]);

//   // Dynamic SEO & Title Logic
//   useEffect(() => {
//     if (hospitals.length > 0) {
//       const seoSource = hospitals[0];
//       let dynamicTitle = "";
//       const currentDeptName = appliedDept 
//         ? departments.find((d) => d.slug === appliedDept)?.name 
//         : (department_slug ? department_slug.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()) : "");

//       if (appliedCity !== "All" && currentDeptName) {
//         dynamicTitle = `Best ${currentDeptName} Hospitals in ${appliedCity} | ClariMed`;
//       } else if (appliedCity !== "All") {
//         dynamicTitle = `Best Hospitals in ${appliedCity} | ClariMed`;
//       } else if (currentDeptName) {
//         dynamicTitle = `Best ${currentDeptName} Hospitals in India | ClariMed`;
//       } else {
//         dynamicTitle = seoSource.meta_title || "Best Hospitals in India | ClariMed";
//       }

//       document.title = dynamicTitle;
//       const metaDescription = document.querySelector('meta[name="description"]');
//       if (metaDescription) {
//         metaDescription.setAttribute("content", seoSource.meta_description || `Find top ${currentDeptName || ''} hospitals in ${appliedCity}.`);
//       }
//     }
//   }, [hospitals, appliedDept, appliedCity, departments]);

//   const fetchDepartments = async () => {
//     try {
//       const res = await CommonService.getHeaderData();
//       const deptData = res[1]?.data || res[1];
//       if (Array.isArray(deptData)) setDepartments(deptData);
//     } catch (error) { console.error("Dept Error:", error); }
//   };

//   const fetchHospitals = async () => {
//     try {
//       setLoading(true);
//       const c_slug = country_slug || "india";
//       const response = await CommonService.getHospitals(c_slug, "");
//       const apiData = response?.data || response;

//       if (Array.isArray(apiData)) {
//         setHospitals(apiData);
//         const cityList = apiData.map((h) => h?.city?.name).filter(Boolean);
//         setCities(["All", ...new Set(cityList)]);
//       }
//     } catch (error) { console.error("Hospital API Error:", error); } 
//     finally { setLoading(false); }
//   };

//   // ✅ LOCAL FILTERING logic
//   const filteredHospitals = useMemo(() => {
//     let filtered = hospitals;
//     if (appliedDept) {
//       filtered = filtered.filter((h) =>
//         h.departments?.some((d) => d.slug === appliedDept) || h.department?.slug === appliedDept
//       );
//     }
//     if (appliedCity !== "All") {
//       const normalizedCity = normalizeText(appliedCity);
//       filtered = filtered.filter((h) => normalizeText(h.city?.name).includes(normalizedCity));
//     }
//     return filtered;
//   }, [hospitals, appliedDept, appliedCity]);

//   const handleSearch = () => {
//     setAppliedDept(selectedDept);
//     setAppliedCity(selectedCity);
//     setShowFilters(true);
//   };

//   const handleClearFilters = () => {
//     setSelectedDept("");
//     setSelectedCity("All");
//     setAppliedDept("");
//     setAppliedCity("All");
//     setShowFilters(false);
//   };

//   const fetchSettings = async () => {
//     try {
//       const res = await CommonService.getSettings();
//       const phone = res?.data?.phone || res?.phone;
//       if (phone) setWhatsappNumber(phone.replace(/\s+/g, ""));
//     } catch (error) { console.error("Settings Error:", error); }
//   };

//   return (
//     <main>
//       <div className="tp-breadcrumb-area tp-breadcrumb-overly" style={{ padding: "50px", backgroundColor: "#346fa3" }}>
//         <div className="container text-center">
//           <h2 style={{ fontSize: "38px", color: "white" }}>
//             Best {appliedDept ? departments.find(d => d.slug === appliedDept)?.name : "Healthcare"} Hospitals {appliedCity !== "All" ? `in ${appliedCity}` : `in ${country_slug?.toUpperCase() || "India"}`}
//           </h2>
//         </div>
//       </div>

//       <div className="tp-tour-details-area pt-50 pb-50" style={{ backgroundColor: "rgb(240, 248, 255)" }}>
//         <div className="container container-1350">
//           <div className="row">
//             <EnquiryForm />
//             <div className="col-lg-8 mb-30">
              
//               {/* FILTER BAR */}
//               <div className="filter-bar mb-4 p-3 bg-white rounded-4 shadow-sm">
//                 <div className="row g-2 align-items-center">
//                   <div className="col-md-4">
//                     <select className="form-select" style={{ borderRadius: "20px" }} value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
//                       <option value="">All Departments</option>
//                       {departments.map((dept) => (<option key={dept.id} value={dept.slug}>{dept.name}</option>))}
//                     </select>
//                   </div>
//                   <div className="col-md-4">
//                     <select className="form-select" style={{ borderRadius: "20px" }} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
//                       {cities.map((city, i) => (<option key={i} value={city}>{city === "All" ? "All Cities" : city}</option>))}
//                     </select>
//                   </div>
//                   <div className="col-md-4">
//                     <button onClick={handleSearch} className="btn w-100" style={{ backgroundColor: "#dc3545", color: "#fff", borderRadius: "20px", height: "38px" }}>Search</button>
//                   </div>
//                 </div>
//               </div>

//               {/* APPLIED FILTER CHIPS */}
//               {showFilters && (
//                 <div className="filter-results mb-4 p-3 bg-light rounded-3 border-start border-danger" style={{ borderLeftWidth: "4px" }}>
//                   <p className="mb-0">
//                     <strong>🔍 Results:</strong> 
//                     {appliedDept ? ` ${departments.find(d => d.slug === appliedDept)?.name}` : " All Specialties"} 
//                     {appliedCity !== "All" ? ` | City: ${appliedCity}` : " | All Cities"}
//                     <span style={{ cursor: "pointer", marginLeft: "15px", color: "#dc3545" }} onClick={handleClearFilters}>✕ Clear</span>
//                   </p>
//                 </div>
//               )}

//               {/* LISTING */}
//               {loading ? (
//                 <div className="text-center mt-5"><h4>Loading...</h4></div>
//               ) : filteredHospitals.length > 0 ? (
//                 filteredHospitals.map((hospital) => (
//                   <div className="doctor-card-container mt-3" key={hospital.id}>
//                     <div className="doctor-card-content d-flex flex-column flex-md-row align-items-center">
//                       <div className="doctor-image-wrapper me-md-4 mb-3 mb-md-0">
//                         <img src={hospital.main_image} alt={hospital.name} className="img-fluid" style={{ maxWidth: "210px", borderRadius: "8px" }} />
//                       </div>
//                       <div className="doctor-info">
//                         <h2 className="doctor-name"><i className="fa-solid fa-hospital me-2"></i>{hospital.name}</h2>
//                         <div className="doctor-meta-info mt-3">
//                           <p><i className="fa-solid fa-location-dot me-2 text-danger"></i><strong>Location:</strong> {hospital.address}</p>
//                           <p><i className="fa-solid fa-bed me-2 text-success"></i><strong>Beds:</strong> {hospital.bed_capacity}</p>
//                         </div>
//                         <div className="doctor-actions d-flex flex-wrap gap-2 mt-4">
//                           <Link to={`/hospital/${hospital.slug}`} className="btn btn-readmore">Read More</Link>
//                           <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="btn btn-chat"><i className="fa-brands fa-whatsapp me-1"></i>Chat Now</a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center mt-5"><h4>No Hospitals Found.</h4></div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default IndiaHospital;