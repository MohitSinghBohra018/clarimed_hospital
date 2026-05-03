import React from 'react'
 import img01 from "../../../assets/img/icon/doctor_01.png"
  import img02 from "../../../assets/img/icon/doctor_02.png"
import { Link } from 'react-router-dom'
   // import img03 from "../../../assets/img/icon/doctor_03.jpeg"
   
const WhyChoose = () => {
  return (
   <>

    

  <div className="tp-chose-area pt-160 pb-80 tp-section-pt tp-section-pb">
         <div className="container">
            <div className="row">
               <div className="col-xl-6">
                  <div className="tp-chose-section-title p-relative mb-60">
                     <span className="tp-section-subtitle d-inline-block mb-15 wow fadeInUp" data-wow-duration=".9s" data-wow-delay=".3s">Why Choose Us</span>
                     <h2 className="tp-section-title fw-600 mb-10 wow fadeInUp" data-wow-duration=".9s" data-wow-delay=".4s">Reasons people trust <br/>  Clarimed Healthcare </h2>
                     <p className="mb-40 wow fadeInUp" data-wow-duration=".9s" data-wow-delay=".5s">We’re your trusted healthcare guide, connecting you with the right doctors,<br/> hospitals, and treatments while simplifying every step of your medical journey.</p>
                     <Link to="/value" className="tp-btn wow fadeInUp" data-wow-duration=".9s" data-wow-delay=".6s">Learn more
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M11.4922 5.89282H0.900117" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                           <path d="M7.1765 10.8855C7.1765 10.8855 11.884 7.20841 11.884 5.89276C11.884 4.57711 7.17642 0.900146 7.17642 0.900146" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                     </Link>
                  </div>
               </div>
               <div className="col-xl-6">
                  <div className="tp-chose-wrap">
                     <div className="tp-chose-item mb-60" data-bg-color="#f7e4fe" style={{backgroundColor: "#f7e4fe"}}>
                        <div className="row">
                           <div className="col-md-7">
                              <div className="tp-chose-content">
                                 <h3 className="tp-chose-numbar">01</h3>
                                 <h4 className="tp-chose-title"><a href="#">Trusted Guidance</a></h4>
                                 <p className="tp-chose-dec mb-25">We help you find the right doctors, hospitals, and treatment options tailored to your needs.</p>
                                 <Link  to="/value" className="tp-btn-solid">
                                    Learn more
                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M11.3577 5.75L0.750066 5.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                       <path d="M7.03557 10.75C7.03557 10.75 11.75 7.06751 11.75 5.74994C11.75 4.43236 7.03549 0.75 7.03549 0.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                 </Link>
                              </div>
                           </div>
                           <div className="col-md-5">
                              <div className="tp-chose-thumb ml-40">
                                 <img className="w-100" src={img01} alt=""/>
                              </div>
                           </div>
                        </div>
                     </div>
                    <div className="tp-chose-item mb-60" data-bg-color="#ecf8f1" style={{ backgroundColor: "#ecf8f1" }}>
                        <div className="row">
                           <div className="col-md-7">
                              <div className="tp-chose-content">
                                 <h3 className="tp-chose-numbar">02</h3>
                                 <h4 className="tp-chose-title"><a href="#">Seamless Experience</a></h4>
                                 <p className="tp-chose-dec mb-25">From booking appointments to managing your care journey, we make the process smooth and simple.</p>
                                 <Link to="/value" className="tp-btn-solid">
                                    Learn more
                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M11.3577 5.75L0.750066 5.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                       <path d="M7.03557 10.75C7.03557 10.75 11.75 7.06751 11.75 5.74994C11.75 4.43236 7.03549 0.75 7.03549 0.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                 </Link>
                              </div>
                           </div>
                           <div className="col-md-5">
                              <div className="tp-chose-thumb ml-40">
                                <img className="w-100" src={img02} alt="" />
                              </div>
                           </div>
                        </div>
                     </div> 
                      <div className="tp-chose-item mb-60" data-bg-color="#fef9ce" style={{backgroundColor: "#fef9ce"}}>
                        <div className="row">
                           <div className="col-md-7">
                              <div className="tp-chose-content">
                                 <h3 className="tp-chose-numbar">03</h3>
                                 <h4 className="tp-chose-title"><a href="#">Stress-Free Support</a></h4>
                                 <p className="tp-chose-dec mb-25">Our team provides continuous assistance, ensuring a hassle-free and comfortable healthcare experience.</p>
                                 <Link to="/value" className="tp-btn-solid">
                                    Learn more
                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M11.3577 5.75L0.750066 5.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                       <path d="M7.03557 10.75C7.03557 10.75 11.75 7.06751 11.75 5.74994C11.75 4.43236 7.03549 0.75 7.03549 0.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                 </Link>
                              </div>
                           </div>
                           <div className="col-md-5">
                              <div className="tp-chose-thumb ml-40">
                                  <img className="w-100" src="https://static.vecteezy.com/system/resources/thumbnails/072/510/144/small/compassionate-doctor-visiting-smiling-patient-in-hospital-bed-offering-support-and-professional-medical-care-in-a-bright-modern-hospital-environment-photo.jpeg" alt="" />
                              </div>
                           </div>
                        </div>
                     </div> 
                  </div>
               </div>
            </div>
         </div>
      </div> 
      
   </>
  )
}

export default WhyChoose
