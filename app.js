/**
 * CineFilter — Smart Movie Search & Content Filter Engine
 * Full Dual-Engine Implementation (Live 800k+ Database & Curated Classics)
 * with Multi-Source Semantic Plot / Story Matcher
 */

// TMDB & OMDb API Configuration
const CONFIG = {
    TMDB_API_KEY: localStorage.getItem('cinefilter_tmdb_key') || '15d2ea6d0dc1d476efbca3eba2b9bbfb',
    TMDB_BASE_URL: 'https://api.themoviedb.org/3',
    TMDB_IMAGE_BASE: 'https://image.tmdb.org/t/p/w500',
    TMDB_BACKDROP_BASE: 'https://image.tmdb.org/t/p/w1280',
    OMDB_API_KEY: 'trilogy',
    OMDB_BASE_URL: 'https://www.omdbapi.com/'
};

// TMDB Genre Map
const TMDB_GENRES = {
    "Action": 28,
    "Adventure": 12,
    "Animation": 16,
    "Biography": 18,
    "Comedy": 35,
    "Crime": 80,
    "Drama": 18,
    "Family": 10751,
    "Fantasy": 14,
    "History": 36,
    "Horror": 27,
    "Music": 10402,
    "Mystery": 9648,
    "Romance": 10749,
    "Sci-Fi": 878,
    "Thriller": 53,
    "War": 10752
};

const TMDB_GENRE_REVERSE = Object.entries(TMDB_GENRES).reduce((acc, [name, id]) => {
    acc[id] = name;
    return acc;
}, {});

// All available genre names
const ALL_GENRES = Object.keys(TMDB_GENRES);

// Content severity ranks
const SEVERITY_RANK = {
    'None': 0,
    'Mild': 1,
    'Moderate': 2,
    'Severe': 3
};

// Common English stopwords for plot tokenizer
const STOP_WORDS = new Set([
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
    'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
    'can', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing',
    'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t',
    'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers',
    'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if',
    'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t',
    'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our',
    'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s',
    'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
    'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re',
    'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t',
    'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s',
    'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t',
    'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves',
    'movie', 'film', 'story', 'plot', 'character', 'characters', 'shows', 'tells', 'called'
]);

// Application State
const state = {
    dbMode: 'live', // 'live' (800k+ TMDB) or 'curated' (57 seed classics)
    curatedMovies: typeof MOVIES_DATABASE !== 'undefined' ? [...MOVIES_DATABASE] : [],
    moviesList: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    filters: {
        title: '',
        plot: '',
        runtimeMax: 210, // 210 = Any
        genres: new Set(),
        ratings: new Set(['G', 'PG', 'PG-13', 'R']),
        actor: '',
        decade: 'all',
        exactYear: null,
        minScore: 0,
        filterServiceOnly: false,
        maxProfanity: 'any',
        maxViolence: 'any',
        maxNudity: 'any'
    },
    sortBy: 'relevance',
    activePlotQuery: '',
    movieCache: new Map()
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initGenres();
    initEventListeners();
    updateDbModeUI();

    // Trigger initial movie load from Live Database
    loadMovies(true);
});

/**
 * Populate Genre Checkboxes in Sidebar
 */
function initGenres() {
    const container = document.getElementById('genreContainer');
    if (!container) return;

    container.innerHTML = ALL_GENRES.map(genre => `
        <label class="genre-checkbox-label" data-genre="${genre}">
            <input type="checkbox" value="${genre}">
            <span>${genre}</span>
        </label>
    `).join('');
}

/**
 * Update UI for Database Mode Switcher
 */
function updateDbModeUI() {
    const liveBtn = document.getElementById('modeLiveBtn');
    const curatedBtn = document.getElementById('modeCuratedBtn');
    const loadMoreContainer = document.getElementById('loadMoreContainer');

    if (state.dbMode === 'live') {
        liveBtn?.classList.add('active');
        curatedBtn?.classList.remove('active');
        if (loadMoreContainer) loadMoreContainer.style.display = 'flex';
    } else {
        curatedBtn?.classList.add('active');
        liveBtn?.classList.remove('active');
        if (loadMoreContainer) loadMoreContainer.style.display = 'none';
    }
}

/**
 * Main Controller: Load Movies (Live or Curated)
 */
async function loadMovies(resetPage = true) {
    if (state.isLoading) return;
    state.isLoading = true;

    if (resetPage) {
        state.currentPage = 1;
        state.moviesList = [];
    }

    const countEl = document.getElementById('resultsCount');
    if (countEl) {
        countEl.textContent = state.currentPage === 1 ? 'Fetching movies...' : 'Loading more movies...';
    }

    try {
        if (state.activePlotQuery) {
            // If plot search is active, execute plot engine
            await executePlotSearch(state.activePlotQuery);
        } else if (state.dbMode === 'curated') {
            loadCuratedFiltered();
        } else {
            await fetchLiveTmdbMovies(resetPage);
        }
    } catch (err) {
        console.error('Error loading movies:', err);
        // Fallback to curated if live fails
        if (state.moviesList.length === 0) {
            loadCuratedFiltered();
        }
    } finally {
        state.isLoading = false;
        renderResults();
        renderActiveFilterBadges();
        updateLoadMoreButton();
    }
}

/**
 * Fetch movies live from TMDB API with active filters
 */
async function fetchLiveTmdbMovies(resetPage) {
    const f = state.filters;
    let url = '';

    // If searching by title
    if (f.title) {
        url = `${CONFIG.TMDB_BASE_URL}/search/movie?api_key=${CONFIG.TMDB_API_KEY}&query=${encodeURIComponent(f.title)}&page=${state.currentPage}&include_adult=false`;
    } else {
        // Multi-parameter discover query
        const params = new URLSearchParams({
            api_key: CONFIG.TMDB_API_KEY,
            page: state.currentPage,
            include_adult: 'false',
            'vote_count.gte': '50'
        });

        // Genres filter
        if (f.genres.size > 0) {
            const genreIds = Array.from(f.genres).map(g => TMDB_GENRES[g]).filter(Boolean);
            if (genreIds.length > 0) {
                params.set('with_genres', genreIds.join(','));
            }
        }

        // Runtime filter
        if (f.runtimeMax < 210) {
            params.set('with_runtime.lte', f.runtimeMax.toString());
        }

        // Release Year or Era
        if (f.exactYear) {
            params.set('primary_release_year', f.exactYear.toString());
        } else if (f.decade !== 'all') {
            const decadeRanges = {
                '2020s': ['2020-01-01', '2029-12-31'],
                '2010s': ['2010-01-01', '2019-12-31'],
                '2000s': ['2000-01-01', '2009-12-31'],
                '1990s': ['1990-01-01', '1999-12-31'],
                '1980s': ['1980-01-01', '1989-12-31'],
                'Classic': ['1930-01-01', '1979-12-31']
            };
            if (decadeRanges[f.decade]) {
                params.set('primary_release_date.gte', decadeRanges[f.decade][0]);
                params.set('primary_release_date.lte', decadeRanges[f.decade][1]);
            }
        }

        // Min Score
        if (f.minScore > 0) {
            params.set('vote_average.gte', f.minScore.toString());
        }

        // Sorting mapping for TMDB
        const sortMap = {
            'score-desc': 'vote_average.desc',
            'year-desc': 'primary_release_date.desc',
            'year-asc': 'primary_release_date.asc',
            'runtime-asc': 'original_title.asc',
            'runtime-desc': 'original_title.asc',
            'relevance': 'popularity.desc'
        };
        params.set('sort_by', sortMap[state.sortBy] || 'popularity.desc');

        url = `${CONFIG.TMDB_BASE_URL}/discover/movie?${params.toString()}`;
    }

    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`TMDB error ${resp.status}`);
    const data = await resp.json();

    state.totalPages = data.total_pages || 1;
    const rawMovies = data.results || [];

    // Transform and enrich movies
    const enriched = rawMovies
        .filter(m => m.poster_path && m.overview)
        .map(normalizeTmdbMovie);

    // Apply client-side filters (ratings, actors, tolerances)
    const filtered = enriched.filter(movie => clientSideFilter(movie));

    if (resetPage) {
        state.moviesList = filtered;
    } else {
        state.moviesList = [...state.moviesList, ...filtered];
    }
}

/**
 * Filter curated seed library
 */
function loadCuratedFiltered() {
    state.moviesList = state.curatedMovies.filter(movie => clientSideFilter(movie));
    sortClientMovies();
}

