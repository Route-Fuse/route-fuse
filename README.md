# RouteFuse

RouteFuse is a web-based carpool matching platform that helps users find people travelling along similar routes.

Users enter their source, destination, and preferred travel time, and the system identifies compatible travellers based on route similarity and other travel factors.

The project will use Machine Learning to improve route compatibility matching and make daily carpooling easier.

## Status

Work in progress.

## Project Structure

```text
RouteFuse/
├── frontend/   # React + Vite UI
├── backend/    # FastAPI service
└── ml/         # Future ML component notes
```

## Development Setup

### 1) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 2) Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs on: `http://127.0.0.1:8000`

### API Endpoints (phase 1)

- `GET /` → `{"message": "MergeMiles API is running"}`
- `GET /health` → `{"status": "ok"}`
- `POST /api/trips` → accepts `{ source, destination, departure_time }` and returns trip with temporary generated `id`
