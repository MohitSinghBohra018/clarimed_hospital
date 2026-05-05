import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/img/logo/logo_clarimed.jpeg";
import { CommonService } from "../../../services/common.service";

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await CommonService.getSettings();
        setSettings(res?.data);
      } catch (error) {
        console.error("Footer API Error:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer>
      <div
        className="tp-footer-area z-index-2 p-relative pt-50"
        style={{ backgroundColor: "rgb(27, 49, 71)" }}
      >
        <div className="container">
          <div className="tp-footer-widget-wrap pb-30">
            <div className="row g-4">

              {/* Brand */}
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="tp-footer-widget mb-30">
                  <div className="tp-footer-logo mb-3">
                    <img
                      src={settings?.logo || logo}
                      style={{ width: "180px" }}
                      alt="logo"
                      onError={(e) => (e.target.src = logo)}
                    />
                  </div>
                  <p style={{ color: "white", lineHeight: "1.6" }}>
                    {settings?.footer_text}
                  </p>

                  <div className="tp-footer-social mt-3">
                    {settings?.facebook_url && (
                      <a href={settings.facebook_url} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    )}
                    {settings?.twitter_url && (
                      <a href={settings.twitter_url} target="_blank" rel="noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 16 14" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.28884 0.714844H0.666992L6.14691 7.9153L1.01754 13.9556H3.38746L7.26697 9.38713L10.7118 13.9136H15.3337L9.69453 6.50391L9.70451 6.51669L14.5599 0.798959H12.19L8.58427 5.04503L5.28884 0.714844ZM3.21817 1.97588H4.65702L12.7825 12.6525H11.3436L3.21817 1.97588Z" fill="currentColor"></path></svg>
                      </a>
                    )}
                    {settings?.instagram_url && (
                      <a href={settings.instagram_url} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    )}
                    {settings?.linkedin_url && (
                      <a href={settings.linkedin_url} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Company */}
              <div className="col-xl-2 col-lg-4 col-md-6">
               <div className="tp-footer-widget tp-footer-col-2 mb-30">            
                      <h3 className="tp-footer-widget-title fw-600 mb-15" style={{ color: "white" }}>
                     Our Company
                  </h3>
                   <div className="tp-footer-widget-menu">
                     <ul>
                       <li><Link to="/vision-mission">About us</Link></li>
                       <li><Link to="/our-teams">Our Team</Link></li>
                         <li><Link to="/contact-us">Contact Us</Link></li>
                        <li><Link to="/carrier">Careers</Link></li>
                             <li><Link to="/">Sitemap</Link></li>
                     
                     </ul>
                  </div>
                </div>
              </div>

              {/* Services */}
                        <div className="col-xl-2 col-lg-4 col-md-6">
               <div className="tp-footer-widget tp-footer-col-2 mb-30">            
                      <h3 className="tp-footer-widget-title fw-600 mb-15" style={{ color: "white" }}>
                    Surgery
                  </h3>
                   <div className="tp-footer-widget-menu">
                     <ul>
                       <li><Link to="/doctors/india/laparoscopy">Laser Surgery</Link></li>
                       <li><Link to="/doctors/india/laparoscopy">Laproscopy Surgery</Link></li>
                       <li><Link to="/doctors/india/aesthetics">Cosmetic Surgery</Link></li>
                         <li><Link to="/doctors/india/ent">Ear Surgery</Link></li>
                           <li><Link to="/doctors/india/orthopedics">Spine Surgery</Link></li>
                             <li><Link to="/doctors/india/orthopedics">Orthopedic Surgery</Link></li>
                               <li><Link to="/doctors/india/gynaecology">Gynae Surgery </Link></li>
                     </ul>
                  </div>
                </div>
              </div>

              {/* Important Links */}
                        <div className="col-xl-2 col-lg-4 col-md-6">
               <div className="tp-footer-widget tp-footer-col-2 mb-30">            
                      <h3 className="tp-footer-widget-title fw-600 mb-15" style={{ color: "white" }}>
                  Policy


                  </h3>
                   <div className="tp-footer-widget-menu">
                     <ul>
                       <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                       <li><Link to="/terms-condition">Terms and Conditions</Link></li>
                     
                     </ul>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="tp-footer-widget">
                 <h3 className="tp-footer-widget-title fw-600 mb-15" style={{ color: "white" }}>
                 Our Offices

                 </h3>

                  <div className="mb-2 d-flex">
                    <i className="fa-solid fa-location-dot me-2 mt-1" style={{ color: "#038ac5" }}></i>
                    <span style={{ color: "white" }}>{settings?.address}</span>
                  </div>

                  {/* <div className="mb-2 d-flex">
                    <i className="fa-solid fa-phone me-2" style={{ color: "#038ac5" }}></i>
                    <a href={`tel:${settings?.phone}`} style={{ color: "white" }}>
                      {settings?.phone}
                    </a>
                  </div> */}

                  {/* <div className="d-flex">
                    <i className="fa-solid fa-envelope me-2" style={{ color: "#038ac5" }}></i>
                    <a href={`mailto:${settings?.email}`} style={{ color: "white" }}>
                      {settings?.email}
                    </a>
                  </div> */}
                </div>
              </div>

            </div>
            {/* Legal Disclaimer Section */}
<div className="tp-footer-bottom-notice border-top  pt-15 pb-15">
  <div className="container">
    <div className="row">
      <div className="col-12 text-center">
     <p style={{ 
  color: 'white', 
  fontSize: '14px', 
  lineHeight: '1.6', 
  // maxWidth: '1000px', 
  margin: '0 auto' 
}}>
  By using our site, you agree to our{' '}
  <Link to="/terms-condition" style={{ textDecoration: 'underline', color: 'inherit' }}>
    Terms and Conditions
  </Link> and {' '}
  <Link to="/privacy-policy" style={{ textDecoration: 'underline', color: 'inherit' }}>
    Privacy Policy. 
  </Link> 

  {' '} ClariMed Healthcare is a dedicated partner for both domestic and international patients, providing streamlined access to a global network of accredited hospitals and world-class specialists. 
  We simplify the medical journey through transparency and expert coordination, empowering patients to make informed decisions. 
  Note: Our services support and enhance—rather than replace—the patient-physician relationship. ClariMed does not provide medical diagnoses. 
  
</p>
      </div>
    </div>
  </div>
</div>
          </div>
          
        </div>

        {/* Bottom */}
        <div
          className="pt-3 pb-3 mt-3"
          style={{ backgroundColor: "rgb(1, 30, 57)" }}
        >
          <div className="container d-flex flex-column flex-md-row justify-content-between">
            <p className="text-white mb-2 mb-md-0">
              2026 ClariMed © All rights reserved
            </p>
            <div>
              <Link to="/terms-condition" className="text-white">Terms</Link>
              <span className="text-white mx-2">|</span>
              <Link to="/privacy-policy" className="text-white">Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;






// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../../../../assets/img/logo/logo_clarimed.jpeg";
// import { CommonService } from "../../../services/common.service";

// const Footer = () => {
//   const [settings, setSettings] = useState(null);

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const res = await CommonService.getSettings();
//         setSettings(res?.data);
//       } catch (error) {
//         console.error("Footer API Error:", error);
//       }
//     };
//     fetchSettings();
//   }, []);

//   return (
//     <footer>
//       <div
//         className="tp-footer-area z-index-2 p-relative"
//         style={{ backgroundColor: "rgb(27, 49, 71)" }}
//       >
//         <div className="container">
//           <div className="tp-footer-widget-wrap pt-40 pb-30">
//             <div className="row">
//               {/* Brand Section */}
//               <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6">
//                 <div className="tp-footer-widget tp-footer-col-1 mb-30">
//                   <div className="tp-footer-logo mb-20">
//                     <img
//                       src={settings?.logo || logo}
//                       style={{ width: "250px" }}
//                       alt="logo"
//                       onError={(e) => (e.target.src = logo)}
//                     />
//                   </div>
//                   <p className="tp-footer-dec" style={{ color: "white" }}>
//                     {settings?.footer_text}
//                   </p>
//                   <div className="tp-footer-social">
//                     {settings?.facebook_url && (
//                       <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer">
//                         <i className="fa-brands fa-facebook-f"></i>
//                       </a>
//                     )}
//                     {settings?.twitter_url && (
//                       <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer">
//                         <i className="fa-brands fa-twitter"></i>
//                       </a>
//                     )}
//                     {settings?.instagram_url && (
//                       <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer">
//                         <i className="fa-brands fa-instagram"></i>
//                       </a>
//                     )}
//                     {settings?.linkedin_url && (
//                       <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer">
//                         <i className="fa-brands fa-linkedin-in"></i>
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Company Links */}
//               <div className="col-xxl-3 col-xl-2 col-lg-4 col-md-6 col-sm-6">
//                 <div className="tp-footer-widget tp-footer-col-2 mb-30">
//                   <h3 className="tp-footer-widget-title fw-600 mb-15" style={{ color: "white" }}>
//                     Our Company
//                   </h3>
//                   <div className="tp-footer-widget-menu">
//                     <ul>
//                       <li><Link to="/about-us">About us</Link></li>
//                       <li><Link to="/blogs">Blog</Link></li>
//                       <li><Link to="/contact-us">Contact Us</Link></li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               {/* Important Links */}
//               <div className="col-xxl-2 col-xl-2 col-lg-4 col-md-4 col-sm-6">
//                 <div className="tp-footer-widget tp-footer-col-3 mb-30">
//                   <h3 className="tp-footer-widget-title fw-600 mb-15" style={{ color: "white" }}>
//                     Important Links
//                   </h3>
//                   <div className="tp-footer-widget-menu">
//                     <ul>
//                       <li><Link to="/privacy-policy">Privacy Policy</Link></li>
//                       <li><Link to="/faqs">FAQs</Link></li>
//                       <li><Link to="/terms-condition">Terms Of Use</Link></li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               {/* ✅ NEW CONTACT DETAILS SECTION */}
//               <div className="col-xxl-4 col-xl-5 col-lg-4 col-md-6 col-sm-6">
//                 <div className="tp-footer-widget tp-footer-col-4 mb-30">
//                   <h3 className="tp-footer-widget-title fw-600 mb-15" style={{ color: "white" }}>
//                     Contact Details
//                   </h3>
//                   <div className="tp-footer-contact-info">
//                     <div className="d-flex align-items-start mb-15">
//                       <i className="fa-solid fa-location-dot mt-1 me-3" style={{ color: "#038ac5" }}></i>
//                       <p style={{ color: "white", margin: 0 }}>{settings?.address}</p>
//                     </div>
//                     <div className="d-flex align-items-center mb-15">
//                       <i className="fa-solid fa-phone me-3" style={{ color: "#038ac5" }}></i>
//                       <a href={`tel:${settings?.phone}`} style={{ color: "white" }}>{settings?.phone}</a>
//                     </div>
//                     <div className="d-flex align-items-center mb-15">
//                       <i className="fa-solid fa-envelope me-3" style={{ color: "#038ac5" }}></i>
//                       <a href={`mailto:${settings?.email}`} style={{ color: "white" }}>{settings?.email}</a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* Bottom Copyright */}
//         <div className="tp-copyright-area pt-25 pb-15" style={{ backgroundColor: "rgb(1, 30, 57)" }}>
//           <div className="container">
//             <div className="row align-items-center">
//               <div className="col-lg-12">
//                 <div className="tp-copyright-text d-flex flex-column flex-md-row justify-content-between">
//                   <p style={{ color: "white" }}>2026 ClariMed © All rights reserved</p>
//                   <div>
//                     <Link to="/terms-condition" style={{ color: "white" }}>Terms & Conditions</Link>
//                     <span style={{ color: "white" }}> | </span>
//                     <Link to="/privacy-policy" style={{ color: "white" }}>Privacy Policy</Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;