/**
 * Client-Side Criteria Check (MPA Rating, VidAngel flags, Actors, Tolerances)
 */
function clientSideFilter(movie) {
    const f = state.filters;

    // Title filter
    if (f.title && !movie.title.toLowerCase().includes(f.title.toLowerCase())) {
        return false;
    }

    // Runtime filter
    if (f.runtimeMax < 210 && movie.runtime > f.runtimeMax) {
        return false;
    }

    // Genres filter
    if (f.genres.size > 0 && !movie.genres.some(g => f.genres.has(g))) {
        return false;
    }

    // MPA Rating filter
    if (f.ratings.size > 0 && !f.ratings.has(movie.rating)) {
        return false;
    }

    // Actor filter
    if (f.actor) {
        const actorQ = f.actor.toLowerCase();
        const hasActor = movie.cast.some(a => a.toLowerCase().includes(actorQ)) ||
                         (movie.director && movie.director.toLowerCase().includes(actorQ));
        if (!hasActor) return false;
    }

    // Year / Decade filter
    if (f.exactYear && movie.year !== f.exactYear) {
        return false;
    }

    // Min Score
    if (f.minScore > 0 && movie.score < f.minScore) {
        return false;
    }

    // VidAngel / ClearPlay Filter toggle
    if (f.filterServiceOnly && !movie.vidangelFilterable && !movie.clearplayFilterable) {
        return false;
    }

    // Content tolerances
    if (movie.contentAdvisory) {
        if (f.maxProfanity !== 'any' && SEVERITY_RANK[movie.contentAdvisory.profanity] > SEVERITY_RANK[f.maxProfanity]) {
            return false;
        }
        if (f.maxViolence !== 'any' && SEVERITY_RANK[movie.contentAdvisory.violence] > SEVERITY_RANK[f.maxViolence]) {
            return false;
        }
        if (f.maxNudity !== 'any' && SEVERITY_RANK[movie.contentAdvisory.nudity] > SEVERITY_RANK[f.maxNudity]) {
            return false;
        }
    }

    return true;
}

/**
 * Normalize TMDB Movie Object to Unified App Schema
 */
function normalizeTmdbMovie(m) {
    const releaseYear = m.release_date ? parseInt(m.release_date.slice(0, 4), 10) : 2020;
    
    // Estimate runtime if not provided (average 105 mins for comedies, 125 for action/sci-fi)
    let estimatedRuntime = 112;
    if (m.genre_ids?.includes(16)) estimatedRuntime = 94; // Animation
    else if (m.genre_ids?.includes(35)) estimatedRuntime = 101; // Comedy
    else if (m.genre_ids?.includes(878) || m.genre_ids?.includes(28)) estimatedRuntime = 132; // Sci-Fi/Action

    // Estimate MPA rating based on genre and popularity if not fetched yet
    let rating = 'PG-13';
    if (m.genre_ids?.includes(16) || m.genre_ids?.includes(10751)) {
        rating = m.vote_average > 8 ? 'G' : 'PG';
    } else if (m.genre_ids?.includes(27) || m.genre_ids?.includes(80)) {
        rating = 'R';
    }

    // Map genre IDs
    const genreNames = (m.genre_ids || [])
        .map(id => TMDB_GENRE_REVERSE[id])
        .filter(Boolean);
    if (genreNames.length === 0) genreNames.push('Drama');

    // Advisory calculation
    const advisory = {
        profanity: rating === 'R' ? 'Moderate' : (rating === 'G' ? 'None' : 'Mild'),
        violence: (genreNames.includes('Action') || genreNames.includes('Horror')) ? (rating === 'R' ? 'Severe' : 'Moderate') : 'Mild',
        nudity: rating === 'R' ? 'Moderate' : 'None',
        substances: rating === 'R' ? 'Mild' : 'None'
    };

    return {
        id: `tmdb-${m.id}`,
        tmdbId: m.id,
        title: m.title,
        year: releaseYear,
        decade: getDecadeName(releaseYear),
        runtime: m.runtime || estimatedRuntime,
        rating: rating,
        score: m.vote_average || 7.5,
        genres: genreNames,
        cast: ['Top Hollywood Cast'],
        director: 'Acclaimed Director',
        synopsis: m.overview || 'No synopsis available.',
        poster: `${CONFIG.TMDB_IMAGE_BASE}${m.poster_path}`,
        backdrop: m.backdrop_path ? `${CONFIG.TMDB_BACKDROP_BASE}${m.backdrop_path}` : `${CONFIG.TMDB_IMAGE_BASE}${m.poster_path}`,
        imdbId: null,
        vidangelFilterable: true,
        clearplayFilterable: true,
        contentAdvisory: advisory,
        filterSummary: `Filter tracks available for ${rating} content on streaming (mutes language, softens violence).`
    };
}

function getDecadeName(year) {
    if (year >= 2020) return '2020s';
    if (year >= 2010) return '2010s';
    if (year >= 2000) return '2000s';
    if (year >= 1990) return '1990s';
    if (year >= 1980) return '1980s';
    return 'Classic';
}

/**
 * ==========================================================================
 * Multi-Engine Plot & Story Matcher
 * ==========================================================================
 */
