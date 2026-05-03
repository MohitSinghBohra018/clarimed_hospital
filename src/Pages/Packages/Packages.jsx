import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CommonService } from "../../services/common.service";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const pageSize = 12;

  // ✅ Fetch Packages API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await CommonService.getPackages();
        setPackages(res.data || []);
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // ✅ Dynamic Filter Options
  const specialities = [
    "All",
    ...new Set(packages.map((p) => p.speciality?.name).filter(Boolean)),
  ];

  // ✅ Filter Logic
  const filteredPackages =
    selectedFilter === "All"
      ? packages
      : packages.filter(
          (pkg) => pkg.speciality?.name === selectedFilter
        );

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredPackages.length / pageSize);

  const visiblePackages = filteredPackages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <main>
      {/* 🔹 Breadcrumb */}
      <div
        className="tp-breadcrumb-area tp-breadcrumb-overly bg-position"
        style={{ padding: "50px", backgroundColor: "#346fa3" }}
      >
        <div className="container text-center">
          <h2 style={{ fontSize: "36px", color: "#fff" }}>
            All-Inclusive Treatment Packages
          </h2>
          <p style={{ fontSize: "18px", color: "#fff" }}>
            One package, complete care—covering consultations, procedures, and
            recovery for a smooth healthcare experience.
          </p>
        </div>
      </div>

      {/* 🔹 Filter */}
      <section className="med-pck-section">
        <div className="container mb-4">
          <div className="d-flex align-items-center">
            <label className="me-3 fw-bold">Filter by:</label>

            <select
              className="form-select"
              style={{ width: "260px" }}
              value={selectedFilter}
              onChange={(e) => {
                setSelectedFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              {specialities.map((sp, index) => (
                <option key={index} value={sp}>
                  {sp}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 🔹 Packages Grid */}
        <div className="container">
          <div className="row">
            {loading ? (
              <p className="text-center">Loading packages...</p>
            ) : visiblePackages.length === 0 ? (
              <p className="text-center">No packages found</p>
            ) : (
              visiblePackages.map((item) => (
                <div className="col-md-4 col-sm-6 mb-4" key={item.id}>
                  <div className="med-pck-card">
                    
                    <div className="med-pck-image-box">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="med-pck-content">
                      <p className="med-pck-cat">
                        {item.speciality?.name}
                      </p>

                      <h3 className="med-pck-title">{item.name}</h3>

                      {/* <p className="med-pck-loc">
                        {item.hospital_name}, {item.location}
                      </p>

                      <div className="med-pck-stats">
                        <span>
                          <b>{item.total_days}</b> Days Total
                        </span>

                        <span>
                          <b>{item.hospital_days}</b> Hosp. Days
                        </span>
                      </div> */}
                    </div>

                    <div className="med-pck-footer">
                      <div className="med-pck-price-grp">
                        <span
                          className="med-pck-label"
                          style={{ fontWeight: 600 }}
                        >
                          Cost in INR
                        </span>
                        <span className="med-pck-amt">
                          {item.cost_in_inr}
                        </span>
                      </div>

                      <Link to="/consultation-form">
                        <button className="med-pck-view-btn">
                          Book Consultation
                        </button>
                      </Link>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* 🔹 Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4 gap-2 flex-wrap">
              <button
                className="btn btn-outline-primary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`btn ${
                      currentPage === page
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className="btn btn-outline-primary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Packages;