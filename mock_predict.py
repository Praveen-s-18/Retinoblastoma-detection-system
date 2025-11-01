from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI(title="Retina Mock API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Simple deterministic-ish mock: base confidence on file size
    contents = await file.read()
    size = max(1, len(contents))
    # map to 0.0 - 1.0
    conf = (size % 100) / 100.0
    label = "Retinoblastoma" if conf > 0.5 else "Normal"
    return {"class": label, "confidence": round(conf, 4)}
