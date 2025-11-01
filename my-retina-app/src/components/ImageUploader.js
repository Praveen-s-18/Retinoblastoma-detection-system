import React, { useRef, useState, useCallback } from 'react'

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

export default function ImageUploader({ onFileSelect, preview, onUpload, loading }) {
  const inputRef = useRef()
  const [isDrag, setIsDrag] = useState(false)
  const [localError, setLocalError] = useState(null)

  const validateAndSend = useCallback((file) => {
    setLocalError(null)
    if (!file) {
      onFileSelect(null)
      return
    }
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setLocalError('Only PNG / JPG images are allowed')
      onFileSelect(null)
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setLocalError('Image is too large (max 10MB)')
      onFileSelect(null)
      return
    }
    onFileSelect(file)
  }, [onFileSelect])

  const onInputChange = (e) => {
    const f = e.target.files && e.target.files[0]
    validateAndSend(f)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setIsDrag(false)
    const f = e.dataTransfer.files && e.dataTransfer.files[0]
    validateAndSend(f)
  }

  const onDragOver = (e) => {
    e.preventDefault()
    setIsDrag(true)
  }

  const onDragLeave = () => setIsDrag(false)

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`upload-zone ${isDrag ? 'upload-zone--active' : ''}`}>

        {!preview ? (
          <div className="upload-inner">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="url(#uploadGradient)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 5 17 10" />
              <line x1="12" y1="5" x2="12" y2="19" />
              <defs>
                <linearGradient id="uploadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
            <p className="upload-prompt-medical">Drag & drop your retinal image here</p>
            <p className="upload-or-medical">or</p>
            <button type="button" onClick={() => inputRef.current.click()} className="btn-medical-upload">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Choose Image
            </button>
            {localError && <div className="error-msg-medical mt-2">{localError}</div>}
          </div>
        ) : (
          <div className="preview-container-medical">
            <div className="preview-image-wrapper-medical">
              <img src={preview} alt="Uploaded retinal scan" className="preview-image-medical" />
              <div className="preview-badge-medical">✓ Ready</div>
            </div>
            <div className="preview-info-medical">
              <p className="preview-status-medical">Image uploaded successfully</p>
              <p className="preview-description-medical">High-quality retinal fundus image detected</p>
            </div>
            <div className="preview-actions-medical">
              <button type="button" onClick={onUpload} disabled={loading} className="btn-analyze-medical">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
                {loading ? 'Analyzing...' : 'Start AI Analysis'}
              </button>
              <button type="button" onClick={() => inputRef.current.click()} className="btn btn-outline mt-2">
                📤 Upload Different Image
              </button>
            </div>
          </div>
        )}

        <input ref={inputRef} type="file" accept="image/png,image/jpeg" className="hidden-input" onChange={onInputChange} />
      </div>

      <div className="tip">Tip: Good lighting and centered retina improves results.</div>
    </div>
  )
}
