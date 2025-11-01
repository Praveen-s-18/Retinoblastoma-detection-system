import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ImageUploader from '../components/ImageUploader'
import ResultCard from '../components/ResultCard'

export default function DetectionPage() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const handleFileSelect = (f) => {
    setError(null)
    setResult(null)
    setFile(f)
    if (f) setPreview(URL.createObjectURL(f))
    else setPreview(null)
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const fd = new FormData()
      fd.append('file', file)

      const res = await axios.post('http://localhost:8001/predict', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setResult(res.data)
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.detail || 'Failed to get prediction. Ensure backend is running at localhost:8001 and CORS is enabled.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
  }

  return (
    <div className="detection-page-medical">
      <div className="detection-container-medical">
        {/* Progress Flow Steps */}
        <div className="progress-flow">
          <div className={`flow-step ${!loading && !result ? 'active' : 'completed'}`}>
            <div className="flow-number">①</div>
            <span className="flow-label">Upload Image</span>
          </div>
          <div className="flow-connector"></div>
          <div className={`flow-step ${loading ? 'active' : result ? 'completed' : ''}`}>
            <div className="flow-number">②</div>
            <span className="flow-label">AI Analyzing</span>
          </div>
          <div className="flow-connector"></div>
          <div className={`flow-step ${result ? 'active' : ''}`}>
            <div className="flow-number">③</div>
            <span className="flow-label">Result</span>
          </div>
        </div>

        <main className="detection-body-medical">
          {!result && !loading && (
            <div className="upload-card-medical-wide">
              <ImageUploader
                onFileSelect={handleFileSelect}
                preview={preview}
                onUpload={handleUpload}
                loading={loading}
              />
            </div>
          )}

          {loading && (
            <div className="loading-section-full">
              <div className="analysis-container">
                {/* AI Brain Processing Animation */}
                <div className="ai-brain-animation">
                  <div className="brain-core">
                    <div className="neural-network">
                      <div className="neural-node node-1"></div>
                      <div className="neural-node node-2"></div>
                      <div className="neural-node node-3"></div>
                      <div className="neural-node node-4"></div>
                      <div className="neural-node node-5"></div>
                      <div className="neural-node node-6"></div>
                      <div className="connection-line line-1"></div>
                      <div className="connection-line line-2"></div>
                      <div className="connection-line line-3"></div>
                      <div className="connection-line line-4"></div>
                    </div>
                  </div>
                  <div className="data-flow">
                    <div className="data-particle"></div>
                    <div className="data-particle"></div>
                    <div className="data-particle"></div>
                    <div className="data-particle"></div>
                  </div>
                </div>

                {/* Loading Text */}
                <h3 className="loading-title">🤖 AI Analysis in Progress</h3>
                <p className="loading-desc">Processing neural network patterns...</p>

                {/* Progress Bar */}
                <div className="analysis-progress">
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                  <div className="progress-stages">
                    <span className="stage active">Pre-processing</span>
                    <span className="stage active">Feature Extraction</span>
                    <span className="stage">Classification</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="error-section-full">
              <div className="error-icon-large">⚠️</div>
              <p className="error-text-large">{error}</p>
              <button onClick={handleReset} className="btn-retry">Try Again</button>
            </div>
          )}

          {result && (
            <div className="result-section-full">
              <ResultCard result={result} preview={preview} onNew={handleReset} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
