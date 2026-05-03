
import train from "../../../assets/img/icon/train.png"
import report from "../../../assets/img/icon/report.png"


import service3 from "../../../assets/img/icon/emergency.png"
import service4 from "../../../assets/img/icon/appointment.png"
import service5 from "../../../assets/img/icon/compoansiate.png"

const HowWork = () => {
  return (
  
  
     <>
  {/* how we work start   */}
  <div
    className="tp-service-area pt-80 pb-40 p-relative"
    data-bg-color="#f7f9f9"
    style={{ backgroundColor: "rgb(235, 245, 245)" }}
  >
    {/* <img
      className="tp-service-shape"
      src={service}
      alt=""
    /> */}
    <div className="container">
      <div className="row">
        <div className="col-md-12  pb-20">
          <h3 className="pb-10" style={{ textAlign: "center", fontSize: 35 }}>
            How Do We work{" "}
          </h3>
          <p
            style={{
              color: "var(--tp-grey-1)",
              fontSize: 18,
              textAlign: "center"
            }}
          >
            A seamless process connecting you to the right care, every step of
            the way.
          </p>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-6">
          <div
            className="tp-service-item icon-animetion-wrap text-center mb-30 wow fadeInUp"
            data-wow-duration=".9s"
            data-wow-delay=".3s"
          >
            <span className="tp-service-icon mb-30">
              <img
                className="icon-animetion-icon"
                src={report}
              />
            </span>
            <div className="tp-service-content">
              <h2 className="tp-service-title fw-600">Send your reports</h2>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-6">
          <div
            className="tp-service-item icon-animetion-wrap text-center mb-30 wow fadeInUp"
            data-wow-duration=".9s"
            data-wow-delay=".4s"
          >
            <span className="tp-service-icon mb-30">
              <img
                className="icon-animetion-icon"
                src="https://cdn-icons-png.flaticon.com/256/13297/13297903.png"
              />
            </span>
            <div className="tp-service-content">
              <h2 className="tp-service-title fw-600">Choose your hospital</h2>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-6">
          <div
            className="tp-service-item icon-animetion-wrap text-center mb-30 wow fadeInUp"
            data-wow-duration=".9s"
            data-wow-delay=".5s"
          >
            <span className="tp-service-icon mb-30">
              <img
                className="icon-animetion-icon"
                src={service3}
              />
            </span>
            <div className="tp-service-content">
              <h2 className="tp-service-title fw-600">
                Receive estimate with in 24 hours
              </h2>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-6">
          <div
            className="tp-service-item icon-animetion-wrap text-center mb-30 wow fadeInUp"
            data-wow-duration=".9s"
            data-wow-delay=".6s"
          >
            <span className="tp-service-icon mb-30">
              <img
                className="icon-animetion-icon"
                src={service4}
                style={{ width: 60 }}
              />
            </span>
            <div className="tp-service-content">
              <h2 className="tp-service-title fw-600">
                Assistance in hospitalization
              </h2>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-6">
          <div
            className="tp-service-item icon-animetion-wrap text-center mb-30 wow fadeInUp"
            data-wow-duration=".9s"
            data-wow-delay=".6s"
          >
            <span className="tp-service-icon mb-30">
              <img
                className="icon-animetion-icon"
                src={service5}
              />
            </span>
            <div className="tp-service-content">
              <h2 className="tp-service-title fw-600">
                Get Treatment with compassionate care
              </h2>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-6">
          <div
            className="tp-service-item icon-animetion-wrap text-center mb-30 wow fadeInUp"
            data-wow-duration=".9s"
            data-wow-delay=".6s"
          >
            <span className="tp-service-icon mb-30">
              <img
                className="icon-animetion-icon"
                src={train}
              />
            </span>
            <div className="tp-service-content">
              <h2 className="tp-service-title fw-600">
                Back to home with good health
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* How we work   */}
</>



  )
}

export default HowWork
