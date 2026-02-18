from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pathlib import Path

app = FastAPI()

LANDING_PAGE = Path("landing.html").read_text()


@app.get("/", response_class=HTMLResponse)
async def root():
    return LANDING_PAGE


@app.get("/health")
async def health():
    return {"status": "healthy"}
