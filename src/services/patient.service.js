import api from "../api/axiosinstance";

export const PatientService = {
  // GET: {{localUrl}}/patient-stories
  getPatientStories: () => api.get('/patient-stories'),
   getPatientStoryDetails: (slug) => api.get(`/patient-stories/${slug}`),
};