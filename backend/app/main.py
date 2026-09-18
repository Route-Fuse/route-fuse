from itertools import count

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="MergeMiles API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TripCreate(BaseModel):
    source: str
    destination: str
    departure_time: str


class Trip(TripCreate):
    id: int


trip_id_counter = count(start=1)
trips: list[Trip] = []


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "MergeMiles API is running"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/trips", response_model=Trip)
def create_trip(payload: TripCreate) -> Trip:
    trip = Trip(id=next(trip_id_counter), **payload.model_dump())
    trips.append(trip)
    return trip
