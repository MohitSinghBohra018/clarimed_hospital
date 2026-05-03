import React from 'react'
import Faqs from '../Home/Faqs'

const AllFaqs = () => {
  return (
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
               How Can We Help?

                </h2>

                <p
                  className="tp-breadcrumb-title  text-center mb-0"
                  style={{ fontSize: "18px", marginTop: "6px" }}
                >
                  {" "}
                Everything you need to know about ClariMed Hospital in one place.


                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
   <Faqs/>

   </>
  )
}

export default AllFaqs
