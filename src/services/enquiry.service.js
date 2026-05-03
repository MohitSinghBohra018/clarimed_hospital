import api from "../api/axiosInstance";

export const EnquiryService = {
  submitEnquiry: (formData) => {
    return api.post("/enquiry", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};