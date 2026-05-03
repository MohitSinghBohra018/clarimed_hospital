import api from "../api/axiosinstance";

export const CommonService = {
  getHeaderData: () => {
    return Promise.all([
      api.get('/countries'),
      api.get('/departments')
    ]);
  },

// site setting 
  getSettings: () => {
    return api.get('/site-settings');
  },
  
  getHospitals: (countrySlug, deptSlug) => {
    const params = {};
    if (countrySlug) params.country_slug = countrySlug;
    if (deptSlug) params.department_slug = deptSlug;
    return api.get(`/hospitals`, { params });
  },

  //  Hospital Detail API
getHospitalBySlug: (slug) => {
  return api.get(`/hospitals/${slug}`);
},


  //  Doctors API
  getDoctors: (countrySlug, deptSlug) => {
    return api.get(`/doctors`, {
      params: {
        country_slug: countrySlug,
        department_slug: deptSlug,
       
      }
    });
  },

    getDoctorBySlug: (slug) => {
  return api.get(`/doctors/${slug}`);
},

// end doctors 


// specility
  getSpecialities: (deptSlug, treatmentSlug) => {
    return api.get(`/doctors`, {
      params: {
        department_slug: deptSlug,
        treatment_slug: treatmentSlug,
      }
    });
  },

    // packages 
  getPackages:()=>{
    return api.get('/packages');
  },


  
  // home banner
  getBanner:()=>{
    return api.get('/home-banner');
  },

      // faqs
  getFaqs:()=>{
    return api.get('/faqs');
  },

  
   // our team
  getTeam:()=>{
    return api.get('/our-team');
  },

  

    //get a qouute
 
postQuote: (data) => {
  return api.post('/get-quote', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
},

// ✅ GET doctor slots (dynamic)
getDoctorSlots: (slug, date) => {
   return api.get(`/doctors/${slug}/available-slots?date=${date}`);
},

  // ✅ BOOK appointment
// Inside CommonService.js
bookAppointment: (data) => {
  return api.post(`/appointments/book`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
},


// ✅ Department by slug
getDepartmentBySlug: (slug) => {
  return api.get(`/treatments/department/${slug}/`);
},


// ✅ GET treatment by slug to get description
getTreatmentBySlug: () => {
  return api.get(`/treatments`); 
},

  

  
};