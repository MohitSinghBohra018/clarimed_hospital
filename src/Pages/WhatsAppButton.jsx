import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { CommonService } from "../services/common.service";
// CommonService

const WhatsAppButton = () => {
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    CommonService.getSettings()
      .then((res) => {
        const phone = res?.data?.phone || res?.phone;
        if (phone) {
          // Clean number (remove spaces, brackets, etc.)
          const formatted = phone.replace(/[^\d]/g, "");
          setWhatsappNumber(formatted);
        }
      })
      .catch((err) => console.error("Error fetching WhatsApp number:", err));
  }, []);

  if (!whatsappNumber) return null; // Don't show until number loads

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;