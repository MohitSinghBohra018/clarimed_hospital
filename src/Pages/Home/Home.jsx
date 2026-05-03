import React from "react";
import Banner from "./Banner";
import CityFilter from "./CityFilter";
import Surgury from "./Surgury";
import Speciality from "./Speciality";
import HospitalLocation from "./HospitalLocation";
import SpecialistDoctor from "./SpecialistDoctor";
import HowWork from "./HowWork";
import WhyChoose from "./WhyChoose";
import Blogs from "./Blogs";
import Patient from "./Patient";
import ScheduleSurgery from "./ScheduleSurgery";
import Faqs from "./Faqs";
import TreatmentPackages from "./TreatmentPackages";

const Home = () => {
  return (
    <>
      <Banner />
      <CityFilter />
      <Surgury />
      <Speciality />
      <HospitalLocation />
      <SpecialistDoctor />
      <TreatmentPackages />
      <HowWork />
      <WhyChoose />
      <Blogs />
      <Patient />
      <ScheduleSurgery />
      <Faqs />
    </>
  );
};

export default Home;
