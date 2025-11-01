import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <svg className="logo-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Modern Eye Icon */}
              <circle cx="24" cy="24" r="18" fill="url(#eyeGradient)" />
              <ellipse cx="24" cy="24" rx="12" ry="13" fill="#2563eb" />
              <circle cx="24" cy="24" r="7" fill="#1e40af" />
              <circle cx="26" cy="22" r="3" fill="white" opacity="0.9" />
              <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" opacity="0.3" />
              <defs>
                <linearGradient id="eyeGradient" x1="6" y1="6" x2="42" y2="42">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#93c5fd" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="brand-content">
            <span className="brand-text">RetinaScan AI</span>
            <span className="brand-tagline">Smart Eye Health Detection</span>
          </div>
        </Link>
        
        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Home</span>
          </Link>
          <Link 
            to="/detect" 
            className={`nav-link nav-link-primary ${location.pathname === '/detect' ? 'active' : ''}`}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span>Detection</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
