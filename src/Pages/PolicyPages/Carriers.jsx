import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { CommonService } from "../../services/common.service";

const Carriers = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await CommonService.getSettings();
        setSettings(res.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="carriers-page-wrapper">
      {/* Header */}
      <div
        className="tp-breadcrumb-area tp-breadcrumb-overly"
        style={{
          padding: "80px 0",
          backgroundColor: "#346fa3",
          backgroundImage:
            "linear-gradient(rgba(52, 111, 163, 0.8), rgba(52, 111, 163, 0.8)), url('assets/img/breadcrumb/bg-6.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container text-center">
          <h2 className="text-white fw-bold mb-3" style={{ fontSize: "40px" }}>
            Careers
          </h2>
          <p
            className="tp-breadcrumb-title  text-center mb-0"
            style={{ fontSize: "18px", marginTop: "6px" }}
          >
            Empowering Patients through Transparency and Excellence.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Title */}
              <div className="section-title mb-4">
                <span className="text-primary fw-bold text-uppercase small">
                  Our Legacy
                </span>
                <h3 className="fw-bold mt-2" style={{ color: "#002244" }}>
                  A Foundation Built on 15 Years of Trust
                </h3>
              </div>

              {/* Text */}
              <div className="content-text mb-5">
                <p className="lead">
                  After spending over <strong>15 years</strong> across leading
                  healthcare institutions including{" "}
                  <strong>
                    Fortis Healthcare, Max Healthcare, CK Birla Hospitals,
                    Apollo Hospitals, and Eye Q Vision
                  </strong>
                  , I witnessed firsthand the "information wall" that separates
                  patients from clarity.
                </p>

                <p>
                  I have seen the anxiety that comes from not knowing whether
                  you are making the right medical decision. This inspired me to
                  build a next-generation healthcare aggregator—one that acts as
                  a <strong>trusted partner</strong> throughout the patient
                  journey.
                </p>

                {/* Highlights */}
                <div className="row g-4 my-4">
                  <div className="col-md-4">
                    <div className="p-3 border-start border-primary border-4 bg-light">
                      <h6 className="fw-bold mb-1">Institutional Expertise</h6>
                      <p className="small text-muted mb-0">
                        Decades of experience in top-tier hospital management.
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="p-3 border-start border-primary border-4 bg-light">
                      <h6 className="fw-bold mb-1">Patient-First Ethics</h6>
                      <p className="small text-muted mb-0">
                        Breaking the information wall for total clarity.
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="p-3 border-start border-primary border-4 bg-light">
                      <h6 className="fw-bold mb-1">End-to-End Support</h6>
                      <p className="small text-muted mb-0">
                        From consultation to recovery.
                      </p>
                    </div>
                  </div>
                </div>

                <p>
                  Our promise is simple: We are your healthcare partner. We
                  bring transparency and trust so you can focus on what matters
                  most —<strong> getting better with confidence.</strong>
                </p>
              </div>

              {/* Contact Section */}
              <div className="row g-4 text-center">
                {/* Email */}
                <div className="col-md-4">
                  <div className="p-4 border rounded h-100">
                    <Mail size={30} className="text-primary mb-3" />
                    <h6 className="fw-bold">Email Address</h6>
                    <a href={`mailto:${settings?.email}`}>
                      {settings?.email || "Loading..."}
                    </a><br></br>
                     <a href={`mailto:${settings?.email}`}>
                      {settings?.email2 }
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="col-md-4">
                  <div className="p-4 border rounded h-100">
                    <Phone size={30} className="text-primary mb-3" />
                    <h6 className="fw-bold">Phone Number</h6>
                    <a href={`tel:${settings?.phone}`}>
                      {settings?.phone || "Loading..."}
                    </a><br></br>
                     <a href={`tel:${settings?.phone}`}>
                      {settings?.phone2}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="col-md-4">
                  <div className="p-4 border rounded h-100">
                    <MapPin size={30} className="text-primary mb-3" />
                    <h6 className="fw-bold">Our Office</h6>
                    <p className="fw-bold mb-0">
                      {settings?.address || "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style>
        {`
          .content-text p {
            color: #4a5568;
            line-height: 1.8;
            margin-bottom: 1.5rem;
          }
          .text-primary {
            color: #346fa3 !important;
          }
        `}
      </style>
    </div>
  );
};

export default Carriers;
