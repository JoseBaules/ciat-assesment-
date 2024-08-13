from dataclasses import dataclass
from typing import List, Optional

@dataclass
class Origin:
    name: str
    url: str

@dataclass
class Location:
    name: str
    url: str

@dataclass
class Character:
    id: int
    name: str
    status: str
    species: str
    type: str
    gender: str
    origin: Origin
    location: Location
    image: str
    episode: List[str]
    url: str
    created: str
@dataclass
class Info:
    count: int
    pages: int
    next: str
    prev: Optional[str]  # Change here

@dataclass
class Response:
    info: Info
    results: List[Character]