
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../../api/axiosinstance";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (val) => {
    const searchTerm = val || "";
    setQuery(searchTerm);
    
    if (searchTerm.trim().length > 2) {
      setLoading(true);
      try {
        const res = await api.get(`/hospitals?search=${searchTerm}`);
        
        // Safety check: Extract array from common project API wrappers
        const hospitalList = res?.data?.data || res?.data?.hospitals || res?.data || [];
        
        // CRITICAL: Ensure results is always an array to prevent .map() crash
        setResults(Array.isArray(hospitalList) ? hospitalList : []);
        setShowResults(true);
      } catch (err) {
        console.error("Search Error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

// 1. Updated handleSelect to match your App.js route
const handleSelect = (hospital) => {
  if (!hospital || !hospital.slug) return;

  setQuery("");
  setShowResults(false);

  // Matches <Route path="/hospital/:slug" ... />
  navigate(`/hospital/${hospital.slug}`);
};

// 2. Safety logic inside the return mapping
{showResults && (
  <ul className="search-results-dropdown shadow-lg" style={{
    position: 'absolute', top: '100%', left: 0, width: '100%', 
    background: 'white', zIndex: 1000, listStyle: 'none', 
    padding: '0', borderRadius: '8px', border: '1px solid #ddd',
    maxHeight: '250px', overflowY: 'auto'
  }}>
    {results.length > 0 ? (
      results.map((hospital) => (
        <li 
          key={hospital?.id || hospital?.slug} 
          onClick={() => handleSelect(hospital)}
          style={{ padding: '12px 15px', cursor: 'pointer', borderBottom: '1px solid #eee', textAlign: 'left' }}
        >
          {/* Ensure we only render strings, never the full hospital object */}
          <div className="fw-bold" style={{ color: '#1b3147', fontSize: '14px' }}>
            {hospital?.name || "Hospital"}
          </div>
          <div className="text-muted" style={{ fontSize: '11px' }}>
            {hospital?.city || "View Details"}
          </div>
        </li>
      ))
    ) : (
      <li className="p-3 text-center text-muted">No results found</li>
    )}
  </ul>
)}

  return (
    <div className="tp-header-search-wrap p-relative" ref={searchRef}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text" 
          placeholder="Search Hospitals..." 
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length > 2 && setShowResults(true)}
          autoComplete="off"
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status"></span>
          ) : (
            <svg width={15} height={15} viewBox="0 0 13 13" fill="none">
              <path d="M5.64267 10.7857C8.48288 10.7857 10.7853 8.48318 10.7853 5.64286C10.7853 2.80254 8.48288 0.5 5.64267 0.5C2.80245 0.5 0.5 2.80254 0.5 5.64286C0.5 8.48318 2.80245 10.7857 5.64267 10.7857Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.5 12.5L9.92871 9.92857" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </form>

      {/* RESULTS DROPDOWN */}
      {showResults && (
        <ul className="search-results-dropdown shadow-lg">
          {results.length > 0 ? (
            results.map((hospital, index) => (
              <li 
                key={hospital?.id || `hosp-${index}`} 
                onClick={() => handleSelect(hospital)}
                className="search-item-list"
              >
                {/* SAFETY: Only render strings, never objects */}
                <div className="hospital-name-text">
                  {String(hospital?.name || "Unnamed Hospital")}
                </div>
                {/* <div className="hospital-location-text">
                   <i className="fa-solid fa-location-dot me-1"></i>
                   {String(hospital?.city || "Location details unavailable")}
                </div> */}
              </li>
            ))
          ) : (
            <li className="no-result-text">No hospitals found for "{query}"</li>
          )}
        </ul>
      )}

      <style jsx>{`
        .search-results-dropdown {
          position: absolute;
          top: 110%;
          left: 0;
          width: 100%;
          background: #fff;
          z-index: 9999;
          list-style: none;
          padding: 5px 0;
          border-radius: 8px;
          border: 1px solid #ddd;
          max-height: 300px;
          overflow-y: auto;
        }
        .search-item-list {
          padding: 10px 15px;
          cursor: pointer;
          border-bottom: 1px solid #f1f1f1;
          text-align: left;
        }
        .search-item-list:hover {
          background-color: #f8fbff;
        }
        .hospital-name-text {
          font-weight: 700;
          color: #1b3147;
          font-size: 14px;
        }
        .hospital-location-text {
          font-size: 11px;
          color: #6c757d;
        }
        .no-result-text {
          padding: 20px;
          color: #999;
          text-align: center;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
};

export default SearchForm;