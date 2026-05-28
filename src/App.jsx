import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Layouts/Header/Header";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Layouts/Footer/Footer";

import IndiaHospital from "./Pages/Hospital/India/IndiaHospital";
import BookAppointment from "./Pages/Doctor/India/BookAppointment";
import DoctorProfile from "./Pages/Doctor/India/DoctorProfile";
import Urology from "./Pages/Doctor/India/DoctorList";
import WeightLose from "./Pages/Doctor/India/WeightLose";
import ExtraPage from "./Pages/Hospital/India/ExtraPage";
import Piles from "./Pages/Specialist/Specaliality";
import ConsultationForm from "./Components/Common/ConsultationForm";
import About from "./Pages/About/About";
import VisionMission from "./Pages/About/VisionMisson";
import GetQuote from "./Pages/GetQuote/GetQuote";
import Testimonial from "./Pages/Testimonial/Testimonial";
import Blogs from "./Pages/Home/Blogs";
import MainBlogs from "./Pages/Blogs/MainBlogs";
import MainBlogsDetails from "./Pages/Blogs/MainBlogsDetails";
import HospitalDetail from "./Pages/Hospital/India/HospitalDetail";
import NewsEvents from "./Pages/NewsEvents/NewsEvents";
import NewsEventsDetail from "./Pages/NewsEvents/NewsEventsDetail";
import PatientStories from "./Pages/PatientStories/PatientStories";
import PatientStoriesDetails from "./Pages/PatientStories/PatientStoriesDetails";
import WhyChoose from "./Pages/Home/WhyChoose";
import WhyChooseUs from "./Pages/About/Value";
import Value from "./Pages/About/Value";
import Team from "./Pages/About/Team";
import TermsCondition from "./Pages/PolicyPages/TermsCondition";
import Privacy from "./Pages/PolicyPages/Privacy";
import Faqs from "./Pages/Home/Faqs";
import AllFaqs from "./Pages/Faqs/AllFaqs";
import ContactUs from "./Pages/Contact/ContactUs";
import Packages from "./Pages/Packages/Packages";
import DoctorList from "./Pages/Doctor/India/DoctorList";
import Specaliality from "./Pages/Specialist/Specaliality";
import Carriers from "./Pages/PolicyPages/Carriers";
import WhatsAppButton from "./Pages/WhatsAppButton";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
 <WhatsAppButton/>
        <Header />
        <Routes>
       
          <Route path="/" element={<Home />}>
            {" "}
          </Route>

          {/* doctor routes */}
          <Route
            path="best-weight-loss-doctor-india"
            element={<WeightLose />}
          />
          {/* doctor appointment  */}
         <Route path="book-appointment/:slug" element={<BookAppointment />} />
          

          {/*  Doctor Start routes  */}
          <Route path="/doctors/:country_slug/:department_slug" element={<DoctorList />} />
          <Route path="/doctors/:slug" element={<DoctorProfile />} />

          {/* hospital start routes */}
          <Route
          path="/hospitals/:country_slug/:department_slug?"
            element={<IndiaHospital />}
          />
            {/* hospital details */}
          <Route path="/hospital/:slug" element={<HospitalDetail />} />
          {/* hospital end */}

          <Route path="best-cardiac-hospital-india" element={<ExtraPage />} />

          {/* common form for consultation */}
          <Route
            path="/consultation-form"
            element={<ConsultationForm />}
          ></Route>

        

          {/* specilist route */}
          <Route path="/treatment/:department_slug/:treatment_slug" element={<Specaliality />} />
         

          {/* about us  */}
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/value" element={<Value />}>
            {" "}
          </Route>
          <Route path="/our-teams" element={<Team />}>
            {" "}
          </Route>

          {/* news and events */}
       
             {/* news and events */}
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/news-events/:slug" element={<NewsEventsDetail />} />

          {/* patient  */}
          <Route path="/patient-stories" element={<PatientStories />} />
          <Route
            path="/patient-stories-details/:slug"
            element={<PatientStoriesDetails />}
          ></Route>

          {/* get a quote */}
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/testimonials" element={<Testimonial />} />
          <Route path="/blogs" element={<MainBlogs />} />
          <Route path="/blogs-details/:slug" element={<MainBlogsDetails />} />

          {/* faqs */}
          <Route path="/faqs" element={<AllFaqs />} />

          <Route path="/contact-us" element={<ContactUs />} />

          {/* policy  */}
          <Route path="terms-condition" element={<TermsCondition />}></Route>
          <Route path="privacy-policy" element={<Privacy />}></Route>
           <Route path="carrier" element={<Carriers />}></Route>


          {/* package  */}
       <Route path="all-packages" element={<Packages />}></Route>

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
