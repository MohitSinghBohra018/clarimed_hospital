import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

const Privacy = () => {


  return (
    <div className="privacy-simple-layout">
      {/* Page Header */}
      <div
        className="tp-breadcrumb-area tp-breadcrumb-overly bg-position"
        style={{ padding: "50px", backgroundColor: "#346fa3" }}
        data-background="assets/img/breadcrumb/bg-6.jpg"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="tp-breadcrumb-wrap text-center">
                <h2
                  className="tp-breadcrumb-title fs-10 text-center mb-0"
                  style={{ fontSize: "38px" }}
                >
                 Privacy and Policy
                </h2>
                <p className="text-white mt-2" style={{ letterSpacing: '1.5px' }}>
 Your data, protected. | ClariMed Hospital & Research Centre
</p>

               
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-lg-12">
              
              <div className="privacy-text-content">
                
                {/* 1. Introduction */}
                <div className="policy-section mb-5">
                  <h4 className="fw-bold mb-3">1. Introduction</h4>
                  <p>
                    Your privacy is of utmost importance to ClariMed Hospital. This policy describes how we collect, store, and process your personal and healthcare information. By using our services, you consent to the data practices described in this statement. We are committed to maintaining the confidentiality of your medical records in accordance with national healthcare privacy standards.
                  </p>
                </div>

                {/* 2. Information Collection */}
                <div className="policy-section mb-5">
                  <h4 className="fw-bold mb-3">2. Information We Collect</h4>
                  <p>
                    We collect personal information that identifies you, such as your name, contact details, and insurance information. More importantly, we maintain a comprehensive record of your health history, including diagnostic results, physician notes, and treatment plans. This data is collected directly from you or through medical devices and laboratory systems during your care.
                  </p>
                </div>

                {/* 3. Detailed Usage */}
                <div className="policy-section mb-5">
                  <h4 className="fw-bold mb-3">3. How We Use Your Information</h4>
                  <p>
                    <strong>Clinical Treatment:</strong> Our primary use of your data is to ensure you receive accurate medical care. Your records are shared among the multidisciplinary team of doctors and nurses assigned to your case to prevent medical errors and coordinate recovery.
                  </p>
                  <p>
                    <strong>Administrative Operations:</strong> We use your data for hospital management tasks, such as scheduling appointments, processing insurance claims for payment, and conducting internal quality reviews to improve our patient safety protocols.
                  </p>
                  <p>
                    <strong>Legal Requirements:</strong> ClariMed may disclose information when required by law, such as reporting certain communicable diseases to public health authorities or responding to valid legal requests to ensure community safety.
                  </p>
                </div>

                {/* 4. Data Security */}
                <div className="policy-section mb-5">
                  <h4 className="fw-bold mb-3">4. Data Security & Protection</h4>
                  <p>
                    We employ industry-standard security measures, including end-to-end encryption and secure server hosting, to protect your data. Access to medical records is strictly limited to authorized personnel who require the information to perform their professional duties. Regular audits are conducted to ensure our digital and physical safeguards remain impenetrable.
                  </p>
                </div>

                {/* 5. Your Rights */}
                <div className="policy-section mb-5">
                  <h4 className="fw-bold mb-3">5. Patient Rights</h4>
                  <p>
                    You have the right to request a copy of your medical records at any time. If you believe there is an error in your personal information, you may request a correction. Additionally, you have the right to be informed about who has accessed your data and to request a restriction on how certain information is shared.
                  </p>
                </div>

                {/* Contact Card Design */}
               

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
      `}} />
    </div>
  );
};

export default Privacy;