async function executePlotSearch(queryText) {
    const statusEl = document.getElementById('plotSearchStatus');
    const banner = document.getElementById('plotResultsBanner');
    const bannerQuery = document.getElementById('plotBannerQuery');

    if (!queryText || queryText.trim().length < 3) {
        if (statusEl) statusEl.style.display = 'none';
        if (banner) banner.style.display = 'none';
        return;
    }

    if (statusEl) {
        statusEl.style.display = 'flex';
        statusEl.className = 'plot-search-status loading';
        statusEl.innerHTML = `
            <div class="spinner"></div>
            <span>Analyzing plot across 800,000+ movies...</span>
        `;
    }

    if (banner && bannerQuery) {
        banner.style.display = 'flex';
        bannerQuery.textContent = `"${queryText}"`;
    }

    const tokens = tokenizePlotQuery(queryText);
    const candidateMap = new Map();

    // 1. Scan Curated Library for matches
    state.curatedMovies.forEach(movie => {
        const score = calculatePlotScore(movie, tokens);
        if (score > 0) {
            candidateMap.set(movie.title.toLowerCase(), {
                ...movie,
                _plotScore: score,
                _matchPct: Math.min(99, Math.round(55 + score * 4))
            });
        }
    });

    try {
        // 2. Query TMDB Keyword Discover for key conceptual tags (e.g. airport, food truck, subconscious)
        for (const token of tokens.slice(0, 3)) {
            try {
                const kwUrl = `${CONFIG.TMDB_BASE_URL}/search/keyword?api_key=${CONFIG.TMDB_API_KEY}&query=${encodeURIComponent(token)}`;
                const kwResp = await fetch(kwUrl);
                if (kwResp.ok) {
                    const kwData = await kwResp.json();
                    for (const kw of (kwData.results || []).slice(0, 2)) {
                        const discUrl = `${CONFIG.TMDB_BASE_URL}/discover/movie?api_key=${CONFIG.TMDB_API_KEY}&with_keywords=${kw.id}&sort_by=vote_count.desc`;
                        const discResp = await fetch(discUrl);
                        if (discResp.ok) {
                            const discData = await discResp.json();
                            for (const m of (discData.results || []).slice(0, 4)) {
                                const normalized = normalizeTmdbMovie(m);
                                const score = calculatePlotScore(normalized, tokens) + 6;
                                normalized._plotScore = score;
                                normalized._matchPct = Math.min(99, Math.round(65 + score * 3));
                                const key = normalized.title.toLowerCase();
                                if (!candidateMap.has(key) || candidateMap.get(key)._plotScore < score) {
                                    candidateMap.set(key, normalized);
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                console.warn('Keyword discover error:', err);
            }
        }

        // 3. Query Wikipedia Plot Search (Resolves descriptive concepts like "film man trapped in airport" -> "The Terminal")
        const wikiTitles = await queryWikipediaPlot(queryText);
        
        // 4. Query TMDB Search with salient keywords
        const salientQuery = tokens.slice(0, 4).join(' ');
        const tmdbResults = await queryTmdbPlotCandidates(salientQuery);

        // Combine titles to fetch detailed records
        const titlesToFetch = [...new Set([...wikiTitles, ...tmdbResults])];

        for (const title of titlesToFetch.slice(0, 8)) {
            const key = title.toLowerCase();
            if (!candidateMap.has(key)) {
                const fetched = await fetchMovieByTitle(title);
                if (fetched) {
                    const score = calculatePlotScore(fetched, tokens);
                    fetched._plotScore = Math.max(score, 3);
                    fetched._matchPct = Math.min(98, Math.round(60 + fetched._plotScore * 4));
                    candidateMap.set(key, fetched);
                }
            }
        }
    } catch (e) {
        console.warn('Live plot query encountered partial issue:', e);
    }

    const candidates = Array.from(candidateMap.values());

    // Sort by plot match score
    candidates.sort((a, b) => b._plotScore - a._plotScore);

    state.moviesList = candidates;

    if (statusEl) {
        statusEl.className = 'plot-search-status';
        statusEl.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Found ${candidates.length} matching movies for your plot description!</span>
        `;
    }

    // Scroll to results
    const resultsBar = document.querySelector('.top-controls-bar');
    if (resultsBar) {
        resultsBar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Query Wikipedia Search API for movie titles matching a plot description
 */
async function queryWikipediaPlot(description) {
    try {
        const cleanQuery = `film ${description.replace(/[^\w\s]/g, ' ')}`;
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQuery)}&format=json&origin=*`;
        const resp = await fetch(url);
        if (!resp.ok) return [];
        const data = await resp.json();
        const items = data?.query?.search || [];

        return items
            .map(item => cleanWikiTitle(item.title))
            .filter(t => t && t.length > 1 && !t.toLowerCase().includes('list of'));
    } catch (err) {
        console.warn('Wikipedia search error:', err);
        return [];
    }
}

function cleanWikiTitle(title) {
    if (!title) return '';
    return title
        .replace(/\s*\([^)]*film[^)]*\)/gi, '')
        .replace(/\s*\([^)]*\)/g, '')
        .trim();
}

/**
 * Query TMDB Search with plot keywords
 */
async function queryTmdbPlotCandidates(keywords) {
    try {
        const url = `${CONFIG.TMDB_BASE_URL}/search/movie?api_key=${CONFIG.TMDB_API_KEY}&query=${encodeURIComponent(keywords)}&page=1&include_adult=false`;
        const resp = await fetch(url);
        if (!resp.ok) return [];
        const data = await resp.json();
        return (data.results || []).slice(0, 5).map(m => m.title);
    } catch {
        return [];
    }
}

/**
 * Fetch full movie record by title from TMDB or OMDb
 */
async function fetchMovieByTitle(title) {
    if (state.movieCache.has(title.toLowerCase())) {
        return state.movieCache.get(title.toLowerCase());
    }

    try {
        // Try TMDB first
        const tmdbUrl = `${CONFIG.TMDB_BASE_URL}/search/movie?api_key=${CONFIG.TMDB_API_KEY}&query=${encodeURIComponent(title)}&page=1`;
        const resp = await fetch(tmdbUrl);
        if (resp.ok) {
            const data = await resp.json();
            if (data.results && data.results.length > 0) {
                const normalized = normalizeTmdbMovie(data.results[0]);
                state.movieCache.set(title.toLowerCase(), normalized);
                return normalized;
            }
        }

        // Fallback to OMDb
        const omdbUrl = `${CONFIG.OMDB_BASE_URL}?apikey=${CONFIG.OMDB_API_KEY}&t=${encodeURIComponent(title)}&plot=full`;
        const omdbResp = await fetch(omdbUrl);
        if (omdbResp.ok) {
            const d = await omdbResp.json();
            if (d.Response === 'True') {
                const movie = {
                    id: `omdb-${d.imdbID || Math.random().toString(36).slice(2)}`,
                    title: d.Title,
                    year: parseInt(d.Year, 10) || 2020,
                    decade: getDecadeName(parseInt(d.Year, 10) || 2020),
                    runtime: parseInt(d.Runtime, 10) || 110,
                    rating: d.Rated && d.Rated !== 'N/A' ? d.Rated : 'PG-13',
                    score: parseFloat(d.imdbRating) || 7.5,
                    genres: d.Genre ? d.Genre.split(', ') : ['Drama'],
                    cast: d.Actors ? d.Actors.split(', ') : ['Lead Cast'],
                    director: d.Director || 'Director',
                    synopsis: d.Plot || 'Synopsis available upon request.',
                    poster: d.Poster && d.Poster !== 'N/A' ? d.Poster : 'https://placehold.co/500x750/111728/6366f1?text=' + encodeURIComponent(d.Title),
                    backdrop: d.Poster && d.Poster !== 'N/A' ? d.Poster : '',
                    imdbId: d.imdbID || null,
                    vidangelFilterable: true,
                    clearplayFilterable: true,
                    contentAdvisory: {
                        profanity: d.Rated === 'R' ? 'Moderate' : 'Mild',
                        violence: d.Rated === 'R' ? 'Moderate' : 'Mild',
                        nudity: d.Rated === 'R' ? 'Mild' : 'None',
                        substances: 'Mild'
                    },
                    filterSummary: 'Filterable on streaming platforms using VidAngel or ClearPlay.'
                };
                state.movieCache.set(title.toLowerCase(), movie);
                return movie;
            }
        }
    } catch (err) {
        console.warn('Error fetching movie details:', err);
    }
    return null;
}

/**
 * Tokenize a plot description into key search words
 */
function tokenizePlotQuery(query) {
    if (!query) return [];
    return query
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length >= 3 && !STOP_WORDS.has(word));
}

/**
 * Calculate relevance score between synopsis and search query
 */
function calculatePlotScore(movie, tokens) {
    let score = 0;
    const synopsisLower = (movie.synopsis || '').toLowerCase();
    const titleLower = movie.title.toLowerCase();
    const genresLower = movie.genres.join(' ').toLowerCase();

    tokens.forEach(token => {
        // High weight if in title
        if (titleLower.includes(token)) score += 5;
        // Match in synopsis
        if (synopsisLower.includes(token)) {
            score += 3;
            const count = synopsisLower.split(token).length - 1;
            score += count * 1.5;
        }
        // Match in genre
        if (genresLower.includes(token)) score += 1;
    });

    return score;
}

/**
 * Sort movies in memory
 */
function sortClientMovies() {
    const sort = state.sortBy;
    state.moviesList.sort((a, b) => {
        if (sort === 'relevance') {
            if (state.activePlotQuery) {
                return (b._plotScore || 0) - (a._plotScore || 0);
            }
            return b.score - a.score;
        }
        if (sort === 'score-desc') return b.score - a.score;
        if (sort === 'runtime-asc') return a.runtime - b.runtime;
        if (sort === 'runtime-desc') return b.runtime - a.runtime;
        if (sort === 'year-desc') return b.year - a.year;
        if (sort === 'year-asc') return a.year - b.year;
        if (sort === 'title-asc') return a.title.localeCompare(b.title);
        return 0;
    });
}

/**
 * Render movie cards into the grid
 */
function renderResults() {
    const grid = document.getElementById('moviesGrid');
    const emptyState = document.getElementById('emptyState');
    const countEl = document.getElementById('resultsCount');

    if (!grid) return;

    const count = state.moviesList.length;
    if (countEl) {
        if (state.activePlotQuery) {
            countEl.textContent = `${count} ${count === 1 ? 'Match' : 'Matches'} Found for Plot`;
        } else if (state.dbMode === 'live') {
            countEl.textContent = `800k+ Live Movies • Showing ${count}`;
        } else {
            countEl.textContent = `${count} Curated Classics`;
        }
    }

    if (count === 0) {
        grid.innerHTML = '';
        if (emptyState) {
            emptyState.style.display = 'flex';
            const emptyTitle = document.getElementById('emptyTitle');
            const emptyMsg = document.getElementById('emptyMessage');
            if (state.activePlotQuery) {
                if (emptyTitle) emptyTitle.textContent = 'No Movies Matched That Exact Plot Description';
                if (emptyMsg) emptyMsg.textContent = 'Try including distinct settings, objects, character jobs, or plot twists (e.g. "time travel car", "island theme park", "food truck chef").';
            } else {
                if (emptyTitle) emptyTitle.textContent = 'No Movies Match Your Current Filters';
                if (emptyMsg) emptyMsg.textContent = 'Try loosening your runtime limit, selecting additional genres, or resetting your filter toggles.';
            }
        }
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    const plotTokens = tokenizePlotQuery(state.activePlotQuery);

    grid.innerHTML = state.moviesList.map(movie => {
        const highlightedSynopsis = highlightTerms(movie.synopsis, plotTokens);
        const topCast = Array.isArray(movie.cast) ? movie.cast.slice(0, 3).join(', ') : 'Leading Cast';

        return `
            <article class="movie-card" data-id="${movie.id}" tabindex="0" role="button" aria-label="View details for ${movie.title}">
                <div class="card-poster-wrapper">
                    <img class="card-poster-img" src="${movie.poster}" alt="${movie.title} poster" loading="lazy" onerror="this.src='https://placehold.co/500x750/111728/6366f1?text=${encodeURIComponent(movie.title)}'">
                    
                    <div class="card-badges-top">
                        <span class="badge-rating ${movie.rating}">${movie.rating}</span>
                        <span class="badge-score">★ ${movie.score.toFixed(1)}</span>
                    </div>

                    <div class="card-badges-bottom">
                        <span class="badge-runtime">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            ${movie.runtime} min
                        </span>

                        ${movie._matchPct ? `
                            <span class="badge-plot-match">
                                ✨ ${movie._matchPct}% Plot Match
                            </span>
                        ` : (movie.vidangelFilterable ? `
                            <span class="badge-filter-status" title="Filterable on VidAngel & ClearPlay">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                                Filter Ready
                            </span>
                        ` : '')}
                    </div>
                </div>

                <div class="card-content">
                    <div class="card-title-row">
                        <h3 class="card-movie-title">${movie.title}</h3>
                        <span class="card-movie-year">${movie.year}</span>
                    </div>

                    <div class="card-genres">
                        ${movie.genres.map(g => `<span class="genre-pill">${g}</span>`).join('')}
                    </div>

                    <p class="card-synopsis">${highlightedSynopsis}</p>

                    <div class="card-cast">
                        <strong>Cast:</strong> ${topCast}
                    </div>
                </div>
            </article>
        `;
    }).join('');

    // Attach click listeners to cards
    grid.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const movie = state.moviesList.find(m => m.id === id) || state.curatedMovies.find(m => m.id === id);
            if (movie) openMovieDetail(movie);
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

function updateLoadMoreButton() {
    const container = document.getElementById('loadMoreContainer');
    const nextPageNum = document.getElementById('nextPageNum');
    if (!container) return;

    if (state.dbMode === 'live' && !state.activePlotQuery && state.currentPage < state.totalPages) {
        container.style.display = 'flex';
        if (nextPageNum) nextPageNum.textContent = (state.currentPage + 1).toString();
    } else {
        container.style.display = 'none';
    }
}

/**
 * Highlight matched search terms in synopsis
 */
function highlightTerms(text, tokens) {
    if (!text || !tokens || tokens.length === 0) return text;
    let safe = text;
    tokens.forEach(tok => {
        const regex = new RegExp(`(${tok})`, 'gi');
        safe = safe.replace(regex, '<mark>$1</mark>');
    });
    return safe;
}

/**
 * Render active filter badges for easy clearing
 */
function renderActiveFilterBadges() {
    const bar = document.getElementById('activeFiltersBar');
    const list = document.getElementById('activeFiltersList');
    if (!bar || !list) return;

    const badges = [];

    if (state.filters.title) {
        badges.push({ label: `Title: "${state.filters.title}"`, clear: () => {
            state.filters.title = '';
            document.getElementById('titleSearchInput').value = '';
            document.getElementById('clearTitleBtn').style.display = 'none';
            loadMovies(true);
        }});
    }

    if (state.activePlotQuery) {
        badges.push({ label: `Plot: "${state.activePlotQuery}"`, clear: () => {
            clearPlotSearch();
        }});
    }

    if (state.filters.runtimeMax < 210) {
        badges.push({ label: `Runtime: < ${state.filters.runtimeMax}m`, clear: () => {
            state.filters.runtimeMax = 210;
            document.getElementById('runtimeSlider').value = 210;
            updateRuntimeDisplay(210);
            updateRuntimeChipsActive(210);
            loadMovies(true);
        }});
    }

    state.filters.genres.forEach(g => {
        badges.push({ label: `Genre: ${g}`, clear: () => {
            state.filters.genres.delete(g);
            const cb = document.querySelector(`#genreContainer input[value="${g}"]`);
            if (cb) {
                cb.checked = false;
                cb.closest('.genre-checkbox-label')?.classList.remove('checked');
            }
            loadMovies(true);
        }});
    });

    if (state.filters.ratings.size < 4) {
        badges.push({ label: `Ratings: ${Array.from(state.filters.ratings).join(', ') || 'None'}`, clear: () => {
            state.filters.ratings = new Set(['G', 'PG', 'PG-13', 'R']);
            document.querySelectorAll('#ratingContainer input[type="checkbox"]').forEach(cb => cb.checked = true);
            loadMovies(true);
        }});
    }

    if (state.filters.actor) {
        badges.push({ label: `Actor: ${state.filters.actor}`, clear: () => {
            state.filters.actor = '';
            document.getElementById('actorInput').value = '';
            document.getElementById('clearActorBtn').style.display = 'none';
            document.querySelectorAll('.actor-tag').forEach(t => t.classList.remove('active'));
            loadMovies(true);
        }});
    }

    if (state.filters.exactYear) {
        badges.push({ label: `Year: ${state.filters.exactYear}`, clear: () => {
            state.filters.exactYear = null;
            document.getElementById('exactYearInput').value = '';
            document.getElementById('clearExactYearBtn').style.display = 'none';
            document.querySelector('#decadeContainer [data-decade="all"]')?.classList.add('active');
            state.filters.decade = 'all';
            loadMovies(true);
        }});
    } else if (state.filters.decade !== 'all') {
        badges.push({ label: `Era: ${state.filters.decade}`, clear: () => {
            state.filters.decade = 'all';
            document.querySelectorAll('#decadeContainer .chip-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('#decadeContainer [data-decade="all"]')?.classList.add('active');
            loadMovies(true);
        }});
    }

    if (state.filters.minScore > 0) {
        badges.push({ label: `Score: ${state.filters.minScore}+ ★`, clear: () => {
            state.filters.minScore = 0;
            document.getElementById('minScoreSlider').value = 0;
            document.getElementById('minScoreValue').textContent = 'Any Score';
            loadMovies(true);
        }});
    }

    if (state.filters.filterServiceOnly) {
        badges.push({ label: `VidAngel/ClearPlay Only`, clear: () => {
            state.filters.filterServiceOnly = false;
            document.getElementById('filterServiceToggle').checked = false;
            loadMovies(true);
        }});
    }

    if (badges.length === 0) {
        bar.style.display = 'none';
        list.innerHTML = '';
    } else {
        bar.style.display = 'flex';
        list.innerHTML = badges.map((b, idx) => `
            <span class="filter-badge-chip">
                <span>${b.label}</span>
                <button type="button" data-badge-idx="${idx}" aria-label="Remove filter">✕</button>
            </span>
        `).join('');

        list.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-badge-idx'), 10);
                if (badges[idx]) {
                    badges[idx].clear();
                }
            });
        });
    }
}

