import React from 'react'

export default function ResultCard({ result, preview, onNew }) {
  const isPathology = String(result?.class || '').toLowerCase() === 'retinoblastoma'
  
  return (
    <div className={`result-card-simple ${isPathology ? 'result-pathology' : 'result-normal'}`}>
      <div className="result-content-simple">
        {/* Image */}
        <div className="result-image-container">
          <div className="result-image-wrapper">
            {preview ? <img src={preview} alt="Retinal scan" /> : <div className="muted">No image</div>}
          </div>
        </div>

        {/* Result Info */}
        <div className="result-info-container">
          <div className="result-status-badge">
            {isPathology ? (
              <>
                <span className="status-icon">⚠️</span>
                <span className="status-text">Retinoblastoma Detected</span>
              </>
            ) : (
              <>
                <span className="status-icon">✓</span>
                <span className="status-text">Normal</span>
              </>
            )}
          </div>

          <p className="result-message">
            {isPathology 
              ? 'Abnormal patterns detected in the retinal scan. Please consult an ophthalmologist immediately.'
              : 'No abnormalities detected. The retinal scan appears normal.'}
          </p>

          <div className="result-actions-simple">
            <button onClick={onNew} className="btn-action btn-primary-action">
              Analyze Another Image
            </button>
          </div>

          <div className="result-note">
            <strong>Note:</strong> This is an AI screening tool. Always consult a qualified healthcare professional for diagnosis.
          </div>
        </div>
      </div>
    </div>
  )
}
