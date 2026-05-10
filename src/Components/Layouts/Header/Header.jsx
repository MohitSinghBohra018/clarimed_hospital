import React, { useState, useEffect, useRef, useCallback } from "react";
import logo from "../../../../assets/img/logo/logo_clarimed.jpeg";
import { Link } from "react-router-dom";
import { CommonService } from "../../../services/common.service";
import api from "../../../api/axiosinstance";
import SearchForm from "./SearchForm";
// api
// Link
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [language, setLanguage] = useState(false);
  const [lang, setLang] = useState("English");
  const [isTranslating, setIsTranslating] = useState(false);
  const dropdownRef = useRef(null);
  const translateInitialized = useRef(false);

  // logo
  const [siteLogo, setSiteLogo] = useState(null);

  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  // API DATA STATE
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const [countriesRes, deptRes, settingsRes] = await Promise.all([
          api.get("/countries"),
          api.get("/departments"),
          CommonService.getSettings(),
        ]);

        setCountries(countriesRes.data || []);
        setDepartments(deptRes.data || []);

        // ✅ Check if settings exist
        if (settingsRes?.data) {
          const settings = settingsRes.data;

          // 1. Existing Logo Logic (Keep this)
          const logoUrl = settings.logo;
          if (logoUrl) {
            setSiteLogo(logoUrl);
          }

          // 2. NEW: SEO Title (Updates Browser Tab)
          if (settings.meta_title) {
            document.title = settings.meta_title;
          }

          // 3. NEW: SEO Description (Updates Meta Tag)
          if (settings.meta_description) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
              metaDesc.setAttribute("content", settings.meta_description);
            }
          }

          // 4. NEW: SEO Keywords
          if (settings.meta_keywords) {
            const metaKey = document.querySelector('meta[name="keywords"]');
            if (metaKey) {
              metaKey.setAttribute("content", settings.meta_keywords);
            }
          }
        }
      } catch (error) {
        console.error("Header API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  // useEffect(() => {
  //   const fetchHeaderData = async () => {
  //     try {
  //       const [countriesRes, deptRes, settingsRes] = await Promise.all([
  //         api.get("/countries"),
  //         api.get("/departments"),
  //         CommonService.getSettings(),
  //       ]);

  //       setCountries(countriesRes.data || []);
  //       setDepartments(deptRes.data || []);

  //       console.log("FULL SETTINGS:", settingsRes);

  //       // ✅ FIX HERE
  //       const logoUrl = settingsRes?.data?.logo;

  //       console.log("API LOGO:", logoUrl);

  //       if (logoUrl) {
  //         setSiteLogo(logoUrl);
  //       }
  //     } catch (error) {
  //       console.error("Header API Error:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchHeaderData();
  // }, []);

  // Language mapping for display names
  const languageMap = {
    en: "English",
    de: "German",
    fr: "French",
    ar: "Arabic",
    ru: "Russian",
    es: "Spanish",
    bn: "Bengali",
    pt: "Portuguese",
    hi: "Hindi",
  };

  const toggleLanguage = () => {
    setLanguage(!language);
  };

  // Function to restore React functionality after translation
  const restoreReactFunctionality = useCallback(() => {
    setIsTranslating(false);
    setTimeout(() => {
      setMobileMenuOpen((prev) => prev);
    }, 100);
  }, []);

  // Initialize Google Translate
  useEffect(() => {
    if (translateInitialized.current) return;

    const loadGoogleTranslate = () => {
      if (!window.google || !window.google.translate) {
        const script = document.createElement("script");
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,de,fr,ar,ru,es,bn,pt,hi",
          autoDisplay: false,
          multilanguagePage: true,
        },
        "google_translate_element",
      );

      translateInitialized.current = true;
    };

    loadGoogleTranslate();

    // Restore saved language on mount
    const savedLang = localStorage.getItem("site_lang") || "en";
    setLang(languageMap[savedLang] || "English");

    // Apply saved language without reload on initial mount
    if (savedLang !== "en") {
      setTimeout(() => {
        applyLanguage(savedLang, false);
      }, 1500);
    }

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  // Handle click outside to close language dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDesktopClick =
        desktopDropdownRef.current &&
        desktopDropdownRef.current.contains(event.target);
      const isMobileClick =
        mobileDropdownRef.current &&
        mobileDropdownRef.current.contains(event.target);

      if (!isDesktopClick && !isMobileClick) {
        setLanguage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Observer to detect when Google Translate modifies the DOM
  useEffect(() => {
    if (!isTranslating) return;

    const observer = new MutationObserver((mutations) => {
      let needsRestore = false;

      mutations.forEach((mutation) => {
        if (
          mutation.type === "characterData" ||
          (mutation.type === "childList" && mutation.addedNodes.length > 0)
        ) {
          needsRestore = true;
        }
      });

      if (needsRestore) {
        restoreReactFunctionality();
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [isTranslating, restoreReactFunctionality]);

  const applyLanguage = (langCode, shouldReload = true) => {
    try {
      // Save to localStorage
      localStorage.setItem("site_lang", langCode);
      setLang(languageMap[langCode] || "English");
      setIsTranslating(true);

      // Remove all Google Translate cookies
      document.cookie =
        "googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie = `googtrans=;path=/;domain=${window.location.hostname};expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

      // Set new cookie if not English
      if (langCode !== "en") {
        document.cookie = `googtrans=/en/${langCode};path=/`;
      }

      // Update the Google Translate dropdown if it exists
      const googleFrame = document.querySelector(".goog-te-combo");
      if (googleFrame) {
        googleFrame.value = langCode;
        googleFrame.dispatchEvent(new Event("change", { bubbles: true }));
      }

      if (shouldReload) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        setTimeout(() => {
          setIsTranslating(false);
        }, 2000);
      }
    } catch (error) {
      console.warn("Language change error:", error);
      setIsTranslating(false);
    }
  };

  const changeLanguage = (langCode, langName) => {
    setLang(langName);
    applyLanguage(langCode);
    setLanguage(false);
  };

  const toggleSubmenu = (key) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 2. DYNAMIC MOBILE MENU ITEMS
  // Updated menuItems to include Glimpse of Care, Hotel, Get a Quote, and About Us
  const menuItems = (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      <li className="active" style={{ marginBottom: 8 }}>
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            display: "block",
            padding: "12px 0",
            color: "#1b3147",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Home
        </Link>
      </li>

      {/* DYNAMIC HOSPITALS */}
      {/* DYNAMIC HOSPITALS (MOBILE) */}
      <li className="has-dropdown" style={{ marginBottom: 8 }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toggleSubmenu("hospitals");
          }}
        >
          Hospitals{" "}
          <span style={{ float: "right", fontSize: "12px" }}>
            {openSubmenus.hospitals ? "−" : "+"}
          </span>
        </a>
        {openSubmenus.hospitals && (
          <ul
            className="sub-menu "
            style={{ listStyle: "none", paddingLeft: 16, margin: 0 }}
          >
            {countries.map((country) => (
              <li key={country.id} style={{ marginBottom: 8 }}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu(`h-country-${country.id}`);
                  }}
                >
                  {country.name}{" "}
                  <span style={{ float: "right", fontSize: "12px" }}>
                    {openSubmenus[`h-country-${country.id}`] ? "−" : "+"}
                  </span>
                </a>
                {openSubmenus[`h-country-${country.id}`] && (
                  <ul style={{ listStyle: "none", paddingLeft: 16, margin: 0 }}>
                    {country.departments?.map((dept) => (
                      <li key={dept.id} style={{ marginBottom: 4 }}>
                        {/* UPDATED LINK FOR MOBILE */}
                        <Link
                          to={`/hospitals/${country.slug}/${dept.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            display: "block",
                            padding: "6px 0",
                            color: "#666",
                            textDecoration: "none",
                          }}
                        >
                          {dept.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>

      {/* DYNAMIC DOCTORS */}
      <li className="has-dropdown" style={{ marginBottom: 8 }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toggleSubmenu("doctors");
          }}
          style={{
            display: "block",
            padding: "12px 0",
            color: "#1b3147",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Doctors{" "}
          <span style={{ float: "right", fontSize: "12px" }}>
            {openSubmenus.doctors ? "−" : "+"}
          </span>
        </a>
        {openSubmenus.doctors && (
          <ul
            className="sub-menu"
            style={{ listStyle: "none", paddingLeft: 16, margin: 0 }}
          >
            {countries.map((country) => (
              <li key={country.id} style={{ marginBottom: 8 }}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu(`d-country-${country.id}`);
                  }}
                  style={{
                    display: "block",
                    padding: "8px 0",
                    color: "#1b3147",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {country.name}{" "}
                  <span style={{ float: "right", fontSize: "12px" }}>
                    {openSubmenus[`d-country-${country.id}`] ? "−" : "+"}
                  </span>
                </a>
                {openSubmenus[`d-country-${country.id}`] && (
                  <ul style={{ listStyle: "none", paddingLeft: 16, margin: 0 }}>
                    {country.departments?.map((dept) => (
                      <li key={dept.id} style={{ marginBottom: 4 }}>
                        <Link
                          to={`/doctors/${country.slug}/${dept.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            display: "block",
                            padding: "6px 0",
                            color: "#666",
                            textDecoration: "none",
                          }}
                        >
                          {dept.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>

      {/* DYNAMIC SPECIALITIES */}
      <li className="has-dropdown" style={{ marginBottom: 8 }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toggleSubmenu("specialities");
          }}
          style={{
            display: "block",
            padding: "12px 0",
            color: "#1b3147",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Our Specialities{" "}
          <span style={{ float: "right", fontSize: "12px" }}>
            {openSubmenus.specialities ? "−" : "+"}
          </span>
        </a>
        {openSubmenus.specialities && (
          <ul
            className="sub-menu"
            style={{ listStyle: "none", paddingLeft: 16, margin: 0 }}
          >
            {departments.map((dept) => (
              <li key={dept.id} style={{ marginBottom: 8 }}>
                {/* Department Toggle */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu(`spec-${dept.id}`);
                  }}
                  style={{
                    display: "block",
                    padding: "8px 0",
                    fontWeight: "600",
                    color: "#1b3147",
                  }}
                >
                  {dept.name}
                  <span style={{ float: "right" }}>
                    {openSubmenus[`spec-${dept.id}`] ? "−" : "+"}
                  </span>
                </a>

                {/* Treatments */}
                {openSubmenus[`spec-${dept.id}`] && (
                  <ul style={{ listStyle: "none", paddingLeft: 16 }}>
                    {dept.treatments?.map((treat) => (
                      <li key={treat.id}>
                        <Link
                          to={`/treatment/${dept.slug}/${treat.slug}`} // ✅ FIXED LINK
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            display: "block",
                            padding: "6px 0",
                            color: "#666",
                          }}
                        >
                          {treat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>

      {/* 1. A GLIMPSE OF CARE (Submenu) */}
      <li className="has-dropdown" style={{ marginBottom: 8 }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toggleSubmenu("glimpse");
          }}
          style={{
            display: "block",
            padding: "12px 0",
            color: "#1b3147",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          A Glimpse of Care{" "}
          <span style={{ float: "right", fontSize: "12px" }}>
            {openSubmenus.glimpse ? "−" : "+"}
          </span>
        </a>
        {openSubmenus.glimpse && (
          <ul
            className="sub-menu"
            style={{ listStyle: "none", paddingLeft: 16, margin: 0 }}
          >
            <li style={{ marginBottom: 4 }}>
              <Link
                to="/patient-stories"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "6px 0",
                  color: "#666",
                  textDecoration: "none",
                }}
              >
                Patient Stories
              </Link>
            </li>
            <li style={{ marginBottom: 4 }}>
              <Link
                to="/blogs"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "6px 0",
                  color: "#666",
                  textDecoration: "none",
                }}
              >
                Blogs
              </Link>
            </li>
            <li style={{ marginBottom: 4 }}>
              <Link
                to="/testimonials"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "6px 0",
                  color: "#666",
                  textDecoration: "none",
                }}
              >
                Testimonials
              </Link>
            </li>
            <li style={{ marginBottom: 4 }}>
              <Link
                to="/news-events"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "6px 0",
                  color: "#666",
                  textDecoration: "none",
                }}
              >
                News and Events
              </Link>
            </li>
          </ul>
        )}
      </li>

      {/* 2. HOTEL (External Link) */}
      <li style={{ marginBottom: 8 }}>
        <a
          href="https://thesafeoasis.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            padding: "12px 0",
            color: "#1b3147",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Hotel
        </a>
      </li>

      {/* 3. GET A QUOTE */}
      <li style={{ marginBottom: 8 }}>
        <Link
          to="/get-quote"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            display: "block",
            padding: "12px 0",
            color: "#1b3147",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Get a Quote
        </Link>
      </li>

      {/* 4. ABOUT US (Submenu) */}
      <li className="has-dropdown" style={{ marginBottom: 8 }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toggleSubmenu("about");
          }}
          style={{
            display: "block",
            padding: "12px 0",
            color: "#1b3147",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          About Us{" "}
          <span style={{ float: "right", fontSize: "12px" }}>
            {openSubmenus.about ? "−" : "+"}
          </span>
        </a>
        {openSubmenus.about && (
          <ul
            className="sub-menu"
            style={{ listStyle: "none", paddingLeft: 16, margin: 0 }}
          >
            <li style={{ marginBottom: 4 }}>
              <Link
                to="/vision-mission"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "6px 0",
                  color: "#666",
                  textDecoration: "none",
                }}
              >
                Vision & Mission
              </Link>
            </li>
            <li style={{ marginBottom: 4 }}>
              <Link
                to="/value"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "6px 0",
                  color: "#666",
                  textDecoration: "none",
                }}
              >
                Value
              </Link>
            </li>
            <li style={{ marginBottom: 4 }}>
              <Link
                to="/our-teams"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "6px 0",
                  color: "#666",
                  textDecoration: "none",
                }}
              >
                Team
              </Link>
            </li>
          </ul>
        )}
      </li>
    </ul>
  );
  return (
    <>
      <header className="tp-header-height">
        {/* <div className="tp-header-top-area tp-header-top-spacing border-bottom d-none d-md-block"> */}
      <div className="tp-header-top-area tp-header-top-spacing border-bottom d-none d-xl-block w-full">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-3">
                <div className="tp-header-logo">
                  <Link to="/">
                    <img
                      src={siteLogo || logo}
                      alt="ClariMed"
                      style={{ height: 85 }}
                    />
                  </Link>
                </div>
              </div>
              <div className="col-lg-5 d-none d-lg-block">
                <SearchForm />
              </div>
              <div className="col-lg-4 col-md-9">
                <div className="tp-header-top-switcher-wrap d-flex align-items-center justify-content-end">
                  <div className="tp-header-contact mr-20">
                    <Link
                      to="/consultation-form"
                      className="tp-btn-small"
                      style={{
                        padding: "17px 20px",
                        borderRadius: 5,
                        fontWeight: 500,
                      }}
                    >
                      Book Free Consultation{" "}
                    </Link>
                  </div>
                  <div
                    className="tp-header-top-menu-item tp-header-top-lang"
                    ref={desktopDropdownRef}
                    style={{ position: "relative" }}
                  >
                    <span
                      className="tp-header-top-lang-toggle"
                      onClick={toggleLanguage}
                      style={{
                        cursor: "pointer",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 14,
                        color: "white",
                        padding: "8px 12px",
                        borderRadius: 4,
                        transition: "all 0.3s ease",
                        backgroundColor: language
                          ? "rgba(255, 255, 255, 0.1)"
                          : "transparent",
                      }}
                    >
                      <i
                        className="fa-solid fa-globe"
                        style={{ fontSize: 16, color: "white" }}
                      />
                      <span>{lang}</span>
                      <i
                        className="fa-solid fa-chevron-down"
                        style={{
                          fontSize: 12,
                          color: "white",
                          transition: "transform 0.3s ease",
                          transform: language
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      />
                    </span>
                    {language && (
                      <ul
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          marginTop: 8,
                          backgroundColor: "#1b3147",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: 6,
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                          zIndex: 1000,
                          listStyle: "none",
                          padding: "8px 0",
                          margin: 0,
                          minWidth: 140,
                        }}
                      >
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              changeLanguage("en", "English");
                            }}
                            style={{
                              display: "block",
                              padding: "10px 16px",
                              color: "white",
                              textDecoration: "none",
                              transition: "all 0.2s ease",
                              backgroundColor:
                                (localStorage.getItem("site_lang") || "en") ===
                                "en"
                                  ? "rgba(255, 255, 255, 0.15)"
                                  : "transparent",
                              fontSize: 13,
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "en"
                              ) {
                                e.target.style.backgroundColor =
                                  "rgba(255, 255, 255, 0.1)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "en"
                              ) {
                                e.target.style.backgroundColor = "transparent";
                              }
                            }}
                          >
                            English
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              changeLanguage("fr", "French");
                            }}
                            style={{
                              display: "block",
                              padding: "10px 16px",
                              color: "white",
                              textDecoration: "none",
                              transition: "all 0.2s ease",
                              backgroundColor:
                                (localStorage.getItem("site_lang") || "en") ===
                                "fr"
                                  ? "rgba(255, 255, 255, 0.15)"
                                  : "transparent",
                              fontSize: 13,
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "fr"
                              ) {
                                e.target.style.backgroundColor =
                                  "rgba(255, 255, 255, 0.1)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "fr"
                              ) {
                                e.target.style.backgroundColor = "transparent";
                              }
                            }}
                          >
                            French
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              changeLanguage("ar", "Arabic");
                            }}
                            style={{
                              display: "block",
                              padding: "10px 16px",
                              color: "white",
                              textDecoration: "none",
                              transition: "all 0.2s ease",
                              backgroundColor:
                                (localStorage.getItem("site_lang") || "en") ===
                                "ar"
                                  ? "rgba(255, 255, 255, 0.15)"
                                  : "transparent",
                              fontSize: 13,
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "ar"
                              ) {
                                e.target.style.backgroundColor =
                                  "rgba(255, 255, 255, 0.1)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "ar"
                              ) {
                                e.target.style.backgroundColor = "transparent";
                              }
                            }}
                          >
                            Arabic
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              changeLanguage("ru", "Russian");
                            }}
                            style={{
                              display: "block",
                              padding: "10px 16px",
                              color: "white",
                              textDecoration: "none",
                              transition: "all 0.2s ease",
                              backgroundColor:
                                (localStorage.getItem("site_lang") || "en") ===
                                "ru"
                                  ? "rgba(255, 255, 255, 0.15)"
                                  : "transparent",
                              fontSize: 13,
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "ru"
                              ) {
                                e.target.style.backgroundColor =
                                  "rgba(255, 255, 255, 0.1)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "ru"
                              ) {
                                e.target.style.backgroundColor = "transparent";
                              }
                            }}
                          >
                            Russian
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              changeLanguage("es", "Spanish");
                            }}
                            style={{
                              display: "block",
                              padding: "10px 16px",
                              color: "white",
                              textDecoration: "none",
                              transition: "all 0.2s ease",
                              backgroundColor:
                                (localStorage.getItem("site_lang") || "en") ===
                                "es"
                                  ? "rgba(255, 255, 255, 0.15)"
                                  : "transparent",
                              fontSize: 13,
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "es"
                              ) {
                                e.target.style.backgroundColor =
                                  "rgba(255, 255, 255, 0.1)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "es"
                              ) {
                                e.target.style.backgroundColor = "transparent";
                              }
                            }}
                          >
                            Spanish
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              changeLanguage("de", "German");
                            }}
                            style={{
                              display: "block",
                              padding: "10px 16px",
                              color: "white",
                              textDecoration: "none",
                              transition: "all 0.2s ease",
                              backgroundColor:
                                (localStorage.getItem("site_lang") || "en") ===
                                "de"
                                  ? "rgba(255, 255, 255, 0.15)"
                                  : "transparent",
                              fontSize: 13,
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "de"
                              ) {
                                e.target.style.backgroundColor =
                                  "rgba(255, 255, 255, 0.1)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "de"
                              ) {
                                e.target.style.backgroundColor = "transparent";
                              }
                            }}
                          >
                            German
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              changeLanguage("hi", "Hindi");
                            }}
                            style={{
                              display: "block",
                              padding: "10px 16px",
                              color: "white",
                              textDecoration: "none",
                              transition: "all 0.2s ease",
                              backgroundColor:
                                (localStorage.getItem("site_lang") || "en") ===
                                "hi"
                                  ? "rgba(255, 255, 255, 0.15)"
                                  : "transparent",
                              fontSize: 13,
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "hi"
                              ) {
                                e.target.style.backgroundColor =
                                  "rgba(255, 255, 255, 0.1)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "hi"
                              ) {
                                e.target.style.backgroundColor = "transparent";
                              }
                            }}
                          >
                            Hindi
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              changeLanguage("pt", "Portuguese");
                            }}
                            style={{
                              display: "block",
                              padding: "10px 16px",
                              color: "white",
                              textDecoration: "none",
                              transition: "all 0.2s ease",
                              backgroundColor:
                                (localStorage.getItem("site_lang") || "en") ===
                                "pt"
                                  ? "rgba(255, 255, 255, 0.15)"
                                  : "transparent",
                              fontSize: 13,
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "pt"
                              ) {
                                e.target.style.backgroundColor =
                                  "rgba(255, 255, 255, 0.1)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "pt"
                              ) {
                                e.target.style.backgroundColor = "transparent";
                              }
                            }}
                          >
                            Portuguese
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              changeLanguage("bn", "Bengali");
                            }}
                            style={{
                              display: "block",
                              padding: "10px 16px",
                              color: "white",
                              textDecoration: "none",
                              transition: "all 0.2s ease",
                              backgroundColor:
                                (localStorage.getItem("site_lang") || "en") ===
                                "bn"
                                  ? "rgba(255, 255, 255, 0.15)"
                                  : "transparent",
                              fontSize: 13,
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "bn"
                              ) {
                                e.target.style.backgroundColor =
                                  "rgba(255, 255, 255, 0.1)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (
                                (localStorage.getItem("site_lang") || "en") !==
                                "bn"
                              ) {
                                e.target.style.backgroundColor = "transparent";
                              }
                            }}
                          >
                            Bengali
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="header-sticky"
          className="tp-header-area tp-header-one tp-header-blur p-relative"
        >
         <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-10 d-none d-xl-block">
                <div className="tp-main-menu tp-menu-dropdown">
                  <nav className="tp-mobile-menu-active">
                    <ul>
                      <li className="active">
                        <Link to="/">Home</Link>
                      </li>

                      {/* DYNAMIC DESKTOP HOSPITALS */}
                      {/* DYNAMIC DESKTOP HOSPITALS */}
                      <li className="has-dropdown">
                        <a href="#">Hospitals</a>
                        <ul className="sub-menu">
                          {countries.map((country) => (
                            <li
                              key={country.id}
                              className="menu-item-has-children"
                            >
                              <a href="#">{country.name}</a>
                              <ul className="sub-menu scrollable-menu">
                                {country.departments?.map((dept) => (
                                  <li key={dept.id}>
                                    {/* UPDATED LINK: Includes country slug and department slug */}
                                    <Link
                                      to={`/hospitals/${country.slug}/${dept.slug}`}
                                    >
                                      {dept.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </li>

                      {/* DYNAMIC DESKTOP DOCTORS */}
                      <li className="has-dropdown">
                        <a href="#">Doctors</a>
                        <ul className="sub-menu ">
                          {countries.map((country) => (
                            <li
                              key={country.id}
                              className="menu-item-has-children"
                            >
                              <a href="#">{country.name}</a>
                              <ul className="sub-menu scrollable-menu">
                                {country.departments?.map((dept) => (
                                  <li key={dept.id}>
                                    <Link
                                      to={`/doctors/${country.slug}/${dept.slug}`}
                                    >
                                      {dept.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </li>

                      {/* DYNAMIC DESKTOP SPECIALITIES */}
                      <li className="has-dropdown">
                        <a href="#">Our Specialities</a>
                        <ul className="sub-menu">
                          {departments.map((dept) => (
                            <li
                              key={dept.id}
                              className="menu-item-has-children "
                            >
                              <a href="#">{dept.name}</a>
                              <ul className="sub-menu scrollable-menu">
                                {dept.treatments?.map((treat) => (
                                  <li key={treat.id}>
                                    <Link
                                      to={`/treatment/${dept.slug}/${treat.slug}`}
                                    >
                                      {treat.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </li>

                      {/* Static items */}
                      <li className="has-dropdown">
                        <a href="#l">A Glimpse of Care</a>
                        <ul className="sub-menu">
                          <li className="">
                            <Link to="/patient-stories">Patient stories</Link>
                          </li>
                          <li className="">
                            <Link to="/blogs">Blogs</Link>
                          </li>
                          <li className="">
                            <Link to="/testimonials">Testimonials</Link>
                          </li>
                          <li className="">
                            <Link to="/news-events">News and Events</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a
                          href="https://thesafeoasis.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Hotel
                        </a>
                      </li>
                      <li>
                        <Link to="/get-quote">Get a Quote</Link>
                      </li>
                      <li className="has-dropdown">
                        <a href="#l">About Us</a>
                        <ul className="sub-menu">
                          <li className="">
                            <Link to="vision-mission">
                              Vision &amp; Mission
                            </Link>
                          </li>
                          <li className="">
                            <Link to="/value">Value</Link>
                          </li>
                          <li className="">
                            <Link to="/our-teams">Team</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xl-2 d-none d-xl-block">
                <div className="tp-header-contact ">
                  <a
                    href="tel:+1234567890"
                    style={{
                      fontWeight: "bold",
                      textDecoration: "none",
                      background:
                        "linear-gradient(90deg, var(--tp-theme-1), var(--tp-theme-2))",
                      padding: 12,
                    }}
                  >
                    <i
                      className="fa-solid fa-phone"
                      style={{ marginRight: 8, color: "rgb(255, 255, 255)" }}
                    />
                    +91 9987567890
                  </a>
                </div>
              </div>

              <div
                className="col-12 d-xl-none"
                style={{
                  backgroundColor: "rgb(27, 49, 71)",
                  padding: "10px 0",
                }}
              >
                <div className="container">
                  <div className="row align-items-center">
                    {/* 1. Logo Section */}
                    <div className="col-4">
                      <div className="tp-header-logo">
                        <Link to="/">
                          <img
                            src={siteLogo || logo}
                            alt="ClariMed Logo"
                            width={100}
                            height={36}
                            style={{ objectFit: "contain" }}
                          />
                        </Link>
                      </div>
                    </div>

                    {/* 2. Language & Menu Toggle Section */}
                    <div className="col-8">
                      <div
                        className="d-flex align-items-center justify-content-end"
                        style={{ gap: "15px" }}
                      >
                        {/* Language Converter */}
                        <div
                          className="tp-header-top-lang"
                          ref={mobileDropdownRef}
                          style={{ position: "relative" }}
                        >
                          <span
                            className="tp-header-top-lang-toggle"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLanguage();
                            }}
                            style={{
                              cursor: "pointer",
                              fontWeight: 500,
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              fontSize: 12, // Slightly smaller for mobile fit
                              color: "white",
                              padding: "6px 10px",
                              borderRadius: 4,
                              backgroundColor: language
                                ? "rgba(255, 255, 255, 0.2)"
                                : "rgba(255, 255, 255, 0.1)",
                            }}
                          >
                            <i
                              className="fa-solid fa-globe"
                              style={{ fontSize: 14 }}
                            />
                            <span>{lang}</span>
                            <i
                              className="fa-solid fa-chevron-down"
                              style={{
                                fontSize: 10,
                                transition: "transform 0.3s ease",
                                transform: language
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              }}
                            />
                          </span>

                          {/* Dropdown Menu */}
                          {language && (
                            <ul
                              style={{
                                position: "absolute",
                                top: "120%",
                                right: 0,
                                backgroundColor: "#1b3147",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                borderRadius: 6,
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                                zIndex: 1100,
                                listStyle: "none",
                                padding: "5px 0",
                                margin: 0,
                                minWidth: 130,
                              }}
                            >
                              {Object.entries(languageMap).map(
                                ([code, name]) => (
                                  <li key={code}>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        changeLanguage(code, name);
                                      }}
                                      style={{
                                        display: "block",
                                        width: "100%",
                                        textAlign: "left",
                                        padding: "10px 16px",
                                        color: "white",
                                        background:
                                          (localStorage.getItem("site_lang") ||
                                            "en") === code
                                            ? "rgba(255, 255, 255, 0.15)"
                                            : "transparent",
                                        border: "none",
                                        fontSize: 13,
                                        cursor: "pointer",
                                      }}
                                    >
                                      {name}
                                    </button>
                                  </li>
                                ),
                              )}
                            </ul>
                          )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="tp-header-toogle-wrapper">
                          <button
                            className="tp-header-toogle"
                            onClick={() => setMobileMenuOpen(true)}
                            style={{
                              background: "transparent",
                              border: "none",
                            }}
                            aria-label="Open mobile menu"
                          >
                            <i
                              className="fa-solid fa-bars"
                              style={{ color: "white", fontSize: 20 }}
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "fixed",
              inset: 0,
              background: mobileMenuOpen ? "rgba(0,0,0,0.55)" : "transparent",
              opacity: mobileMenuOpen ? 1 : 0,
              pointerEvents: mobileMenuOpen ? "auto" : "none",
              transition: "opacity 0.25s ease",
              zIndex: 999,
            }}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* mobile header */}

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100%",
              width: 320,
              maxWidth: "85%",
              background: "#f9fbfd",
              transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.25s ease",
              zIndex: 1000,
              overflowY: "auto",
              boxShadow: "2px 0 18px rgba(0,0,0,0.16)",
            }}
          >
            <div
              style={{
                padding: 18,
                borderBottom: "1px solid #e6e6e6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#000000", // White text if using the dark background
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Menu List
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 24,
                  cursor: "pointer",
                  color: "#1b3147",
                }}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>
            <div style={{ padding: 16 }}>
              <nav style={{ width: "100%", padding: "0 4px" }}>{menuItems}</nav>
            </div>
          </div>
        </div>
      </header>

      <div id="google_translate_element" style={{ display: "none" }}></div>

      {/* Add CSS to hide ALL Google Translate UI elements */}
      <style jsx>{`
        /* Hide Google Translate top banner */
        .goog-te-banner-frame {
          display: none !important;
        }

        /* Hide the Google Translate popup/loading indicator */
        .goog-te-spinner-pos,
        .goog-te-spinner,
        .goog-te-gadget-simple,
        .goog-te-gadget-icon,
        .goog-te-menu-frame,
        .goog-te-menu2,
        .goog-te-menu-value,
        .goog-te-balloon-frame,
        .VIpgJd-ZVi9od-ORHb-OEVmcd,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
        .VIpgJd-ZVi9od-aZ2wEe-OiiCO,
        .VIpgJd-ZVi9od-ORHb,
        .VIpgJd-ZVi9od-ORHb-OEVmcd,
        .VIpgJd-ZVi9od-SmfZ,
        .VIpgJd-ZVi9od-xl07Ob,
        .VIpgJd-ZVi9od-vH1Gmf,
        .VIpgJd-ZVi9od-l9xktf {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          z-index: -9999 !important;
        }

        /* Hide any Google Translate iframes */
        iframe[src*="google.com/translate"],
        .goog-te-menu-frame,
        .goog-te-banner-frame,
        .goog-te-balloon-frame {
          display: none !important;
          visibility: hidden !important;
        }

        /* Adjust body positioning */
        body {
          top: 0 !important;
        }

        /* Hide Google Translate tooltips and highlights */
        .goog-tooltip,
        .goog-tooltip:hover,
        .goog-text-highlight,
        .VIpgJd-ZVi9od-ORHb-OEVmcd,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
        .VIpgJd-ZVi9od-aZ2wEe-OiiCO,
        .VIpgJd-ZVi9od-ORHb,
        .VIpgJd-ZVi9od-ORHb-OEVmcd {
          display: none !important;
          background: none !important;
          box-shadow: none !important;
        }

        /* Hide the Google Translate attribution */
        .goog-logo-link,
        .goog-logo-link:visited,
        .goog-logo-link:hover,
        .goog-logo-link:active,
        .goog-te-gadget span,
        .goog-te-gadget div,
        .goog-te-gadget a {
          display: none !important;
        }

        /* Hide the Google Translate loading animation */
        .goog-te-spinner-pos {
          display: none !important;
        }

        /* Hide the Google Translate container if it appears */
        .goog-te-gadget-simple {
          display: none !important;
        }

        /* Ensure React components maintain functionality */
        .tp-header-top-lang-toggle,
        .sidebar-button,
        a[href="#"],
        button {
          pointer-events: auto !important;
          cursor: pointer !important;
        }
      `}</style>
    </>
  );
}

export default Header;
