import React, { useState } from 'react';
import { Stethoscope, Clock, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import ScheduleSurgery from '../Home/ScheduleSurgery';

const Value = () => {
  // Track which card is clicked/active
  const [activeIndex, setActiveIndex] = useState(null);

const medicalValues = [
{
      id: 1,
      title: "Specialized Care",
      desc: "Our board-certified specialists provide personalized treatment plans for complex conditions.",
      icon: <Stethoscope size={40} strokeWidth={1.5} />,
      color: "#e8f2ff"
    },
  {
    id: 2,
    title: "24/7 Emergency",
    desc: "We provide round-the-clock medical assistance with a dedicated trauma team ready to handle critical emergencies at any hour.",
    icon: <Clock size={40} strokeWidth={1.5} />,
    color: "#fff4e8"
  },
  {
    id: 3,
    title: "Modern Technology",
    desc: "Equipped with advanced diagnostic tools and minimally invasive surgical technology to ensure faster recovery and precise results.",
    icon: <ShieldCheck size={40} strokeWidth={1.5} />,
    color: "#e8fef4"
  },
  {
    id: 4,
    title: "Award Winners",
    desc: "Nationally recognized for setting new benchmarks in healthcare standards, patient safety protocols, and clinical excellence.",
    icon: <Award size={40} strokeWidth={1.5} />,
    color: "#f7e4fe"
  }
];

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
                Our Values
                </h2>

                <p
                  className="tp-breadcrumb-title  text-center mb-0"
                  style={{ fontSize: "18px", marginTop: "6px" }}
                >
                  {" "}
                Dedicated to exceptional care and compassionate support, we put your wellness at the heart of everything we do.


                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    <section className="tp-chose-area pt-20 pb-50" style={{ backgroundColor: 'rgb(226 235 245)' }}>
      <div className="container">


        <div className="row"  style={{marginTop:'52px'}} >
          {medicalValues.map((item, index) => (
            <div key={item.id} className="col-lg-3 col-md-6 mb-30" >
              <div 
              
                onClick={() => setActiveIndex(index)}
                className={`tp-about-two-service text-center p-4 bg-white  rounded-4 transition-all cursor-pointer ${
                  activeIndex === index ? 'shadow-lg ring-2 ring-primary' : 'shadow-sm hover-translate-y'
                }`}
         style={{ 
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
  border: activeIndex === index ? '2px solid #007bff' : '1px solid #dee2e6',
  position: 'relative',
}}
              >
                {/* Icon Container */}
                <div 
                  className="tp-about-two-service-icon mb-25 d-inline-flex align-items-center justify-content-center" 
                  style={{ 
                    backgroundColor: item.color, 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%',
                    color: '#111',
                    transition: 'transform 0.5s ease'
                  }}
                >
                  {item.icon}
                </div>

                <h4 className="tp-about-two-service-title fw-bold mb-10">{item.title}</h4>
                <p className="tp-about-two-service-dec text-muted small mb-15">
                  {item.desc}
                </p>

     
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Basic CSS for Hover Effect if not using a library */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hover-translate-y:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .transition-all {
          transition: all 0.3s ease-in-out;
        }
      `}} />
    </section>

    <ScheduleSurgery/>
    </>
  );
};

export default Value;