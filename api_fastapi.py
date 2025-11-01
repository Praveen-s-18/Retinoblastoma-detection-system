from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import io
from PIL import Image
import torch
import timm
import numpy as np
import torchvision.transforms as T
import os

# Configuration
DEVICE = torch.device("cpu")
MODEL_NAME = "efficientnet_b0"
IMG_SIZE = 256
MODEL_DIR = "models"
THRESHOLD = 0.5

app = FastAPI(title="Retinoblastoma API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Transforms
valid_tfms = T.Compose([
    T.Resize(IMG_SIZE, interpolation=T.InterpolationMode.BILINEAR),
    T.CenterCrop(IMG_SIZE),
    T.ToTensor(),
    T.Normalize(mean=(0.485,0.456,0.406), std=(0.229,0.224,0.225)),
])


def build_model():
    model = timm.create_model(MODEL_NAME, pretrained=False, num_classes=1)
    return model.to(DEVICE)


MODELS = []


def load_models():
    global MODELS
    if MODELS:
        return
    for fold in range(1, 6):
        path = os.path.join(MODEL_DIR, f"best_fold{fold}.pt")
        if os.path.exists(path):
            m = build_model()
            m.load_state_dict(torch.load(path, map_location=DEVICE))
            m.eval()
            MODELS.append(m)


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """Accepts an image file and returns JSON {class, confidence}.

    Uses ensemble average over available models in ./models/best_fold{1..5}.pt.
    """
    # read image
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    # load models lazily
    load_models()
    if not MODELS:
        raise HTTPException(status_code=500, detail=f"No model files found in {MODEL_DIR}/. Place your best_foldN.pt files there.")

    tensor = valid_tfms(image).unsqueeze(0).to(DEVICE)
    probs = []
    with torch.no_grad():
        for m in MODELS:
            logit = m(tensor)
            p = torch.sigmoid(logit).item()
            probs.append(p)

    avg_prob = float(np.mean(probs))
    label = "Retinoblastoma" if avg_prob >= THRESHOLD else "Normal"
    return {"class": label, "confidence": round(avg_prob, 4)}
