import React, { useEffect, useState } from "react";
CommonService

import ContactForm from "./ContactForm";
import { CommonService } from "../../services/common.service";

const ContactUs = () => {
  const [settings, setSetting] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await CommonService.getSettings();
        setSetting(res.data);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <>
      <>
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
                    className="tp-breadcrumb-title  text-center mb-0"
                    style={{ fontSize: "40px" }}
                  >
                    Contact US
                  </h2>

                  <p
                    className="tp-breadcrumb-title  text-center mb-0"
                    style={{ fontSize: "18px", marginTop: "6px" }}
                  >
                    {" "}
                    Our dedicated medical professionals provide expert care with
                    passion and attention, ensuring every patient feels safe,
                    supported, and cared for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* tp-contact-area-start */}
        <div className="tp-contact-area tp-tour-ptb-2 pt-50 pb-20">
          <div className="container container-1350">
            <div className="row">
              <div className="col-lg-7">
                <div className="tp-contact-info-wrap mr-90 mb-40">
                  <span className="tp-section-two-subtitle d-inline-block mb-10">
                    Get To Know Us
                  </span>
                  <h3 className="tp-section-title fs-32 fw-600 mb-15">
                    Call Us Directly for 24/7<br></br> Medical Support
                  </h3>
                  <p className="mb-25">
                    Our expert healthcare team brings compassionate care,
                    medical <br></br>excellence, and trusted support to every
                    patient. We ensure safe, reliable, <br></br>and personalized
                    treatment.
                  </p>

                  <div className="tp-contact-info pb-40 mb-45">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="tp-contact-info-item d-flex align-items-center mb-30">
                          <span className="tp-contact-info-icon mr-10">
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.6212 8.75021C15.1911 8.75021 14.851 8.40021 14.851 7.98021C14.851 7.61021 14.4809 6.84021 13.8607 6.17021C13.2505 5.52022 12.5804 5.14022 12.0202 5.14022C11.5901 5.14022 11.25 4.79022 11.25 4.37022C11.25 3.95022 11.6001 3.60022 12.0202 3.60022C13.0205 3.60022 14.0708 4.14022 14.991 5.11022C15.8513 6.02021 16.4014 7.15021 16.4014 7.97021C16.4014 8.40021 16.0513 8.75021 15.6212 8.75021Z"
                                fill="#111111"
                              />
                              <path
                                d="M19.23 8.74998C18.7999 8.74998 18.4598 8.39998 18.4598 7.97998C18.4598 4.42999 15.569 1.55 12.028 1.55C11.5979 1.55 11.2578 1.2 11.2578 0.779998C11.2578 0.359999 11.5979 0 12.018 0C16.4192 0 20.0002 3.57999 20.0002 7.97998C20.0002 8.39998 19.6501 8.74998 19.23 8.74998Z"
                                fill="#111111"
                              />
                              <path
                                d="M9.79269 12.21L6.52179 15.48C6.1617 15.16 5.8116 14.83 5.4715 14.49C4.44122 13.45 3.51097 12.36 2.68074 11.22C1.86051 10.08 1.20033 8.93998 0.720198 7.80998C0.240066 6.66998 0 5.57999 0 4.53999C0 3.85999 0.120033 3.20999 0.360099 2.60999C0.600165 2 0.98027 1.44 1.51042 0.939998C2.15059 0.309999 2.85078 0 3.59099 0C3.87106 0 4.15114 0.0599999 4.40121 0.18C4.66128 0.299999 4.89135 0.479999 5.07139 0.739998L7.39203 4.00999C7.57208 4.25999 7.70212 4.48999 7.79214 4.70999C7.88217 4.91999 7.93218 5.12999 7.93218 5.31999C7.93218 5.55999 7.86216 5.79999 7.72212 6.02999C7.59209 6.25998 7.40204 6.49998 7.16197 6.73998L6.40176 7.52998C6.29173 7.63998 6.24172 7.76998 6.24172 7.92998C6.24172 8.00998 6.25172 8.07998 6.27173 8.15998C6.30173 8.23998 6.33174 8.29998 6.35175 8.35998C6.5318 8.68998 6.84188 9.11998 7.282 9.63998C7.73213 10.16 8.21226 10.69 8.7324 11.22C9.0925 11.57 9.4426 11.91 9.79269 12.21Z"
                                fill="#021e83"
                              />
                              <path
                                d="M19.975 16.33C19.975 16.61 19.9249 16.9 19.8249 17.18C19.7949 17.26 19.7649 17.34 19.7249 17.42C19.5548 17.78 19.3348 18.12 19.0447 18.44C18.5546 18.98 18.0144 19.37 17.4043 19.62C17.3943 19.62 17.3843 19.63 17.3742 19.63C16.7841 19.87 16.1439 20 15.4537 20C14.4334 20 13.3431 19.76 12.1928 19.27C11.0425 18.78 9.89219 18.12 8.75188 17.29C8.36177 17 7.97166 16.71 7.60156 16.4L10.8725 13.13C11.1525 13.34 11.4026 13.5 11.6127 13.61C11.6627 13.63 11.7227 13.66 11.7927 13.69C11.8727 13.72 11.9528 13.73 12.0428 13.73C12.2128 13.73 12.3429 13.67 12.4529 13.56L13.2131 12.81C13.4632 12.56 13.7032 12.37 13.9333 12.25C14.1634 12.11 14.3934 12.04 14.6435 12.04C14.8335 12.04 15.0336 12.08 15.2537 12.17C15.4737 12.26 15.7038 12.39 15.9539 12.56L19.2648 14.91C19.5248 15.09 19.7049 15.3 19.8149 15.55C19.9149 15.8 19.975 16.05 19.975 16.33Z"
                                fill="#0a2a91"
                              />
                            </svg>
                          </span>
                          <div className="tp-contact-info-text">
                            <span>Call Us Directly</span>
                            <a href={`tel:${settings?.phone}`}>
                              {settings?.phone || "Loading..."}
                            </a><br/>
                             <a href={`tel:${settings?.phone}`}>
                              {settings?.phone2 }
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="tp-contact-info-item d-flex align-items-center mb-30">
                          <span className="tp-contact-info-icon mr-10">
                            <svg
                              width={21}
                              height={19}
                              viewBox="0 0 21 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.9918 5.13992C19.4112 5.13992 20.5618 3.98931 20.5618 2.56996C20.5618 1.15061 19.4112 0 17.9918 0C16.5725 0 15.4219 1.15061 15.4219 2.56996C15.4219 3.98931 16.5725 5.13992 17.9918 5.13992Z"
                                fill="#111111"
                              />
                              <path
                                d="M17.9918 5.13992C19.4112 5.13992 20.5618 3.98931 20.5618 2.56996C20.5618 1.15061 19.4112 0 17.9918 0C16.5725 0 15.4219 1.15061 15.4219 2.56996C15.4219 3.98931 16.5725 5.13992 17.9918 5.13992Z"
                                fill="#038ac5"
                              />
                              <path
                                d="M19.2439 6.96231C19.8915 6.75671 20.5597 7.26043 20.5597 7.94918V13.3358C20.5597 16.9338 18.5037 18.4757 15.4198 18.4757H5.13992C2.05597 18.4757 0 16.9338 0 13.3358V6.13992C0 2.54198 2.05597 1 5.13992 1H12.9629C13.6311 1 14.0834 1.6168 13.96 2.26443C13.8367 2.87094 13.8572 3.51857 14.0423 4.18676C14.4226 5.56426 15.5431 6.66419 16.9206 7.02399C17.7327 7.22959 18.5243 7.18847 19.2439 6.96231Z"
                                fill="#0a2a91"
                              />
                              <path
                                d="M10.2809 10.1462C9.41737 10.1462 8.54359 9.87896 7.8754 9.33413L4.65781 6.76417C4.32885 6.49689 4.26718 6.01374 4.53445 5.68478C4.80173 5.35583 5.28487 5.29415 5.61382 5.56143L8.83142 8.13139C9.61269 8.75846 10.9388 8.75846 11.7201 8.13139L12.9331 7.16508C13.262 6.89781 13.7555 6.9492 14.0125 7.28844C14.2797 7.61739 14.2284 8.11083 13.8891 8.36782L12.6761 9.33413C12.0182 9.87896 11.1444 10.1462 10.2809 10.1462Z"
                                fill="white"
                              />
                            </svg>
                          </span>
                          <div className="tp-contact-info-text">
                            <span>Need Support?</span>
                            <a href={`mailto:${settings?.email}`}>
                              {settings?.email || "Loading..."}
                              
                            </a><br></br>
                             <a href={`mailto:${settings?.email}`}>
                              {settings?.email2 || "Loading..."}
                              
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="tp-contact-info-item d-flex align-items-center mb-30">
                          <span className="tp-contact-info-icon mr-10">
                            <svg
                              width={18}
                              height={21}
                              viewBox="0 0 18 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.75 16C1.92107 16.4117 0.75 17.0443 0.75 17.7537C0.75 18.9943 4.33172 20 8.75 20C13.1683 20 16.75 18.9943 16.75 17.7537C16.75 17.0443 15.5789 16.4117 13.75 16"
                                stroke="#111111"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                              <path
                                d="M10.0074 15.4936C9.6701 15.8184 9.2193 16 8.7502 16C8.281 16 7.8302 15.8184 7.4929 15.4936C4.4043 12.5008 0.26519 9.1575 2.28371 4.30373C3.3751 1.67932 5.99494 0 8.7502 0C11.5054 0 14.1252 1.67933 15.2166 4.30373C17.2326 9.1514 13.1036 12.5111 10.0074 15.4936Z"
                                fill="#0a2a91"
                              />
                              <path
                                d="M11.25 7C11.25 8.3807 10.1307 9.5 8.75 9.5C7.3693 9.5 6.25 8.3807 6.25 7C6.25 5.61929 7.3693 4.5 8.75 4.5C10.1307 4.5 11.25 5.61929 11.25 7Z"
                                fill="#ffffff"
                              />
                            </svg>
                          </span>
                          <div className="tp-contact-info-text">
                            <span>Address</span>
                            {settings?.address || "Loading..."}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        {/* <div className="tp-contact-info-item d-flex align-items-center mb-30">
                    <span className="tp-contact-info-icon mr-10">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.4738 14.83L16.8638 17.99C16.9638 18.82 16.0738 19.4 15.3638 18.97L11.1738 16.48C10.7138 16.48 10.2638 16.45 9.82376 16.39C10.5638 15.52 11.0038 14.42 11.0038 13.23C11.0038 10.39 8.54375 8.09003 5.50375 8.09003C4.34375 8.09003 3.27376 8.42 2.38376 9C2.35376 8.75 2.34375 8.49999 2.34375 8.23999C2.34375 3.68999 6.29375 0 11.1738 0C16.0538 0 20.0038 3.68999 20.0038 8.23999C20.0038 10.94 18.6138 13.33 16.4738 14.83Z"
                               fill="#0a2a91"
                        />
                        <path
                          d="M11 13.23C11 14.42 10.56 15.5201 9.82001 16.3901C8.83001 17.5901 7.26 18.36 5.5 18.36L2.89 19.91C2.45 20.18 1.89 19.81 1.95 19.3L2.2 17.3301C0.859997 16.4001 0 14.91 0 13.23C0 11.47 0.940005 9.92006 2.38 9.00006C3.27 8.42006 4.34 8.09009 5.5 8.09009C8.54 8.09009 11 10.39 11 13.23Z"
                          fill="#005cf0"
                        />
                      </svg>
                    </span>
                    <div className="tp-contact-info-text">
                      <a href="#">Start Chat</a>
                    </div>
                  </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="tp-contact-social">
                    <h3 className="tp-contact-title-sm fw-500 mb-20">
                      Follow Us
                    </h3>
                    <div className="postbox-social tp-bounce d-flex align-items-center gap-1">
                      {/* ✅ Facebook */}
                      {settings?.facebook_url && (
                        <a
                          href={settings.facebook_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M15 3H18V0H15C12.8 0 11 1.8 11 4V7H8V11H11V24H15V11H18L19 7H15V4C15 3.4 15.4 3 16 3H18Z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      )}

                      {/* ✅ Twitter */}
                      {settings?.twitter_url && (
                        <a
                          href={settings.twitter_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M18.9 2H21.9L14.4 10.6L23 22H16.3L11.1 14.9L4.8 22H1.8L9.8 13L1.5 2H8.3L13 8.5L18.9 2Z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      )}

                      {/* ✅ Instagram */}
                      {settings?.instagram_url && (
                        <a
                          href={settings.instagram_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.66602 8.99935C1.66602 5.54238 1.66602 3.8139 2.73996 2.73996C3.8139 1.66602 5.54238 1.66602 8.99935 1.66602C12.4563 1.66602 14.1848 1.66602 15.2587 2.73996C16.3327 3.8139 16.3327 5.54238 16.3327 8.99935C16.3327 12.4563 16.3327 14.1848 15.2587 15.2587C14.1848 16.3327 12.4563 16.3327 8.99935 16.3327C5.54238 16.3327 3.8139 16.3327 2.73996 15.2587C1.66602 14.1848 1.66602 12.4563 1.66602 8.99935Z"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12.4747 9.00103C12.4747 10.9195 10.9195 12.4747 9.00103 12.4747C7.08256 12.4747 5.52734 10.9195 5.52734 9.00103C5.52734 7.08256 7.08256 5.52734 9.00103 5.52734C10.9195 5.52734 12.4747 7.08256 12.4747 9.00103Z"
                              stroke="currentColor"
                              stroke-width="1.5"
                            />
                            <path
                              d="M13.251 4.75391L13.242 4.75391"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </a>
                      )}

                      {/* ✅ LinkedIn */}
                      {settings?.linkedin_url && (
                        <a
                          href={settings.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M4.98 3.5C4.98 4.9 3.87 6 2.49 6C1.11 6 0 4.9 0 3.5C0 2.1 1.11 1 2.49 1C3.87 1 4.98 2.1 4.98 3.5ZM0.5 8H4.5V24H0.5V8ZM8 8H11.8V10.2H11.9C12.4 9.2 13.7 8 15.8 8C20 8 21 10.6 21 14V24H17V15.1C17 13 17 10.5 14.5 10.5C12 10.5 11.6 12.4 11.6 14.9V24H7.6V8H8Z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
           <ContactForm/>
            </div>
          </div>
        </div>
        {/* tp-contact-area-end */}
        {/* tp-contact-map-area-start */}
        <div className="tp-contact-map p-relative fix pb-140">
          <div className="tp-contact-map-box">
            <iframe
              src={
                settings?.map_embed ||
                "https://www.google.com/maps?q=Delhi&output=embed"
              }
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </>
    </>
  );
};

export default ContactUs;
