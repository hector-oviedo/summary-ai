from dataclasses import dataclass

@dataclass
class Language:
    id: str
    label: str

@dataclass
class Category:
    id: str
    label: str

class DataStore:
    # Static data for languages and news categories
    languages = [
        {"id": "EN", "label": "English"},
        {"id": "ES", "label": "Español"},
        {"id": "FR", "label": "Français"},
    ]

    categories = [
        {"id": "tech", "label": "Tech Trends"},
        {"id": "crypto", "label": "Crypto Financial News"},
        {"id": "conflict", "label": "International Conflicts"},
    ]