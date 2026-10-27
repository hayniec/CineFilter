import urllib.request
import re
import sys

slugs = [
    "155-the-dark-knight",
    "27205-inception",
    "157336-interstellar",
    "862-toy-story",
    "12-finding-nemo",
    "546554-knives-out",
    "105-back-to-the-future",
    "329-jurassic-park",
    "37165-the-truman-show",
    "137-groundhog-day",
    "2493-the-princess-bride",
    "313369-la-la-land",
    "447332-a-quiet-place",
    "324857-spider-man-into-the-spider-verse",
    "14160-up",
    "13-forrest-gump",
    "278-the-shawshank-redemption",
    "212778-chef",
    "680-pulp-fiction",
    "24428-the-avengers",
    "120-the-lord-of-the-rings-the-fellowship-of-the-ring",
    "11-star-wars",
    "603-the-matrix",
    "8587-the-lion-king",
    "238-the-godfather",
    "807-se7en",
    "10681-wall-e",
    "2062-ratatouille",
    "129-spirited-away",
    "235-stand-by-me",
    "496243-parasite",
    "19995-avatar",
    "438631-dune",
    "569094-spider-man-across-the-spider-verse",
    "872585-oppenheimer",
    "348-alien",
    "98-gladiator",
    "152601-her",
    "38-eternal-sunshine-of-the-spotless-mind",
    "9377-ferris-buellers-day-off",
    "9806-the-incredibles",
    "354912-coco",
    "597-titanic",
    "508442-soul",
    "286217-the-martian"
]

results = {}
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}

for slug in slugs:
    url = f"https://www.themoviedb.org/movie/{slug}"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Extract poster
            posters = re.findall(r'https://image\.tmdb\.org/t/p/w500(/[a-zA-Z0-9_-]+\.jpg)', html)
            backdrops = re.findall(r'https://image\.tmdb\.org/t/p/w1920_and_h800_multi_faces(/[a-zA-Z0-9_-]+\.jpg)', html)
            poster = posters[0] if posters else ""
            backdrop = backdrops[0] if backdrops else ""
            results[slug] = {"poster": poster, "backdrop": backdrop}
            print(f"OK: {slug} -> {poster}")
    except Exception as e:
        print(f"ERR: {slug} -> {e}")

print(f"Total fetched: {len(results)}")
import json
with open("tmdb_images.json", "w") as f:
    json.dump(results, f, indent=2)