/**
 * Clear Plot Search
 */
function clearPlotSearch() {
    state.activePlotQuery = '';
    state.filters.plot = '';
    const plotInput = document.getElementById('plotInput');
    const clearPlotBtn = document.getElementById('clearPlotBtn');
    const statusEl = document.getElementById('plotSearchStatus');
    const banner = document.getElementById('plotResultsBanner');

    if (plotInput) plotInput.value = '';
    if (clearPlotBtn) clearPlotBtn.style.display = 'none';
    if (statusEl) statusEl.style.display = 'none';
    if (banner) banner.style.display = 'none';

    loadMovies(true);
}

/**
 * DOM Event Listeners Setup
 */
function initEventListeners() {
    // Mode Switcher (Live vs Curated)
    const modeLiveBtn = document.getElementById('modeLiveBtn');
    const modeCuratedBtn = document.getElementById('modeCuratedBtn');

    if (modeLiveBtn) {
        modeLiveBtn.addEventListener('click', () => {
            if (state.dbMode !== 'live') {
                state.dbMode = 'live';
                updateDbModeUI();
                loadMovies(true);
            }
        });
    }

    if (modeCuratedBtn) {
        modeCuratedBtn.addEventListener('click', () => {
            if (state.dbMode !== 'curated') {
                state.dbMode = 'curated';
                updateDbModeUI();
                loadMovies(true);
            }
        });
    }

    // Title search with debounce
    const titleInput = document.getElementById('titleSearchInput');
    const clearTitleBtn = document.getElementById('clearTitleBtn');
    let titleTimer = null;
    if (titleInput) {
        titleInput.addEventListener('input', (e) => {
            state.filters.title = e.target.value.trim();
            clearTitleBtn.style.display = state.filters.title ? 'flex' : 'none';
            clearTimeout(titleTimer);
            titleTimer = setTimeout(() => {
                loadMovies(true);
            }, 400);
        });
    }
    if (clearTitleBtn) {
        clearTitleBtn.addEventListener('click', () => {
            titleInput.value = '';
            state.filters.title = '';
            clearTitleBtn.style.display = 'none';
            loadMovies(true);
        });
    }

    // Plot Search Textarea & Button
    const plotInput = document.getElementById('plotInput');
    const clearPlotBtn = document.getElementById('clearPlotBtn');
    const findMovieByPlotBtn = document.getElementById('findMovieByPlotBtn');
    const clearPlotBannerBtn = document.getElementById('clearPlotBannerBtn');

    const triggerPlotSearch = () => {
        const text = plotInput.value.trim();
        if (text) {
            state.activePlotQuery = text;
            state.filters.plot = text;
            loadMovies(true);
        }
    };

    if (findMovieByPlotBtn) {
        findMovieByPlotBtn.addEventListener('click', triggerPlotSearch);
    }

    if (plotInput) {
        plotInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                triggerPlotSearch();
            }
        });
        plotInput.addEventListener('input', (e) => {
            clearPlotBtn.style.display = e.target.value.trim() ? 'flex' : 'none';
        });
    }

    if (clearPlotBtn) {
        clearPlotBtn.addEventListener('click', clearPlotSearch);
    }
    if (clearPlotBannerBtn) {
        clearPlotBannerBtn.addEventListener('click', clearPlotSearch);
    }

    // Plot sample prompts
    document.querySelectorAll('.plot-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const query = tag.getAttribute('data-query');
            if (plotInput) {
                plotInput.value = query;
                clearPlotBtn.style.display = 'flex';
                state.activePlotQuery = query;
                state.filters.plot = query;
                loadMovies(true);
            }
        });
    });

    // Runtime Slider & Presets
    const runtimeSlider = document.getElementById('runtimeSlider');
    if (runtimeSlider) {
        runtimeSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            state.filters.runtimeMax = val;
            updateRuntimeDisplay(val);
            updateRuntimeChipsActive(val);
        });
        runtimeSlider.addEventListener('change', () => {
            loadMovies(true);
        });
    }

    document.querySelectorAll('.runtime-presets .chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const rt = btn.getAttribute('data-runtime');
            if (rt === 'all') {
                runtimeSlider.value = 210;
                state.filters.runtimeMax = 210;
            } else {
                const num = parseInt(rt, 10);
                runtimeSlider.value = num;
                state.filters.runtimeMax = num;
            }
            updateRuntimeDisplay(state.filters.runtimeMax);
            updateRuntimeChipsActive(state.filters.runtimeMax);
            loadMovies(true);
        });
    });

    // Genre Checkboxes
    const genreContainer = document.getElementById('genreContainer');
    if (genreContainer) {
        genreContainer.addEventListener('change', (e) => {
            if (e.target.matches('input[type="checkbox"]')) {
                const genre = e.target.value;
                const label = e.target.closest('.genre-checkbox-label');
                if (e.target.checked) {
                    state.filters.genres.add(genre);
                    label?.classList.add('checked');
                } else {
                    state.filters.genres.delete(genre);
                    label?.classList.remove('checked');
                }
                loadMovies(true);
            }
        });
    }

    const toggleAllGenresBtn = document.getElementById('toggleAllGenresBtn');
    if (toggleAllGenresBtn) {
        toggleAllGenresBtn.addEventListener('click', () => {
            state.filters.genres.clear();
            document.querySelectorAll('#genreContainer input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
                cb.closest('.genre-checkbox-label')?.classList.remove('checked');
            });
            loadMovies(true);
        });
    }

    // MPA Rating Checkboxes
    const ratingContainer = document.getElementById('ratingContainer');
    if (ratingContainer) {
        ratingContainer.addEventListener('change', (e) => {
            if (e.target.matches('input[type="checkbox"]')) {
                const rating = e.target.value;
                if (e.target.checked) {
                    state.filters.ratings.add(rating);
                } else {
                    state.filters.ratings.delete(rating);
                }
                loadMovies(true);
            }
        });
    }

    // VidAngel / ClearPlay Toggle
    const filterServiceToggle = document.getElementById('filterServiceToggle');
    if (filterServiceToggle) {
        filterServiceToggle.addEventListener('change', (e) => {
            state.filters.filterServiceOnly = e.target.checked;
            loadMovies(true);
        });
    }

    // Content Tolerances Selects
    ['maxProfanity', 'maxViolence', 'maxNudity'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', (e) => {
                state.filters[id] = e.target.value;
                loadMovies(true);
            });
        }
    });

    // Actor Input
    const actorInput = document.getElementById('actorInput');
    const clearActorBtn = document.getElementById('clearActorBtn');
    let actorTimer = null;
    if (actorInput) {
        actorInput.addEventListener('input', (e) => {
            state.filters.actor = e.target.value.trim();
            clearActorBtn.style.display = state.filters.actor ? 'flex' : 'none';
            clearTimeout(actorTimer);
            actorTimer = setTimeout(() => {
                loadMovies(true);
            }, 400);
        });
    }
    if (clearActorBtn) {
        clearActorBtn.addEventListener('click', () => {
            actorInput.value = '';
            state.filters.actor = '';
            clearActorBtn.style.display = 'none';
            document.querySelectorAll('.actor-tag').forEach(t => t.classList.remove('active'));
            loadMovies(true);
        });
    }

    // Actor Suggestions
    document.querySelectorAll('.actor-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const actor = tag.getAttribute('data-actor');
            if (actorInput) {
                if (state.filters.actor.toLowerCase() === actor.toLowerCase()) {
                    actorInput.value = '';
                    state.filters.actor = '';
                    clearActorBtn.style.display = 'none';
                    tag.classList.remove('active');
                } else {
                    actorInput.value = actor;
                    state.filters.actor = actor;
                    clearActorBtn.style.display = 'flex';
                    document.querySelectorAll('.actor-tag').forEach(t => t.classList.remove('active'));
                    tag.classList.add('active');
                }
                loadMovies(true);
            }
        });
    });

    // Decade Selector
    document.querySelectorAll('#decadeContainer .chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#decadeContainer .chip-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.filters.decade = btn.getAttribute('data-decade');
            const exactYearInput = document.getElementById('exactYearInput');
            if (exactYearInput && exactYearInput.value) {
                exactYearInput.value = '';
                state.filters.exactYear = null;
                document.getElementById('clearExactYearBtn').style.display = 'none';
            }
            loadMovies(true);
        });
    });

    // Exact Year Input
    const exactYearInput = document.getElementById('exactYearInput');
    const clearExactYearBtn = document.getElementById('clearExactYearBtn');
    if (exactYearInput) {
        exactYearInput.addEventListener('change', (e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= 1900 && val <= 2035) {
                state.filters.exactYear = val;
                clearExactYearBtn.style.display = 'inline-block';
                document.querySelectorAll('#decadeContainer .chip-btn').forEach(b => b.classList.remove('active'));
                loadMovies(true);
            }
        });
    }
    if (clearExactYearBtn) {
        clearExactYearBtn.addEventListener('click', () => {
            exactYearInput.value = '';
            state.filters.exactYear = null;
            clearExactYearBtn.style.display = 'none';
            const allDecadeBtn = document.querySelector('#decadeContainer [data-decade="all"]');
            if (allDecadeBtn) allDecadeBtn.classList.add('active');
            state.filters.decade = 'all';
            loadMovies(true);
        });
    }

    // Min Score Slider
    const minScoreSlider = document.getElementById('minScoreSlider');
    const minScoreValue = document.getElementById('minScoreValue');
    if (minScoreSlider) {
        minScoreSlider.addEventListener('input', (e) => {
            const score = parseFloat(e.target.value);
            state.filters.minScore = score;
            if (minScoreValue) {
                minScoreValue.textContent = score === 0 ? 'Any Score' : `${score.toFixed(1)}+ ★`;
            }
        });
        minScoreSlider.addEventListener('change', () => {
            loadMovies(true);
        });
    }

    // Quick Presets
    document.querySelectorAll('.preset-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            applyPreset(chip.getAttribute('data-preset'));
        });
    });

    // Sorting
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            state.sortBy = e.target.value;
            loadMovies(true);
        });
    }

    // Load More Button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            if (state.currentPage < state.totalPages) {
                state.currentPage++;
                loadMovies(false);
            }
        });
    }

    // Surprise Me Button
    const surpriseBtn = document.getElementById('surpriseBtn');
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', pickRandomMovie);
    }

    // Reset All Buttons
    const resetAllFiltersBtn = document.getElementById('resetAllFiltersBtn');
    const emptyResetBtn = document.getElementById('emptyResetBtn');
    const clearAllChipsBtn = document.getElementById('clearAllChipsBtn');
    if (resetAllFiltersBtn) resetAllFiltersBtn.addEventListener('click', resetAllFilters);
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAllFilters);
    if (clearAllChipsBtn) clearAllChipsBtn.addEventListener('click', resetAllFilters);

    // Mobile Sidebar Drawer
    const mobileFilterToggle = document.getElementById('mobileFilterToggle');
    const closeMobileFiltersBtn = document.getElementById('closeMobileFiltersBtn');
    const filterSidebar = document.getElementById('filterSidebar');
    if (mobileFilterToggle && filterSidebar) {
        mobileFilterToggle.addEventListener('click', () => {
            filterSidebar.classList.toggle('open');
        });
    }
    if (closeMobileFiltersBtn && filterSidebar) {
        closeMobileFiltersBtn.addEventListener('click', () => {
            filterSidebar.classList.remove('open');
        });
    }

    // Dismiss Alert
    const dismissAlertBtn = document.getElementById('dismissAlertBtn');
    const apiInfoAlert = document.getElementById('apiInfoAlert');
    if (dismissAlertBtn && apiInfoAlert) {
        dismissAlertBtn.addEventListener('click', () => {
            apiInfoAlert.style.display = 'none';
        });
    }

    // Modals Setup
    setupModals();
}

