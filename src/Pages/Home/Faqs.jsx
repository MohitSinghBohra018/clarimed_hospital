import React, { useEffect, useState } from "react";
import { CommonService } from "../../services/common.service";

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  // ✅ Fetch FAQs from API
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await CommonService.getFaqs();

        console.log("FAQ API 👉", res); // optional debug

        // ✅ handle all API structures safely
        const apiData =
          res?.data?.data ||   // Laravel standard
          res?.data ||         // direct array
          [];

        // ✅ sort (optional)
        const sortedFaqs = apiData.sort(
          (a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0)
        );

        setFaqs(sortedFaqs);
      } catch (error) {
        console.error("FAQ API Error:", error);
        setFaqs([]);
      }
    };

    fetchFaqs();
  }, []);

  // ✅ Toggle open/close
  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-container">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <div
              key={faq.id || index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <div
                className="faq-question"
                onClick={() => toggleFaq(index)}
                style={{ cursor: "pointer", fontWeight: "600" }}
              >
                {faq.question}
              </div>

              <div
                className="faq-answer"
                style={{
                  display: activeIndex === index ? "block" : "none",
                  marginTop: "10px",
                }}
                // ✅ supports HTML answers
                dangerouslySetInnerHTML={{
                  __html: faq.answer || "No answer available",
                }}
              />
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No FAQs available.</p>
        )}
      </div>
    </section>
  );
};

export default Faqs;