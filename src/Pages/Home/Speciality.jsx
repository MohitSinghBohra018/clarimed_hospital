import React, { useEffect, useState } from "react";
import { CommonService } from "../../services/common.service";
import { Link } from "react-router-dom";

const Speciality = () => {
  const [departments, setDepartments] = useState([]);

  // ✅ Set default country (you can make this dynamic later)
  const countrySlug = "india";

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await CommonService.getHeaderData();
        const deptData = res[1].data || [];

        // ✅ Filter only featured
        const featured = deptData.filter(
          (item) => item.is_featured == "1"
        );

        setDepartments(featured);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <section className="specialties-wrapper">
      <div className="tp-section-title-wrapper text-center mb-50">
        <h2
          className="tp-section-title"
          style={{
            fontSize: 30,
            color: "var(--tp-common-black)",
            marginBottom: 15,
          }}
        >
          Multi-Specialty Focus
        </h2>
        <p>
        Whether it’s a cosmetic refinement or a complex transplant, our expertise spans the entire medical landscape.
        </p>
      </div>

      <div className="specialties-container">
        {departments.map((dept) => (
          <Link
            to={`/hospitals/${countrySlug}/${dept.slug}`}
            key={dept.id}
          >
            <div className="spec-card">
              
              <div className="spec-img">
                <img src={dept.image} alt={dept.name} />
              </div>

              <div className="spec-info">
                <div className="spec-header">
                  <h3>{dept.name}</h3>
                </div>

                <div className="spec-body">
                  <p>
                    {dept.description?.slice(0, 80)}...
                  </p>

                  <div className="circle-arrow">
                    <svg viewBox="0 0 24 24" width={18} height={18}>
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Speciality;