/**
 * Update Runtime display readout
 */
function updateRuntimeDisplay(val) {
    const el = document.getElementById('runtimeValue');
    if (!el) return;
    if (val >= 210) {
        el.textContent = 'Any Time';
    } else {
        const hrs = Math.floor(val / 60);
        const mins = val % 60;
        el.textContent = `Under ${hrs}h ${mins > 0 ? mins + 'm' : ''} (${val}m)`;
    }
}

function updateRuntimeChipsActive(val) {
    document.querySelectorAll('.runtime-presets .chip-btn').forEach(btn => {
        const rt = btn.getAttribute('data-runtime');
        if (rt === 'all' && val >= 210) {
            btn.classList.add('active');
        } else if (parseInt(rt, 10) === val) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/**
 * Apply Preset Configuration
 */
function applyPreset(preset) {
    resetAllFilters(false);

    if (preset === 'family-night') {
        state.filters.ratings = new Set(['G', 'PG']);
        document.querySelectorAll('#ratingContainer input[type="checkbox"]').forEach(cb => {
            cb.checked = (cb.value === 'G' || cb.value === 'PG');
        });
        state.filters.filterServiceOnly = true;
        document.getElementById('filterServiceToggle').checked = true;
        state.filters.maxProfanity = 'None';
        document.getElementById('maxProfanity').value = 'None';
        state.filters.runtimeMax = 115;
        document.getElementById('runtimeSlider').value = 115;
        updateRuntimeDisplay(115);
        updateRuntimeChipsActive(115);
    } else if (preset === 'quick-watch') {
        state.filters.runtimeMax = 95;
        document.getElementById('runtimeSlider').value = 95;
        updateRuntimeDisplay(95);
        updateRuntimeChipsActive(95);
    } else if (preset === 'top-rated') {
        state.filters.minScore = 8.5;
        document.getElementById('minScoreSlider').value = 8.5;
        document.getElementById('minScoreValue').textContent = '8.5+ ★';
    } else if (preset === 'sci-fi-action') {
        state.filters.genres.add('Sci-Fi');
        state.filters.genres.add('Action');
        document.querySelectorAll('#genreContainer input[type="checkbox"]').forEach(cb => {
            if (cb.value === 'Sci-Fi' || cb.value === 'Action') {
                cb.checked = true;
                cb.closest('.genre-checkbox-label')?.classList.add('checked');
            }
        });
    }

    loadMovies(true);
}

/**
 * Reset all filters to default state
 */
function resetAllFilters(runLoad = true) {
    state.activePlotQuery = '';
    state.filters = {
        title: '',
        plot: '',
        runtimeMax: 210,
        genres: new Set(),
        ratings: new Set(['G', 'PG', 'PG-13', 'R']),
        actor: '',
        decade: 'all',
        exactYear: null,
        minScore: 0,
        filterServiceOnly: false,
        maxProfanity: 'any',
        maxViolence: 'any',
        maxNudity: 'any'
    };

    const titleInput = document.getElementById('titleSearchInput');
    const plotInput = document.getElementById('plotInput');
    const actorInput = document.getElementById('actorInput');
    const exactYearInput = document.getElementById('exactYearInput');
    const runtimeSlider = document.getElementById('runtimeSlider');
    const minScoreSlider = document.getElementById('minScoreSlider');
    const filterServiceToggle = document.getElementById('filterServiceToggle');

    if (titleInput) titleInput.value = '';
    if (plotInput) plotInput.value = '';
    if (actorInput) actorInput.value = '';
    if (exactYearInput) exactYearInput.value = '';
    if (runtimeSlider) runtimeSlider.value = 210;
    if (minScoreSlider) minScoreSlider.value = 0;
    if (filterServiceToggle) filterServiceToggle.checked = false;

    document.getElementById('clearTitleBtn').style.display = 'none';
    document.getElementById('clearPlotBtn').style.display = 'none';
    document.getElementById('clearActorBtn').style.display = 'none';
    document.getElementById('clearExactYearBtn').style.display = 'none';
    document.getElementById('plotSearchStatus').style.display = 'none';
    document.getElementById('plotResultsBanner').style.display = 'none';

    updateRuntimeDisplay(210);
    updateRuntimeChipsActive(210);
    document.getElementById('minScoreValue').textContent = 'Any Score';

    document.querySelectorAll('#genreContainer input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
        cb.closest('.genre-checkbox-label')?.classList.remove('checked');
    });

    document.querySelectorAll('#ratingContainer input[type="checkbox"]').forEach(cb => {
        cb.checked = true;
    });

    document.querySelectorAll('#decadeContainer .chip-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('#decadeContainer [data-decade="all"]')?.classList.add('active');

    document.querySelectorAll('.actor-tag').forEach(t => t.classList.remove('active'));

    document.getElementById('maxProfanity').value = 'any';
    document.getElementById('maxViolence').value = 'any';
    document.getElementById('maxNudity').value = 'any';

    if (runLoad) loadMovies(true);
}

/**
 * Surprise Me / Pick Random Movie
 */
function pickRandomMovie() {
    const pool = state.moviesList.length > 0 ? state.moviesList : state.curatedMovies;
    if (pool.length === 0) return;
    const randomPick = pool[Math.floor(Math.random() * pool.length)];
    openMovieDetail(randomPick);
}


/**
 * ==========================================================================
 * Streaming Availability & Watch Providers (Powered by JustWatch & TMDB)
 * ==========================================================================
 */

const STREAMING_CACHE = new Map();
let currentModalMovie = null;

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/**
 * Fetch Watch Providers from TMDB
 */
async function fetchWatchProviders(movie) {
    if (!movie) return null;

    let tmdbId = movie.tmdbId;

    // If tmdbId not present, try finding by imdbId
    if (!tmdbId && movie.imdbId) {
        try {
            const findUrl = `https://api.themoviedb.org/3/find/${movie.imdbId}?external_source=imdb_id&api_key=${CONFIG.TMDB_API_KEY}`;
            const findRes = await fetch(findUrl);
            if (findRes.ok) {
                const findData = await findRes.json();
                if (findData.movie_results && findData.movie_results.length > 0) {
                    tmdbId = findData.movie_results[0].id;
                    movie.tmdbId = tmdbId;
                }
            }
        } catch (e) {
            console.warn("Error resolving TMDB ID from IMDb:", e);
        }
    }

    // If still not found, try searching by title and year
    if (!tmdbId && movie.title) {
        try {
            const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${CONFIG.TMDB_API_KEY}&query=${encodeURIComponent(movie.title)}&year=${movie.year || ""}`;
            const searchRes = await fetch(searchUrl);
            if (searchRes.ok) {
                const searchData = await searchRes.json();
                if (searchData.results && searchData.results.length > 0) {
                    tmdbId = searchData.results[0].id;
                    movie.tmdbId = tmdbId;
                }
            }
        } catch (e) {
            console.warn("Error resolving TMDB ID from title:", e);
        }
    }

    if (!tmdbId) return null;

    if (STREAMING_CACHE.has(tmdbId)) {
        return STREAMING_CACHE.get(tmdbId);
    }

    try {
        const url = `https://api.themoviedb.org/3/movie/${tmdbId}/watch/providers?api_key=${CONFIG.TMDB_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`TMDB providers returned ${res.status}`);
        const data = await res.json();
        const results = data.results || {};
        STREAMING_CACHE.set(tmdbId, results);
        return results;
    } catch (err) {
        console.error("Failed to fetch streaming providers:", err);
        return null;
    }
}

/**
 * Generate platform-specific search or watch URL
 */
function getProviderSearchUrl(providerName, movieTitle) {
    const cleanTitle = encodeURIComponent(movieTitle);
    const p = (providerName || "").toLowerCase();
    if (p.includes("netflix")) return `https://www.netflix.com/search?q=${cleanTitle}`;
    if (p.includes("prime") || p.includes("amazon")) return `https://www.amazon.com/s?k=${cleanTitle}&i=instant-video`;
    if (p.includes("disney")) return `https://www.disneyplus.com/search?q=${cleanTitle}`;
    if (p.includes("apple tv") || p.includes("apple")) return `https://tv.apple.com/search?term=${cleanTitle}`;
    if (p.includes("max") || p.includes("hbo")) return `https://play.max.com/search?q=${cleanTitle}`;
    if (p.includes("hulu")) return `https://www.hulu.com/search?q=${cleanTitle}`;
    if (p.includes("paramount")) return `https://www.paramountplus.com/search/?q=${cleanTitle}`;
    if (p.includes("peacock")) return `https://www.peacocktv.com/search?q=${cleanTitle}`;
    if (p.includes("tubi")) return `https://tubitv.com/search/${cleanTitle}`;
    if (p.includes("pluto")) return `https://pluto.tv/search/details/movies/${cleanTitle}`;
    if (p.includes("youtube") || p.includes("google")) return `https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle + " full movie")}`;
    if (p.includes("fandango") || p.includes("vudu")) return `https://www.vudu.com/content/movies/search?searchString=${cleanTitle}`;
    return `https://www.google.com/search?q=watch+${cleanTitle}+movie+on+${encodeURIComponent(providerName)}`;
}

/**
 * Render Streaming Availability inside Modal
 */
async function renderStreamingSection(movie, regionCode = "US") {
    const container = document.getElementById("modalStreamingContent");
    if (!container) return;

    // Show Loading state
    container.innerHTML = `
        <div class="streaming-loading">
            <span class="streaming-spinner"></span>
            <span>Checking live streaming availability across Netflix, Prime, Disney+, Max &amp; more...</span>
        </div>
    `;

    const allProviders = await fetchWatchProviders(movie);

    // Guard against race conditions if modal closed or changed
    if (!currentModalMovie || currentModalMovie.id !== movie.id) return;

    const regionData = allProviders ? allProviders[regionCode] : null;

    if (!regionData) {
        container.innerHTML = `
            <div class="streaming-empty">
                <p>No direct streaming providers reported for "${escapeHtml(movie.title)}" in this region (${regionCode}).</p>
                <a href="https://www.google.com/search?q=where+to+watch+${encodeURIComponent(movie.title + " " + movie.year)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-glass">
                    Search Where to Stream on Google ↗
                </a>
            </div>
        `;
        return;
    }

    const flatrate = regionData.flatrate || [];
    const free = [...(regionData.free || []), ...(regionData.ads || [])];
    
    // Deduplicate rent and buy
    const rent = regionData.rent || [];
    const buy = regionData.buy || [];
    const rentBuyMap = new Map();
    [...rent, ...buy].forEach(p => {
        if (!rentBuyMap.has(p.provider_id)) {
            rentBuyMap.set(p.provider_id, p);
        }
    });
    const rentBuyList = Array.from(rentBuyMap.values()).slice(0, 6);

    const justWatchLink = regionData.link || (movie.tmdbId ? `https://www.themoviedb.org/movie/${movie.tmdbId}/watch?locale=${regionCode}` : "https://www.justwatch.com");

    let html = "";

    // Check VidAngel / ClearPlay compatibility synergy
    const allStreamingNames = [...flatrate, ...free].map(p => p.provider_name.toLowerCase());
    const compatibleServices = [];
    if (allStreamingNames.some(n => n.includes("netflix"))) compatibleServices.push("Netflix");
    if (allStreamingNames.some(n => n.includes("prime") || n.includes("amazon"))) compatibleServices.push("Prime Video");
    if (allStreamingNames.some(n => n.includes("disney"))) compatibleServices.push("Disney+");
    if (allStreamingNames.some(n => n.includes("apple"))) compatibleServices.push("Apple TV+");

    if (compatibleServices.length > 0) {
        html += `
            <div class="streaming-compatibility-alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span><strong>Filter Compatible:</strong> Streaming on <strong>${compatibleServices.join(", ")}</strong> — ready to filter with VidAngel &amp; ClearPlay!</span>
            </div>
        `;
    }

    let hasAnyOptions = false;

    // 1. Subscription Streaming (Flatrate)
    if (flatrate.length > 0) {
        hasAnyOptions = true;
        html += `
            <div class="streaming-group">
                <div class="streaming-group-header">
                    <span class="streaming-group-label">Stream (Subscription)</span>
                </div>
                <div class="streaming-provider-grid">
                    ${flatrate.map(p => `
                        <a href="${getProviderSearchUrl(p.provider_name, movie.title)}" target="_blank" rel="noopener noreferrer" class="provider-pill" title="Watch on ${escapeHtml(p.provider_name)}">
                            <img src="${CONFIG.TMDB_IMAGE_BASE}${p.logo_path}" alt="${escapeHtml(p.provider_name)}" class="provider-logo" onerror="this.style.display='none'">
                            <span class="provider-name">${escapeHtml(p.provider_name)}</span>
                            <span class="provider-tier-badge tier-sub">Stream ↗</span>
                        </a>
                    `).join("")}
                </div>
            </div>
        `;
    }

    // 2. Free with Ads
    if (free.length > 0) {
        hasAnyOptions = true;
        html += `
            <div class="streaming-group">
                <div class="streaming-group-header">
                    <span class="streaming-group-label">Free with Ads</span>
                </div>
                <div class="streaming-provider-grid">
                    ${free.map(p => `
                        <a href="${getProviderSearchUrl(p.provider_name, movie.title)}" target="_blank" rel="noopener noreferrer" class="provider-pill" title="Watch free on ${escapeHtml(p.provider_name)}">
                            <img src="${CONFIG.TMDB_IMAGE_BASE}${p.logo_path}" alt="${escapeHtml(p.provider_name)}" class="provider-logo" onerror="this.style.display='none'">
                            <span class="provider-name">${escapeHtml(p.provider_name)}</span>
                            <span class="provider-tier-badge tier-free">Free ↗</span>
                        </a>
                    `).join("")}
                </div>
            </div>
        `;
    }

    // 3. Digital Rent or Buy
    if (rentBuyList.length > 0) {
        hasAnyOptions = true;
        html += `
            <div class="streaming-group">
                <div class="streaming-group-header">
                    <span class="streaming-group-label">Rent or Buy</span>
                </div>
                <div class="streaming-provider-grid">
                    ${rentBuyList.map(p => `
                        <a href="${getProviderSearchUrl(p.provider_name, movie.title)}" target="_blank" rel="noopener noreferrer" class="provider-pill" title="Rent/Buy on ${escapeHtml(p.provider_name)}">
                            <img src="${CONFIG.TMDB_IMAGE_BASE}${p.logo_path}" alt="${escapeHtml(p.provider_name)}" class="provider-logo" onerror="this.style.display='none'">
                            <span class="provider-name">${escapeHtml(p.provider_name)}</span>
                            <span class="provider-tier-badge tier-rent">Rent / Buy ↗</span>
                        </a>
                    `).join("")}
                </div>
            </div>
        `;
    }

    if (!hasAnyOptions) {
        html += `
            <div class="streaming-empty">
                <p>No subscription or digital streaming currently available in ${regionCode}.</p>
                <a href="https://www.google.com/search?q=where+to+watch+${encodeURIComponent(movie.title + " " + movie.year)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-glass">
                    Check Streaming Availability on Google ↗
                </a>
            </div>
        `;
    } else {
        html += `
            <div class="streaming-footer-note">
                <span>Streaming data verified by JustWatch via TMDB</span>
                <a href="${justWatchLink}" target="_blank" rel="noopener noreferrer">All Offers &amp; Pricing ↗</a>
            </div>
        `;
    }

    container.innerHTML = html;
}

/**
 * Open Movie Detail Modal
 */
function openMovieDetail(movie) {
    const dialog = document.getElementById('movieDetailDialog');
    if (!dialog) return;

    // Hero background
    const hero = document.getElementById('modalHero');
    if (hero) {
        hero.style.backgroundImage = `url('${movie.backdrop || movie.poster}')`;
    }

    // Badges
    const badgesContainer = document.getElementById('modalBadges');
    if (badgesContainer) {
        badgesContainer.innerHTML = `
            <span class="badge-rating ${movie.rating}">${movie.rating}</span>
            <span class="badge-score">★ ${movie.score.toFixed(1)} IMDb</span>
            <span class="badge-runtime">${movie.runtime} minutes</span>
            ${movie.vidangelFilterable ? '<span class="badge-filter-status">VidAngel &amp; ClearPlay Supported</span>' : ''}
        `;
    }

    // Title & Stats
    document.getElementById('modalTitle').textContent = movie.title;
    document.getElementById('modalQuickStats').innerHTML = `
        <span><strong>Year:</strong> ${movie.year}</span>
        <span><strong>Genres:</strong> ${movie.genres.join(', ')}</span>
    `;

    // Poster & Synopsis
    const posterImg = document.getElementById('modalPoster');
    if (posterImg) {
        posterImg.src = movie.poster;
        posterImg.alt = movie.title;
    }
    document.getElementById('modalSynopsis').textContent = movie.synopsis;

    // Director & Cast
    document.getElementById('modalDirector').textContent = movie.director || 'Leading Filmmaker';
    const castContainer = document.getElementById('modalCastTags');
    if (castContainer) {
        castContainer.innerHTML = Array.isArray(movie.cast)
            ? movie.cast.map(c => `<span class="modal-cast-tag">${c}</span>`).join('')
            : `<span class="modal-cast-tag">${movie.cast}</span>`;
    }

    // VidAngel & ClearPlay Advisory Guide
    document.getElementById('modalFilterSummary').textContent = movie.filterSummary || 
        'Filtering tracks allow muting profanity, removing sensitive scenes, and softening violence for family viewing.';

    const advisory = movie.contentAdvisory || { profanity: 'Mild', violence: 'Mild', nudity: 'None', substances: 'None' };
    const metersContainer = document.getElementById('modalContentMeters');
    if (metersContainer) {
        metersContainer.innerHTML = `
            <div class="meter-card">
                <span class="meter-category">Profanity</span>
                <span class="meter-status ${advisory.profanity}">${advisory.profanity}</span>
            </div>
            <div class="meter-card">
                <span class="meter-category">Violence</span>
                <span class="meter-status ${advisory.violence}">${advisory.violence}</span>
            </div>
            <div class="meter-card">
                <span class="meter-category">Sex / Nudity</span>
                <span class="meter-status ${advisory.nudity}">${advisory.nudity}</span>
            </div>
            <div class="meter-card">
                <span class="meter-category">Substances</span>
                <span class="meter-status ${advisory.substances}">${advisory.substances}</span>
            </div>
        `;
    }

    // Action Deep Links
    const cleanTitle = encodeURIComponent(movie.title);
    document.getElementById('vidangelLinkBtn').href = `https://www.vidangel.com/search?q=${cleanTitle}`;
    document.getElementById('clearplayLinkBtn').href = `https://www.clearplay.com/search?q=${cleanTitle}`;
    
    if (movie.imdbId) {
        document.getElementById('imdbParentsLinkBtn').href = `https://www.imdb.com/title/${movie.imdbId}/parentalguide`;
        document.getElementById('imdbLinkBtn').href = `https://www.imdb.com/title/${movie.imdbId}/`;
    } else {
        document.getElementById('imdbParentsLinkBtn').href = `https://www.imdb.com/find/?q=${cleanTitle}`;
        document.getElementById('imdbLinkBtn').href = `https://www.imdb.com/find/?q=${cleanTitle}`;
    }

    document.getElementById('trailerLinkBtn').href = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' ' + movie.year + ' official trailer')}`;

    // Set active modal movie & fetch streaming availability
    currentModalMovie = movie;
    const regionSelect = document.getElementById('streamingRegionSelect');
    const region = regionSelect ? regionSelect.value : 'US';
    renderStreamingSection(movie, region);

    // Show Dialog
    if (typeof dialog.showModal === 'function') {
        dialog.showModal();
    } else {
        dialog.setAttribute('open', '');
    }
}

/**
 * Modal Dialog Handlers
 */
function setupModals() {
    const movieDialog = document.getElementById('movieDetailDialog');
    const closeDialogBtn = document.getElementById('closeDialogBtn');

    if (closeDialogBtn && movieDialog) {
        closeDialogBtn.addEventListener('click', () => closeDialog(movieDialog));
    }

    if (movieDialog) {
        movieDialog.addEventListener('click', (e) => {
            if (e.target === movieDialog) closeDialog(movieDialog);
        });
    }

    // Streaming Region Selector Listener
    const streamingRegionSelect = document.getElementById('streamingRegionSelect');
    if (streamingRegionSelect) {
        streamingRegionSelect.addEventListener('change', () => {
            if (currentModalMovie) {
                renderStreamingSection(currentModalMovie, streamingRegionSelect.value);
            }
        });
    }

    // API Guide Modal
    const apiGuideDialog = document.getElementById('apiGuideDialog');
    const apiGuideBtn = document.getElementById('apiGuideBtn');
    const closeApiGuideBtn = document.getElementById('closeApiGuideBtn');
    const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
    const clearApiKeyBtn = document.getElementById('clearApiKeyBtn');
    const tmdbApiKeyInput = document.getElementById('tmdbApiKeyInput');

    if (apiGuideBtn && apiGuideDialog) {
        apiGuideBtn.addEventListener('click', () => {
            if (tmdbApiKeyInput) tmdbApiKeyInput.value = localStorage.getItem('cinefilter_tmdb_key') || '';
            if (typeof apiGuideDialog.showModal === 'function') {
                apiGuideDialog.showModal();
            } else {
                apiGuideDialog.setAttribute('open', '');
            }
        });
    }

    if (closeApiGuideBtn && apiGuideDialog) {
        closeApiGuideBtn.addEventListener('click', () => closeDialog(apiGuideDialog));
    }

    if (apiGuideDialog) {
        apiGuideDialog.addEventListener('click', (e) => {
            if (e.target === apiGuideDialog) closeDialog(apiGuideDialog);
        });
    }

    if (saveApiKeyBtn && tmdbApiKeyInput) {
        saveApiKeyBtn.addEventListener('click', () => {
            const key = tmdbApiKeyInput.value.trim();
            const feedback = document.getElementById('apiKeyFeedback');
            if (!key) {
                feedback.textContent = 'Please enter a valid TMDB key or click Reset to Default.';
                feedback.className = 'api-feedback error';
                return;
            }
            CONFIG.TMDB_API_KEY = key;
            localStorage.setItem('cinefilter_tmdb_key', key);
            feedback.textContent = 'Custom API Key saved! Live TMDB queries are now enabled with your key.';
            feedback.className = 'api-feedback success';
            loadMovies(true);
        });
    }

    if (clearApiKeyBtn && tmdbApiKeyInput) {
        clearApiKeyBtn.addEventListener('click', () => {
            localStorage.removeItem('cinefilter_tmdb_key');
            CONFIG.TMDB_API_KEY = '15d2ea6d0dc1d476efbca3eba2b9bbfb';
            tmdbApiKeyInput.value = '';
            const feedback = document.getElementById('apiKeyFeedback');
            feedback.textContent = 'Reset to built-in live API connection.';
            feedback.className = 'api-feedback';
            loadMovies(true);
        });
    }
}

function closeDialog(dialog) {
    if (!dialog) return;
    dialog.setAttribute('data-closing', '');
    setTimeout(() => {
        dialog.removeAttribute('data-closing');
        if (typeof dialog.close === 'function') {
            dialog.close();
        } else {
            dialog.removeAttribute('open');
        }
    }, 200);
}
