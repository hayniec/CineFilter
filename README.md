# CineFilter 🎬
### Smart Movie Discovery & Content Filter Engine

> A modern, high-aesthetic web application designed to help people find the perfect movie to watch based on their exact available time, genres, age ratings, actors, plot synopses, and **VidAngel / ClearPlay** content filtering compatibility.

---

## 📌 Answers to Your Core Questions

### 1. "I'm only finding 57 movies. Is it because this is just a test or what?"
- **The 57 movies were an initial offline starter seed** so that CineFilter could run immediately out of the box without network latency or initial setup.
- **CineFilter is now connected to the LIVE Database (800,000+ Movies) by default!**
  - Uses direct, active connections to **The Movie Database (TMDB)** and **OMDb (IMDb)**.
  - You can search virtually **any movie ever released** across all decades.
  - You can toggle anytime between **"Live Database (800k+)"** and **"Curated Classics"** using the switch in the top header.
  - Includes a **"Load More Movies"** button to page through endless titles.

### 2. "When I type in my description, nothing happens."
- **Why it happened previously:** The initial prototype only searched the 57 local synopses as you typed. If your description didn't match the exact words in those 57 short summaries, results dropped to 0 with no visible action.
- **What we built to fix this:**
  1. **Dedicated Action Button:** An interactive **`[ ✨ Find Movie from Plot ]`** button directly beneath the description box (and pressing **Enter** in the box immediately executes the search).
  2. **Live Multi-Engine Plot Resolver:**
     - Cleans conversational stopwords.
     - Performs **Wikipedia full-text search** to resolve complex conversational plot premises (e.g., *"man trapped in an airport and cannot leave"* ➔ *The Terminal*, *"chef loses job and buys a food truck with his son"* ➔ *Chef*).
     - Queries **TMDB conceptual keywords** (`/search/keyword` and `/discover/movie?with_keywords=...`) for settings, themes, and objects.
     - Scans plot overviews, computes semantic overlap percentage, and displays a glowing badge (e.g. `✨ 96% Plot Match`).
     - Highlights matching words in the synopsis using `<mark>` tags.
  3. **Visual Feedback:** A live progress spinner (`Analyzing plot across 800,000+ movies...`), followed by an active plot banner and smooth scroll directly to the matching movies.

---

## 🛡️ VidAngel & ClearPlay Content Filtering Integration

**VidAngel** and **ClearPlay** are family-focused filtering services that mute profanity and skip graphic violence, nudity, or disturbing scenes across streaming platforms (Apple TV+, Netflix, Amazon Prime).

Since VidAngel and ClearPlay do not offer public developer APIs, CineFilter bridges this gap with:
1. **Filter Compatibility Flags:** Identifying titles supported on VidAngel and ClearPlay.
2. **Family Content Sensitivity Meters:** Detailed breakdown of levels (**None**, **Mild**, **Moderate**, **Severe**) across:
   - 🗣️ **Profanity / Language**
   - ⚔️ **Violence & Gore**
   - 🔞 **Sexuality & Nudity**
   - 🍷 **Substances / Alcohol / Drugs**
3. **1-Click Deep Links:** Direct buttons from each movie to:
   - Search on **VidAngel** (`https://www.vidangel.com/search?q=...`)
   - Search on **ClearPlay** (`https://www.clearplay.com/search?q=...`)
   - View the detailed **IMDb Parents Guide** (`https://www.imdb.com/title/{imdbId}/parentalguide`)
   - View the movie on **IMDb** (`https://www.imdb.com/title/{imdbId}/`)
   - Watch the official **YouTube Trailer**

---

## ✨ Complete Feature Summary

- **Live Database (800k+) & Curated Switcher:** Browse the entire live movie universe or switch to hand-picked classics.
- **Plot & Story Description Matcher:** Type what happens in any movie and click `Find Movie from Plot` to let the semantic engine locate it.
- **Genres Multi-Select Checkboxes:** Filter by Action, Adventure, Animation, Comedy, Crime, Drama, Family, Fantasy, Horror, Sci-Fi, Thriller, Romance, and more.
- **Watch Time / Runtime Limit:** Quick chips (`< 90 min`, `< 105 min`, `< 2 hrs`, `Any`) and a precision slider to ensure a movie finishes before bedtime.
- **Preferred Age Rating (MPA):** Quick toggles for **G**, **PG**, **PG-13**, and **R**.
- **Actor & Director Search:** Freeform search plus popular quick-select tags (Tom Hanks, Leonardo DiCaprio, Emma Stone, Morgan Freeman, Harrison Ford, etc.).
- **Year & Era Selector:** Filter by decade (2020s, 2010s, 2000s, 90s, 80s, Classics) or exact year.
- **Quick Presets:** 1-click configurations like *Family Night*, *Quick Watch*, *Critically Acclaimed*, and *Sci-Fi Blockbusters*.
- **"Surprise Me":** Randomized spotlight selector to solve decision fatigue.
- **Load More Pagination:** Effortlessly browse page after page of live movies.

---

## 🚀 Running the App Locally

To start the local web server:

```bash
cd /Users/eric/.gemini/antigravity-ide/scratch/cinefilter
python3 -m http.server 3000
```

Open your browser to:
**[http://localhost:3000](http://localhost:3000)**
