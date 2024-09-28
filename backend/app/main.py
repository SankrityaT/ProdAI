from fastapi import FastAPI
from routers import fit_score
import uvicorn

app = FastAPI()

# Include the router for fit-score endpoint
app.include_router(fit_score.router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
