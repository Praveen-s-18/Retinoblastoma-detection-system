import React from 'react'
import { Link } from 'react-router-dom'
import Eye3D from '../components/Eye3D'

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            AI-Powered Retinoblastoma Detection
          </h1>
          <p className="hero-subtitle">
            Advanced deep learning technology for early detection of retinoblastoma—the most common eye cancer in children.
          </p>
          <Link to="/detect" className="cta-button">
            Start Detection →
          </Link>
        </div>
        <div className="hero-image">
          <Eye3D />
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2 className="section-title">What is Retinoblastoma?</h2>
        <div className="about-grid">
          <div className="about-card">
            <div className="card-icon">📊</div>
            <h3>Rare but Serious</h3>
            <p>Retinoblastoma is a rare eye cancer that primarily affects young children, typically under the age of 5. Early detection is critical for successful treatment.</p>
          </div>
          <div className="about-card">
            <div className="card-icon">👁️</div>
            <h3>Common Signs</h3>
            <p>White pupil (leukocoria), crossed eyes, eye redness, swelling, and vision problems are common symptoms that require immediate medical attention.</p>
          </div>
          <div className="about-card">
            <div className="card-icon">⚕️</div>
            <h3>High Survival Rate</h3>
            <p>When detected early, retinoblastoma has a survival rate of over 95%. Our AI system aids in rapid screening and early diagnosis.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How Our AI Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Upload Image</h3>
            <p>Upload a clear retinal fundus image through our secure interface</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Analysis</h3>
            <p>EfficientNet-B0 ensemble model analyzes image features and patterns</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Results</h3>
            <p>Receive instant classification with confidence score in seconds</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <h4>Fast & Accurate</h4>
            <p>Results in seconds with high accuracy using ensemble deep learning</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <h4>Secure & Private</h4>
            <p>Images processed locally, no data stored on servers</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <h4>Responsive Design</h4>
            <p>Works seamlessly on desktop, tablet, and mobile devices</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <h4>Ensemble Model</h4>
            <p>5-fold cross-validation ensemble for robust predictions</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Upload a retinal image and get instant AI-powered analysis</p>
          <Link to="/detect" className="cta-button-secondary">
            Try Detection Now
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="disclaimer">
        <p><strong>⚠️ Medical Disclaimer:</strong> This tool is for research and educational purposes only. It is not a substitute for professional medical diagnosis. Always consult with qualified healthcare professionals for medical advice.</p>
      </section>
    </div>
  )
}
