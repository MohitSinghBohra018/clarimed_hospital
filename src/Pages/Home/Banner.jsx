import React, { useEffect, useState } from "react";
import goggle from "../../../assets/img/goggle_icon.png";
import HomeBannerForm from './HomeBannerForm'
import { CommonService } from "../../services/common.service";

const Banner = () => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Banner API
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await CommonService.getBanner();
        setBanner(res?.data);
      } catch (err) {
        console.error("Banner API Error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  // ✅ Loader (optional)
  if (loading) {
    return <div style={{ padding: 100, textAlign: "center" }}>Loading...</div>;
  }

  return (
    <>
      <div
        className="tp-hero-area tp-hero-bg bg-position z-index-2 p-relative"
        style={{
          backgroundImage: `url("${banner?.image}")`,
        }}
      >
        <img className="tp-hero-shape" src="assets/img/hero/shape.png" alt="" />

        <div className="container">
          <div className="row align-items-center">
            {/* LEFT CONTENT */}
            <div className="col-xl-7 col-lg-6">
              <div className="tp-hero-content mb-30">
                {/* Badge */}
                <span
                  className="tp-hero-subtitle text-uppercase d-inline-block lh-1 mb-20 wow fadeInUp"
                  style={{ fontWeight: 700, padding: 12 }}
                >
                  <i className={banner?.badge_icon + " mr-5"} />{" "}
                  {banner?.badge_text}
                </span>

                {/* Title */}
                <h2 className="tp-hero-title fw-600 mb-15 wow fadeInUp mt-10 hero-title-custom">
                  {banner?.title}
                </h2>

                {/* Subtitle */}
                <p className="tp-hero-dec mb-30 wow fadeInUp hero-title-custom">
                  {banner?.subtitle}
                </p>

                {/* Avatar section (STATIC same as your UI) */}
                <div
                  className="tp-hero-customer-stack d-flex align-items-center mb-15 wow fadeInUp"
                  data-wow-duration=".9s"
                  data-wow-delay=".55s"
                >
                  <div className="tp-hero-avatar-group d-flex align-items-center mr-15">
                    <img
                      src="https://img.freepik.com/free-photo/young-handsome-man-wearing-casual-tshirt-blue-background-happy-face-smiling-with-crossed-arms-looking-camera-positive-person_839833-12963.jpg?semt=ais_hybrid&w=740&q=80"
                      alt="user"
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: "50%",
                        border: "3px solid #fff",
                        marginRight: "-15px",
                        position: "relative",
                        zIndex: 5,
                        objectFit: "cover",
                      }}
                    />
                    <img
                      src="https://img.freepik.com/free-photo/closeup-young-hispanic-man-casuals-studio_662251-600.jpg"
                      alt="user"
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: "50%",
                        border: "3px solid #fff",
                        marginRight: "-15px",
                        position: "relative",
                        zIndex: 4,
                        objectFit: "cover",
                      }}
                    />
                    <img
                      src="https://media.istockphoto.com/id/629077354/photo/self-acceptance-goes-a-long-way-to-being-happy.jpg?s=612x612&w=0&k=20&c=XpmWw2GodU8bX89n9BBaef0aFHNg_TZecklxCa-KtwU="
                      alt="user"
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: "50%",
                        border: "3px solid #fff",
                        marginRight: "-15px",
                        position: "relative",
                        zIndex: 3,
                        objectFit: "cover",
                      }}
                    />
                    <img
                      src="https://media.istockphoto.com/id/1876435066/photo/young-woman-sitting-on-sofa-with-cell-phone-at-home.jpg?s=612x612&w=0&k=20&c=_zEoQ5mIQBmtn3bnrwvt1GqLZjHdHvlKqruUnC8kw0c="
                      alt="user"
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: "50%",
                        border: "3px solid #fff",
                        marginRight: "-15px",
                        position: "relative",
                        zIndex: 2,
                        objectFit: "cover",
                      }}
                    />
                    <div
                      className="tp-hero-avatar-more"
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: "50%",
                        border: "3px solid #fff",
                        background: "rgb(0, 94, 171)",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      12k+
                    </div>
                  </div>
                  {/* <span style="font-size: 14px; font-weight: 600; color: var(--tp-grey-1);">Happy Patients Globally</span> */}
                </div>

                {/* Rating Section */}
                <div
                  className="tp-hero-rating d-flex align-items-center mb-40 wow fadeInUp"
                  style={{
                    background: "#fff",
                    padding: "15px 25px",
                    borderRadius: 50,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                    width: "340px",
                  }}
                >
                  <div className="tp-hero-rating-icon mr-15">
                    <img src={goggle} alt="Google" style={{ width: 25 }} />
                  </div>

                  <div className="tp-hero-rating-text">
                    <div style={{ color: "#FFB800", fontSize: 14 }}>
                      ⭐⭐⭐⭐⭐
                      <span
                        style={{
                          fontWeight: 700,
                          marginLeft: 5,
                          color: "#333",
                        }}
                      >
                        {banner?.rating}/5
                      </span>
                    </div>

                    <p style={{ fontSize: 13, margin: 0 }}>
                      {banner?.reviews_text}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
        <HomeBannerForm/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
