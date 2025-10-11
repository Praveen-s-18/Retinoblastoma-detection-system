import streamlit as st
import torch
import timm
import numpy as np
from PIL import Image
import torchvision.transforms as T
import os

# ========= CONFIG =========
DEVICE = torch.device("cpu")
MODEL_NAME = "efficientnet_b0"
IMG_SIZE = 256
MODEL_DIR = "models"   # relative path
THRESHOLD = 0.5

# ========= TRANSFORMS =========
valid_tfms = T.Compose([
    T.Resize(IMG_SIZE, interpolation=T.InterpolationMode.BILINEAR),
    T.CenterCrop(IMG_SIZE),
    T.ToTensor(),
    T.Normalize(mean=(0.485,0.456,0.406), std=(0.229,0.224,0.225)),
])

# ========= MODEL BUILDER =========
@st.cache_resource
def build_model():
    model = timm.create_model(MODEL_NAME, pretrained=False, num_classes=1)
    return model.to(DEVICE)

# ========= LOAD ALL MODELS =========
@st.cache_resource
def load_all_models(model_dir):
    models = []
    for fold in range(1, 6):
        path = os.path.join(model_dir, f"best_fold{fold}.pt")
        if os.path.exists(path):
            m = build_model()
            m.load_state_dict(torch.load(path, map_location=DEVICE))
            m.eval()
            models.append(m)
        else:
            st.warning(f"⚠️ Model file not found: {path}")
    return models

# ========= PREDICT FUNCTION =========
def predict_image(image, models, thr=THRESHOLD):
    img = image.convert("RGB")
    tensor = valid_tfms(img).unsqueeze(0).to(DEVICE)

    probs = []
    with torch.no_grad():
        for m in models:
            logit = m(tensor)
            p = torch.sigmoid(logit).item()
            probs.append(p)

    avg_prob = float(np.mean(probs))
    pred = int(avg_prob >= thr)
    return "🩺 Retinoblastoma Detected" if pred == 1 else "✅ Normal"

# ========= STREAMLIT UI =========
st.set_page_config(page_title="Retinoblastoma Detection", page_icon="🧠", layout="centered")

st.title("🧠 Retinoblastoma Detection System")
st.write("Upload a retinal image to check for Retinoblastoma.")

uploaded_file = st.file_uploader("📤 Upload Retinal Image", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Image", use_container_width=True)

    st.write("---")
    st.write("🔍 **Analyzing image...**")

    models = load_all_models(MODEL_DIR)
    if not models:
        st.error("No models loaded. Please ensure the model files exist in the `models/` folder.")
    else:
        result = predict_image(image, models)
        st.write("---")
        st.markdown(
            f"<h2 style='text-align:center; color:#4CAF50;'>{result}</h2>",
            unsafe_allow_html=True
        )
