import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, FileText } from 'lucide-react';

const TermsCondition = () => {
  return (
    <div className="privacy-simple-layout">
      {/* Page Header */}
      <div
        className="tp-breadcrumb-area tp-breadcrumb-overly bg-position"
        style={{ padding: "60px 0", backgroundColor: "#346fa3" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="tp-breadcrumb-wrap text-center">
                <h2
                  className="tp-breadcrumb-title text-white text-center mb-0"
                  style={{ fontSize: "38px", fontWeight: "700" }}
                >
                  Terms and Conditions
                </h2>
              <p className="text-white mt-2" style={{ letterSpacing: '1.5px' }}>
                Please read these terms carefully before using our services.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-lg-9">
              
              <div className="privacy-text-content">
                
                {/* 1. Acceptance of Terms */}
                <div className="policy-section mb-5">
                  <h4 className="fw-bold mb-3">1. Acceptance of Terms</h4>
                  <p>
                    By accessing ClariMed Hospital’s website or utilizing our clinical services, you agree to be bound by these Terms and Conditions. These terms govern your relationship with ClariMed Hospital regarding your use of our facilities, medical consultations, and digital platforms. If you disagree with any part of these terms, you may not access our services.
                  </p>
                </div>

                {/* 2. Medical Disclaimer */}
                <div className="policy-section mb-5">
                  <h4 className="fw-bold mb-3">2. Medical Disclaimer</h4>
                  <p>
                    The content provided on our website is for informational purposes only and does not constitute professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health providers with any questions you may have regarding a medical condition. <strong>In case of a medical emergency, call your local emergency services or visit the nearest hospital immediately.</strong>
                  </p>
                </div>

                {/* 3. Appointment & Cancellation */}
                <div className="policy-section mb-5">
                  <h4 className="fw-bold mb-3">3. Appointments and Cancellations</h4>
                  <p>
                    <strong>Booking:</strong> Appointments can be scheduled via our online portal or by phone. While we strive to honor all scheduled times, ClariMed reserves the right to reschedule due to emergency medical priorities.
                  </p>
                  <p>
                    <strong>Cancellations:</strong> We require at least 24 hours' notice for cancellations. Failure to provide notice or "no-shows" may result in a standard administrative fee.
                  </p>
                </div>

                {/* 4. Billing and Payments */}
                <div className="policy-section mb-5">
                  <h4 className="fw-bold mb-3">4. Billing and Payments</h4>
                  <p>
                    Patients are responsible for all costs associated with their treatment. If you are using insurance, it is your responsibility to verify coverage with your provider before the procedure. ClariMed Hospital will facilitate insurance claims; however, any balance not covered by insurance remains the financial responsibility of the patient or their legal guardian.
                  </p>
                </div>

                {/* 5. Code of Conduct */}
                <div className="policy-section mb-5">
                  <h4 className="fw-bold mb-3">5. Patient Code of Conduct</h4>
                  <p>
                    To maintain a healing environment, ClariMed Hospital enforces a zero-tolerance policy for verbal or physical abuse toward our staff, other patients, or visitors. We reserve the right to refuse service or discharge patients who violate this code of conduct, provided it does not compromise immediate life-saving care.
                  </p>
                </div>

                {/* 6. Limitation of Liability */}
                <div className="policy-section mb-5">
                  <h4 className="fw-bold mb-3">6. Limitation of Liability</h4>
                  <p>
                    ClariMed Hospital and its affiliates shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our digital platforms or any delays in service caused by factors beyond our reasonable control.
                  </p>
                </div>

            

              </div>

            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .privacy-text-content p {
          color: #4a5568;
          line-height: 1.8;
          font-size: 16px;
          margin-bottom: 1.5rem;
        }
        .policy-section h4 {
          color: #002244;
          font-size: 22px;
          border-left: 4px solid #346fa3;
          padding-left: 15px;
        }
        .text-primary {
          color: #346fa3 !important;
        }
        .privacy-simple-layout {
          text-align: left;
        }
        .tp-breadcrumb-area {
            position: relative;
            z-index: 1;
        }
      `}} />
    </div>
  );
};

export default TermsCondition;