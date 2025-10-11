# 🩺 Retinoblastoma Detection System

![Project Banner](https://github.com/Praveen-s-18/FinalRetino_Models/blob/main/docs/main.png)

---

## 🧠 Overview

This project is a **Retinoblastoma Detection System** that classifies retinal images as either **Normal** or **Retinoblastoma Detected**.  
It leverages a **deep learning model (EfficientNet-B0)** trained on retinal datasets and provides an **easy-to-use Streamlit web interface** for image upload and prediction.

> Retinoblastoma is a rare eye cancer that typically affects young children. Early detection is crucial to preserve vision and prevent severe complications.

---

## 🚀 Features

- 📤 Upload a retinal image through a web-based frontend.  
- 🧾 Predict whether the image shows signs of Retinoblastoma.  
- 🖼️ Display results clearly with visual feedback.  
- 🤖 Supports an **ensemble of pre-trained models** for higher accuracy.  
- ⚙️ CPU-friendly implementation for wider accessibility.

---

## 🧪 Demo Screenshots

### 🔹 Normal Retina Image
<img src="https://github.com/Praveen-s-18/FinalRetino_Models/blob/main/docs/normal.png" alt="Normal Retina" width="400"/>

### 🔸 Retinoblastoma Detected
<img src="https://github.com/Praveen-s-18/FinalRetino_Models/blob/main/docs/retinoblastoma.png" alt="Retinoblastoma Detected" width="400"/>

---

## 📊 Results

| Input Image | Model Prediction |
|--------------|------------------|
| ![Normal Retina](https://github.com/Praveen-s-18/FinalRetino_Models/blob/main/docs/normal.png) | **Normal** |
| ![Retinoblastoma Retina](https://github.com/Praveen-s-18/FinalRetino_Models/blob/main/docs/retinoblastoma.png) | **Retinoblastoma Detected** |

> The model achieves **high accuracy on test data** and runs efficiently even without GPU support.

---

## ⚙️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Praveen-s-18/FinalRetino_Models.git
   cd FinalRetino_Models
