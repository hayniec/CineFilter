// Curated Movie Catalog for CineFilter
// Bundled with rich metadata, cast, synopsis, runtime, age ratings, and VidAngel / ClearPlay filter status
const MOVIES_DATABASE = [
  {
    "id": "the-dark-knight",
    "title": "The Dark Knight",
    "year": 2008,
    "decade": "2000s",
    "runtime": 152,
    "rating": "PG-13",
    "score": 9.0,
    "genres": [
      "Action",
      "Crime",
      "Drama",
      "Thriller"
    ],
    "cast": [
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart",
      "Michael Caine",
      "Maggie Gyllenhaal",
      "Gary Oldman",
      "Morgan Freeman"
    ],
    "director": "Christopher Nolan",
    "synopsis": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    "poster": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    "imdbId": "tt0468569",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "Moderate",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Filters available for comic-book violence, hospital explosions, knife threats, and mild profanity."
  },
  {
    "id": "inception",
    "title": "Inception",
    "year": 2010,
    "decade": "2010s",
    "runtime": 148,
    "rating": "PG-13",
    "score": 8.8,
    "genres": [
      "Action",
      "Adventure",
      "Sci-Fi",
      "Thriller"
    ],
    "cast": [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Elliot Page",
      "Tom Hardy",
      "Ken Watanabe",
      "Cillian Murphy",
      "Marion Cotillard",
      "Michael Caine"
    ],
    "director": "Christopher Nolan",
    "synopsis": "A skilled thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    "poster": "https://image.tmdb.org/t/p/w500/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
    "imdbId": "tt1375666",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "Moderate",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Action gunplay, zero-gravity fistfights, and some mild swearing can be seamlessly filtered."
  },
  {
    "id": "interstellar",
    "title": "Interstellar",
    "year": 2014,
    "decade": "2010s",
    "runtime": 169,
    "rating": "PG-13",
    "score": 8.7,
    "genres": [
      "Adventure",
      "Drama",
      "Sci-Fi"
    ],
    "cast": [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Jessica Chastain",
      "Michael Caine",
      "Matt Damon",
      "John Lithgow",
      "Timoth\u00e9e Chalamet"
    ],
    "director": "Christopher Nolan",
    "synopsis": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    "poster": "https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg",
    "imdbId": "tt0816692",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "Mild",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Occasional strong language and perilous space distress scenes can be muted or skipped."
  },
  {
    "id": "toy-story",
    "title": "Toy Story",
    "year": 1995,
    "decade": "1990s",
    "runtime": 81,
    "rating": "G",
    "score": 8.3,
    "genres": [
      "Animation",
      "Adventure",
      "Comedy",
      "Family"
    ],
    "cast": [
      "Tom Hanks",
      "Tim Allen",
      "Don Rickles",
      "Jim Varney",
      "Wallace Shawn",
      "John Ratzenberger",
      "Annie Potts"
    ],
    "director": "John Lasseter",
    "synopsis": "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's bedroom.",
    "poster": "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
    "imdbId": "tt0114709",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "None",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Fully family friendly. Very mild toy peril (Sid's scary mutant toys)."
  },
  {
    "id": "finding-nemo",
    "title": "Finding Nemo",
    "year": 2003,
    "decade": "2000s",
    "runtime": 100,
    "rating": "G",
    "score": 8.2,
    "genres": [
      "Animation",
      "Adventure",
      "Comedy",
      "Family"
    ],
    "cast": [
      "Albert Brooks",
      "Ellen DeGeneres",
      "Alexander Gould",
      "Willem Dafoe",
      "Brad Garrett",
      "Allison Janney"
    ],
    "director": "Andrew Stanton",
    "synopsis": "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home, accompanied by a forgetful blue tang fish.",
    "poster": "https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
    "imdbId": "tt0266543",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "None",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Excellent for all ages. Minor underwater peril with Bruce the shark and anglerfish."
  },
  {
    "id": "knives-out",
    "title": "Knives Out",
    "year": 2019,
    "decade": "2010s",
    "runtime": 130,
    "rating": "PG-13",
    "score": 7.9,
    "genres": [
      "Comedy",
      "Crime",
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "cast": [
      "Daniel Craig",
      "Chris Evans",
      "Ana de Armas",
      "Jamie Lee Curtis",
      "Michael Shannon",
      "Don Johnson",
      "Toni Collette",
      "Christopher Plummer"
    ],
    "director": "Rian Johnson",
    "synopsis": "A detective investigates the death of the patriarch of an eccentric, combative family after an 85th birthday party goes awry in a classic whodunit murder mystery.",
    "poster": "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
    "imdbId": "tt8946378",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Moderate",
      "violence": "Mild",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Filters strong language (F-words) and brief bloody cut imagery while keeping the witty mystery intact."
  },
  {
    "id": "back-to-the-future",
    "title": "Back to the Future",
    "year": 1985,
    "decade": "1980s",
    "runtime": 116,
    "rating": "PG",
    "score": 8.5,
    "genres": [
      "Adventure",
      "Comedy",
      "Sci-Fi"
    ],
    "cast": [
      "Michael J. Fox",
      "Christopher Lloyd",
      "Lea Thompson",
      "Crispin Glover",
      "Thomas F. Wilson"
    ],
    "director": "Robert Zemeckis",
    "synopsis": "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
    "poster": "https://image.tmdb.org/t/p/w500/vN5B5WgYscRGcQpVhHl6p9DDTP0.jpg",
    "imdbId": "tt0088763",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "Mild",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Mild 80s profanity and teen bullying can be filtered."
  },
  {
    "id": "jurassic-park",
    "title": "Jurassic Park",
    "year": 1993,
    "decade": "1990s",
    "runtime": 127,
    "rating": "PG-13",
    "score": 8.2,
    "genres": [
      "Action",
      "Adventure",
      "Sci-Fi",
      "Thriller"
    ],
    "cast": [
      "Sam Neill",
      "Laura Dern",
      "Jeff Goldblum",
      "Richard Attenborough",
      "Bob Peck",
      "Martin Ferrero",
      "BD Wong",
      "Samuel L. Jackson"
    ],
    "director": "Steven Spielberg",
    "synopsis": "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    "poster": "https://image.tmdb.org/t/p/w500/d9mtMGQDLANKieb9PbD3yK7xxzo.jpg",
    "imdbId": "tt0107290",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "Moderate",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "T-Rex and raptor suspense, dinosaur attacks, and minor profanity can be filtered."
  },
  {
    "id": "the-truman-show",
    "title": "The Truman Show",
    "year": 1998,
    "decade": "1990s",
    "runtime": 103,
    "rating": "PG",
    "score": 8.2,
    "genres": [
      "Comedy",
      "Drama",
      "Sci-Fi"
    ],
    "cast": [
      "Jim Carrey",
      "Laura Linney",
      "Noah Emmerich",
      "Natascha McElhone",
      "Ed Harris"
    ],
    "director": "Peter Weir",
    "synopsis": "An insurance salesman discovers his whole life is actually a reality TV show broadcast live around the clock across the entire globe, with everyone in his town being a paid actor.",
    "poster": "https://image.tmdb.org/t/p/w500/vuza0WqY239yBXOadKlGwJsZJFE.jpg",
    "imdbId": "tt0120382",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "None",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Very mild content; filters available for mild profanity and subtle suggestive humor."
  },
  {
    "id": "groundhog-day",
    "title": "Groundhog Day",
    "year": 1993,
    "decade": "1990s",
    "runtime": 101,
    "rating": "PG",
    "score": 8.0,
    "genres": [
      "Comedy",
      "Fantasy",
      "Romance"
    ],
    "cast": [
      "Bill Murray",
      "Andie MacDowell",
      "Chris Elliott",
      "Stephen Tobolowsky"
    ],
    "director": "Harold Ramis",
    "synopsis": "A narcissistic TV weatherman finds himself reliving the same day over and over again when he goes on location to the small town of Punxsutawney to film their annual Groundhog Day festival.",
    "poster": "https://image.tmdb.org/t/p/w500/gCgt1WARPZaXnq523ySQEUKinCs.jpg",
    "imdbId": "tt0107048",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "Mild",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Filters for comedic suicide attempts, mild innuendo, and mild profanity."
  },
  {
    "id": "the-princess-bride",
    "title": "The Princess Bride",
    "year": 1987,
    "decade": "1980s",
    "runtime": 98,
    "rating": "PG",
    "score": 8.0,
    "genres": [
      "Adventure",
      "Comedy",
      "Family",
      "Fantasy",
      "Romance"
    ],
    "cast": [
      "Cary Elwes",
      "Robin Wright",
      "Mandy Patinkin",
      "Chris Sarandon",
      "Wallace Shawn",
      "Andr\u00e9 the Giant",
      "Billy Crystal"
    ],
    "director": "Rob Reiner",
    "synopsis": "A bedridden boy's grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.",
    "poster": "https://image.tmdb.org/t/p/w500/2FC9L9MrjBoGHYjYZjdWQdopVYb.jpg",
    "imdbId": "tt0093779",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "Mild",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Swashbuckling swordplay and mild fairytale fantasy peril; great for family viewing."
  },
  {
    "id": "la-la-land",
    "title": "La La Land",
    "year": 2016,
    "decade": "2010s",
    "runtime": 128,
    "rating": "PG-13",
    "score": 8.0,
    "genres": [
      "Comedy",
      "Drama",
      "Music",
      "Romance"
    ],
    "cast": [
      "Ryan Gosling",
      "Emma Stone",
      "John Legend",
      "Rosemarie DeWitt",
      "J.K. Simmons"
    ],
    "director": "Damien Chazelle",
    "synopsis": "While navigating their careers in Los Angeles, a pianist and an aspiring actress fall in love while attempting to reconcile their aspirations for the future.",
    "poster": "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    "imdbId": "tt3783958",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "None",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Mutes a couple of curse words and social party drinking."
  },
  {
    "id": "a-quiet-place",
    "title": "A Quiet Place",
    "year": 2018,
    "decade": "2010s",
    "runtime": 90,
    "rating": "PG-13",
    "score": 7.5,
    "genres": [
      "Drama",
      "Horror",
      "Sci-Fi",
      "Thriller"
    ],
    "cast": [
      "Emily Blunt",
      "John Krasinski",
      "Millicent Simmonds",
      "Noah Jupe"
    ],
    "director": "John Krasinski",
    "synopsis": "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing who hunt down any sound.",
    "poster": "https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
    "imdbId": "tt6644200",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "Moderate",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Terrifying creature jump scares and bloody wound scenes can be skipped."
  },
  {
    "id": "into-the-spider-verse",
    "title": "Spider-Man: Into the Spider-Verse",
    "year": 2018,
    "decade": "2010s",
    "runtime": 117,
    "rating": "PG",
    "score": 8.4,
    "genres": [
      "Animation",
      "Action",
      "Adventure",
      "Sci-Fi"
    ],
    "cast": [
      "Shameik Moore",
      "Jake Johnson",
      "Hailee Steinfeld",
      "Mahershala Ali",
      "Brian Tyree Henry",
      "Lily Tomlin",
      "Nicolas Cage"
    ],
    "director": "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    "synopsis": "Teenager Miles Morales becomes the new Spider-Man of his universe and must join with five alternate-universe spider-powered individuals to stop a threat for all realities.",
    "poster": "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    "imdbId": "tt4633694",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "Mild",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Stylized comic book animation battles and heroic action peril."
  },
  {
    "id": "up",
    "title": "Up",
    "year": 2009,
    "decade": "2000s",
    "runtime": 96,
    "rating": "PG",
    "score": 8.3,
    "genres": [
      "Animation",
      "Adventure",
      "Comedy",
      "Family"
    ],
    "cast": [
      "Ed Asner",
      "Christopher Plummer",
      "Jordan Nagai",
      "Bob Peterson"
    ],
    "director": "Pete Docter",
    "synopsis": "78-year-old Carl Fredricksen travels to Paradise Falls in his home equipped with thousands of balloons, inadvertently taking a young wilderness explorer stowaway named Russell.",
    "poster": "https://image.tmdb.org/t/p/w500/mFvoEwSfLqbcWwFsDjQebn9bzFe.jpg",
    "imdbId": "tt1049413",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "None",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Heartwarming family animation; emotionally poignant opening and cartoon dog airplane dogfights."
  },
  {
    "id": "forrest-gump",
    "title": "Forrest Gump",
    "year": 1994,
    "decade": "1990s",
    "runtime": 142,
    "rating": "PG-13",
    "score": 8.8,
    "genres": [
      "Comedy",
      "Drama",
      "Romance"
    ],
    "cast": [
      "Tom Hanks",
      "Robin Wright",
      "Gary Sinise",
      "Sally Field",
      "Mykelti Williamson"
    ],
    "director": "Robert Zemeckis",
    "synopsis": "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    "poster": "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    "imdbId": "tt0109830",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Moderate",
      "violence": "Moderate",
      "nudity": "Mild",
      "substances": "Moderate"
    },
    "filterSummary": "Filters available for Vietnam war combat, drug use scenes, brief nudity, and language."
  },
  {
    "id": "the-shawshank-redemption",
    "title": "The Shawshank Redemption",
    "year": 1994,
    "decade": "1990s",
    "runtime": 142,
    "rating": "R",
    "score": 9.3,
    "genres": [
      "Drama",
      "Crime"
    ],
    "cast": [
      "Tim Robbins",
      "Morgan Freeman",
      "Bob Gunton",
      "William Sadler",
      "Clancy Brown",
      "Gil Bellows",
      "James Whitmore"
    ],
    "director": "Frank Darabont",
    "synopsis": "A banker convicted of uxoricide forms a friendship over a quarter of a century with a hardened fellow inmate while maintaining his innocence and finding hope through acts of common decency.",
    "poster": "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    "imdbId": "tt0111161",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Severe",
      "violence": "Moderate",
      "nudity": "Mild",
      "substances": "Mild"
    },
    "filterSummary": "Filters strong prison profanity, guard brutality, and prison assault references so viewers can enjoy this #1 rated drama."
  },
  {
    "id": "chef",
    "title": "Chef",
    "year": 2014,
    "decade": "2010s",
    "runtime": 114,
    "rating": "R",
    "score": 7.3,
    "genres": [
      "Comedy",
      "Drama"
    ],
    "cast": [
      "Jon Favreau",
      "Sof\u00eda Vergara",
      "John Leguizamo",
      "Scarlett Johansson",
      "Dustin Hoffman",
      "Oliver Platt",
      "Robert Downey Jr."
    ],
    "director": "Jon Favreau",
    "synopsis": "A head chef quits his promising restaurant job and buys a rundown food truck in an effort to reclaim his creative culinary promise, while piecing his estranged family back together.",
    "poster": "https://image.tmdb.org/t/p/w500/hyp8EXDmO4dSC8V6Q5jU7gD1kcg.jpg",
    "imdbId": "tt2883512",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Severe",
      "violence": "None",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Cleaned up by muting frequent kitchen F-bombs, turning it into a wholesome, feel-good family food road trip."
  },
  {
    "id": "pulp-fiction",
    "title": "Pulp Fiction",
    "year": 1994,
    "decade": "1990s",
    "runtime": 154,
    "rating": "R",
    "score": 8.9,
    "genres": [
      "Crime",
      "Drama"
    ],
    "cast": [
      "John Travolta",
      "Samuel L. Jackson",
      "Uma Thurman",
      "Bruce Willis",
      "Ving Rhames",
      "Harvey Keitel",
      "Tim Roth"
    ],
    "director": "Quentin Tarantino",
    "synopsis": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    "poster": "https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
    "imdbId": "tt0110912",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Severe",
      "violence": "Severe",
      "nudity": "Moderate",
      "substances": "Severe"
    },
    "filterSummary": "Extensively filterable for graphic violence, drug overdoses, sexual assault scene, and heavy profanity."
  },
  {
    "id": "the-avengers",
    "title": "The Avengers",
    "year": 2012,
    "decade": "2010s",
    "runtime": 143,
    "rating": "PG-13",
    "score": 8.0,
    "genres": [
      "Action",
      "Adventure",
      "Sci-Fi"
    ],
    "cast": [
      "Robert Downey Jr.",
      "Chris Evans",
      "Mark Ruffalo",
      "Chris Hemsworth",
      "Scarlett Johansson",
      "Jeremy Renner",
      "Tom Hiddleston",
      "Samuel L. Jackson"
    ],
    "director": "Joss Whedon",
    "synopsis": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    "poster": "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    "imdbId": "tt0848228",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "Moderate",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Filters available for alien invasion destruction, superhero violence, and mild profanity."
  },
  {
    "id": "the-fellowship-of-the-ring",
    "title": "The Lord of the Rings: The Fellowship of the Ring",
    "year": 2001,
    "decade": "2000s",
    "runtime": 178,
    "rating": "PG-13",
    "score": 8.9,
    "genres": [
      "Action",
      "Adventure",
      "Drama",
      "Fantasy"
    ],
    "cast": [
      "Elijah Wood",
      "Ian McKellen",
      "Viggo Mortensen",
      "Sean Astin",
      "Orlando Bloom",
      "John Rhys-Davies",
      "Sean Bean",
      "Cate Blanchett"
    ],
    "director": "Peter Jackson",
    "synopsis": "A meek Hobbit from the Shire and eight companions set out on a perilous journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    "poster": "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    "imdbId": "tt0120737",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "Moderate",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Zero profanity or nudity; filters allow softening of scary Orc battles and decapitations for younger kids."
  },
  {
    "id": "star-wars-a-new-hope",
    "title": "Star Wars: Episode IV - A New Hope",
    "year": 1977,
    "decade": "1970s",
    "runtime": 121,
    "rating": "PG",
    "score": 8.6,
    "genres": [
      "Action",
      "Adventure",
      "Fantasy",
      "Sci-Fi"
    ],
    "cast": [
      "Mark Hamill",
      "Harrison Ford",
      "Carrie Fisher",
      "Peter Cushing",
      "Alec Guinness",
      "Anthony Daniels",
      "Kenny Baker"
    ],
    "director": "George Lucas",
    "synopsis": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to rescue Princess Leia from the Empire's battle station and destroy the Death Star.",
    "poster": "https://image.tmdb.org/t/p/w500/fai0rspsNeJCS69wHNjOdWxcI7P.jpg",
    "imdbId": "tt0076759",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "Mild",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Classic space adventure; cantina scuffle and charred skeleton scene are filterable."
  },
  {
    "id": "the-matrix",
    "title": "The Matrix",
    "year": 1999,
    "decade": "1990s",
    "runtime": 136,
    "rating": "R",
    "score": 8.7,
    "genres": [
      "Action",
      "Sci-Fi"
    ],
    "cast": [
      "Keanu Reeves",
      "Laurence Fishburne",
      "Carrie-Anne Moss",
      "Hugo Weaving",
      "Joe Pantoliano"
    ],
    "director": "Lana Wachowski, Lilly Wachowski",
    "synopsis": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    "poster": "https://image.tmdb.org/t/p/w500/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg",
    "imdbId": "tt0133093",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Moderate",
      "violence": "Moderate",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Filters martial arts gun battles, bloody lobby sequence, and profanity to make it PG-13 friendly."
  },
  {
    "id": "the-lion-king",
    "title": "The Lion King",
    "year": 1994,
    "decade": "1990s",
    "runtime": 88,
    "rating": "G",
    "score": 8.5,
    "genres": [
      "Animation",
      "Adventure",
      "Drama",
      "Family",
      "Music"
    ],
    "cast": [
      "Matthew Broderick",
      "James Earl Jones",
      "Jeremy Irons",
      "Nathan Lane",
      "Ernie Sabella",
      "Whoopi Goldberg"
    ],
    "director": "Roger Allers, Rob Minkoff",
    "synopsis": "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself. After tragedy strikes, Simba flees and must find the courage to return.",
    "poster": "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    "imdbId": "tt0110357",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "None",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "G-rated Disney masterpiece. Mild wildebeest stampede peril."
  },
  {
    "id": "the-godfather",
    "title": "The Godfather",
    "year": 1972,
    "decade": "1970s",
    "runtime": 175,
    "rating": "R",
    "score": 9.2,
    "genres": [
      "Crime",
      "Drama"
    ],
    "cast": [
      "Marlon Brando",
      "Al Pacino",
      "James Caan",
      "Richard Castellano",
      "Robert Duvall",
      "Diane Keaton"
    ],
    "director": "Francis Ford Coppola",
    "synopsis": "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
    "poster": "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    "imdbId": "tt0068646",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Moderate",
      "violence": "Severe",
      "nudity": "Mild",
      "substances": "Moderate"
    },
    "filterSummary": "Filters mob hits, horse head in bed scene, toll booth shooting, and period profanity."
  },
  {
    "id": "se7en",
    "title": "Se7en",
    "year": 1995,
    "decade": "1990s",
    "runtime": 127,
    "rating": "R",
    "score": 8.6,
    "genres": [
      "Crime",
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "cast": [
      "Brad Pitt",
      "Morgan Freeman",
      "Gwyneth Paltrow",
      "Kevin Spacey",
      "John C. McGinley"
    ],
    "director": "David Fincher",
    "synopsis": "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives in a dark, rain-soaked city.",
    "poster": "https://image.tmdb.org/t/p/w500/191nKfP0ehp3uIvWqgPbFmI4lv9.jpg",
    "imdbId": "tt0114369",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Severe",
      "violence": "Severe",
      "nudity": "Mild",
      "substances": "None"
    },
    "filterSummary": "Heavy murder crime scenes, grisly crime photos, and intense language can be filtered."
  },
  {
    "id": "wall-e",
    "title": "WALL\u00b7E",
    "year": 2008,
    "decade": "2000s",
    "runtime": 98,
    "rating": "G",
    "score": 8.4,
    "genres": [
      "Animation",
      "Adventure",
      "Family",
      "Sci-Fi"
    ],
    "cast": [
      "Ben Burtt",
      "Elissa Knight",
      "Jeff Garlin",
      "Fred Willard",
      "John Ratzenberger",
      "Sigourney Weaver"
    ],
    "director": "Andrew Stanton",
    "synopsis": "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
    "poster": "https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
    "imdbId": "tt0910970",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "None",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Wholesome G-rated masterpiece with visual storytelling suitable for any age."
  },
  {
    "id": "ratatouille",
    "title": "Ratatouille",
    "year": 2007,
    "decade": "2000s",
    "runtime": 111,
    "rating": "G",
    "score": 8.1,
    "genres": [
      "Animation",
      "Comedy",
      "Family",
      "Fantasy"
    ],
    "cast": [
      "Patton Oswalt",
      "Ian Holm",
      "Lou Romano",
      "Brian Dennehy",
      "Peter Sohn",
      "Peter O'Toole"
    ],
    "director": "Brad Bird",
    "synopsis": "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous Paris restaurant to realize his dream of becoming a master chef.",
    "poster": "https://image.tmdb.org/t/p/w500/t3vaWRPSf6WjDSamIkKDs1iQWna.jpg",
    "imdbId": "tt0382932",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "None",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Delightful for all ages; mild shotgun discharge in opening and wine tasting."
  },
  {
    "id": "spirited-away",
    "title": "Spirited Away",
    "year": 2001,
    "decade": "2000s",
    "runtime": 125,
    "rating": "PG",
    "score": 8.6,
    "genres": [
      "Animation",
      "Adventure",
      "Family",
      "Fantasy",
      "Mystery"
    ],
    "cast": [
      "Rumi Hiiragi",
      "Miyu Irino",
      "Mari Natsuki",
      "Takashi Naito",
      "Daveigh Chase",
      "Suzanne Pleshette"
    ],
    "director": "Hayao Miyazaki",
    "synopsis": "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
    "poster": "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    "imdbId": "tt0245429",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "Mild",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Surreal spirit world transformations (parents turning into pigs, No-Face eating monsters) can be skipped for small children."
  },
  {
    "id": "stand-by-me",
    "title": "Stand by Me",
    "year": 1986,
    "decade": "1980s",
    "runtime": 89,
    "rating": "R",
    "score": 8.1,
    "genres": [
      "Adventure",
      "Drama"
    ],
    "cast": [
      "Wil Wheaton",
      "River Phoenix",
      "Corey Feldman",
      "Jerry O'Connell",
      "Kiefer Sutherland",
      "Richard Dreyfuss"
    ],
    "director": "Rob Reiner",
    "synopsis": "After the death of one of his friends, a writer recounts a childhood journey with his three buddies to find the body of a missing boy near their Oregon hometown.",
    "poster": "https://image.tmdb.org/t/p/w500/vz0w9BSehcqjDcJOjRaCk7fgJe7.jpg",
    "imdbId": "tt0092005",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Severe",
      "violence": "Mild",
      "nudity": "None",
      "substances": "Moderate"
    },
    "filterSummary": "Kids' swearing, smoking, and the famous pie-eating barf-o-rama scene are completely filterable."
  },
  {
    "id": "parasite",
    "title": "Parasite",
    "year": 2019,
    "decade": "2010s",
    "runtime": 132,
    "rating": "R",
    "score": 8.5,
    "genres": [
      "Comedy",
      "Drama",
      "Thriller"
    ],
    "cast": [
      "Song Kang-ho",
      "Lee Sun-kyun",
      "Cho Yeo-jeong",
      "Choi Woo-shik",
      "Park So-dam",
      "Lee Jung-eun"
    ],
    "director": "Bong Joon-ho",
    "synopsis": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    "poster": "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    "imdbId": "tt6751668",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Moderate",
      "violence": "Severe",
      "nudity": "Mild",
      "substances": "Mild"
    },
    "filterSummary": "Filters violent climax, sensual couch scene, and strong language in this Oscar Best Picture winner."
  },
  {
    "id": "avatar",
    "title": "Avatar",
    "year": 2009,
    "decade": "2000s",
    "runtime": 162,
    "rating": "PG-13",
    "score": 7.9,
    "genres": [
      "Action",
      "Adventure",
      "Fantasy",
      "Sci-Fi"
    ],
    "cast": [
      "Sam Worthington",
      "Zoe Saldana",
      "Sigourney Weaver",
      "Stephen Lang",
      "Michelle Rodriguez"
    ],
    "director": "James Cameron",
    "synopsis": "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    "poster": "https://image.tmdb.org/t/p/w500/gKY6q7SjCkAU6FqvqWybDYgUKIF.jpg",
    "imdbId": "tt0499549",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "Moderate",
      "nudity": "Mild",
      "substances": "Mild"
    },
    "filterSummary": "Filters sci-fi gun battles, alien animal attacks, Na'vi ritual mating, and mild swearing."
  },
  {
    "id": "dune",
    "title": "Dune",
    "year": 2021,
    "decade": "2020s",
    "runtime": 155,
    "rating": "PG-13",
    "score": 8.0,
    "genres": [
      "Action",
      "Adventure",
      "Drama",
      "Sci-Fi"
    ],
    "cast": [
      "Timoth\u00e9e Chalamet",
      "Rebecca Ferguson",
      "Oscar Isaac",
      "Josh Brolin",
      "Stellan Skarsg\u00e5rd",
      "Dave Bautista",
      "Zendaya",
      "Javier Bardem"
    ],
    "director": "Denis Villeneuve",
    "synopsis": "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future on the desert planet Arrakis.",
    "poster": "https://image.tmdb.org/t/p/w500/v1tRXZ4JtD2Iv6fjkPvT4GiwslV.jpg",
    "imdbId": "tt1160419",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "Moderate",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Sword fights, giant sandworm attacks, and brief disturbing visions can be filtered."
  },
  {
    "id": "across-the-spider-verse",
    "title": "Spider-Man: Across the Spider-Verse",
    "year": 2023,
    "decade": "2020s",
    "runtime": 140,
    "rating": "PG",
    "score": 8.6,
    "genres": [
      "Animation",
      "Action",
      "Adventure",
      "Sci-Fi"
    ],
    "cast": [
      "Shameik Moore",
      "Hailee Steinfeld",
      "Brian Tyree Henry",
      "Luna Lauren Velez",
      "Jake Johnson",
      "Oscar Isaac",
      "Jason Schwartzman",
      "Daniel Kaluuya"
    ],
    "director": "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
    "synopsis": "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When heroes clash, Miles must redefine what it means to be a hero.",
    "poster": "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    "imdbId": "tt9362722",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "Mild",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Visual spectacular animation; mild cartoon combat and emotional parent-teen tension."
  },
  {
    "id": "oppenheimer",
    "title": "Oppenheimer",
    "year": 2023,
    "decade": "2020s",
    "runtime": 180,
    "rating": "R",
    "score": 8.9,
    "genres": [
      "Drama",
      "History",
      "Thriller"
    ],
    "cast": [
      "Cillian Murphy",
      "Emily Blunt",
      "Matt Damon",
      "Robert Downey Jr.",
      "Florence Pugh",
      "Josh Hartnett",
      "Casey Affleck",
      "Rami Malek",
      "Kenneth Branagh"
    ],
    "director": "Christopher Nolan",
    "synopsis": "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during the Manhattan Project.",
    "poster": "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    "imdbId": "tt15398776",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Moderate",
      "violence": "Mild",
      "nudity": "Moderate",
      "substances": "Moderate"
    },
    "filterSummary": "Very popular on VidAngel to remove the full-frontal intimate scenes while keeping the historic drama intact."
  },
  {
    "id": "alien",
    "title": "Alien",
    "year": 1979,
    "decade": "1970s",
    "runtime": 117,
    "rating": "R",
    "score": 8.5,
    "genres": [
      "Horror",
      "Sci-Fi"
    ],
    "cast": [
      "Sigourney Weaver",
      "Tom Skerritt",
      "John Hurt",
      "Veronica Cartwright",
      "Harry Dean Stanton",
      "Ian Holm"
    ],
    "director": "Ridley Scott",
    "synopsis": "The crew of a commercial spacecraft encounter a deadly lifeform after investigating an unknown transmission on a remote moon.",
    "poster": "https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
    "imdbId": "tt0078748",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Moderate",
      "violence": "Severe",
      "nudity": "Mild",
      "substances": "Mild"
    },
    "filterSummary": "Filters the iconic chestburster gore, acid blood scenes, and strong profanity."
  },
  {
    "id": "gladiator",
    "title": "Gladiator",
    "year": 2000,
    "decade": "2000s",
    "runtime": 155,
    "rating": "R",
    "score": 8.5,
    "genres": [
      "Action",
      "Adventure",
      "Drama"
    ],
    "cast": [
      "Russell Crowe",
      "Joaquin Phoenix",
      "Connie Nielsen",
      "Oliver Reed",
      "Richard Harris",
      "Derek Jacobi",
      "Djimon Hounsou"
    ],
    "director": "Ridley Scott",
    "synopsis": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery in the Colosseum.",
    "poster": "https://image.tmdb.org/t/p/w500/aDb548BOkFfI4nFm0kx8A3Ezh7H.jpg",
    "imdbId": "tt0172495",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "Severe",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Zero profanity or sexuality; extensive filters for decapitations and colosseum bloodletting."
  },
  {
    "id": "her",
    "title": "Her",
    "year": 2013,
    "decade": "2010s",
    "runtime": 126,
    "rating": "R",
    "score": 8.0,
    "genres": [
      "Drama",
      "Romance",
      "Sci-Fi"
    ],
    "cast": [
      "Joaquin Phoenix",
      "Scarlett Johansson",
      "Amy Adams",
      "Rooney Mara",
      "Chris Pratt",
      "Olivia Wilde"
    ],
    "director": "Spike Jonze",
    "synopsis": "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    "poster": "https://image.tmdb.org/t/p/w500/eCOtqtfvn7mxGl6nfmq4b1exJRc.jpg",
    "imdbId": "tt1798709",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Moderate",
      "violence": "None",
      "nudity": "Moderate",
      "substances": "Mild"
    },
    "filterSummary": "Filters sexually explicit audio phone scenes, brief nudity, and language."
  },
  {
    "id": "eternal-sunshine",
    "title": "Eternal Sunshine of the Spotless Mind",
    "year": 2004,
    "decade": "2000s",
    "runtime": 108,
    "rating": "R",
    "score": 8.3,
    "genres": [
      "Drama",
      "Romance",
      "Sci-Fi"
    ],
    "cast": [
      "Jim Carrey",
      "Kate Winslet",
      "Kirsten Dunst",
      "Mark Ruffalo",
      "Elijah Wood",
      "Tom Wilkinson"
    ],
    "director": "Michel Gondry",
    "synopsis": "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
    "poster": "https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg",
    "imdbId": "tt0338013",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Moderate",
      "violence": "None",
      "nudity": "Mild",
      "substances": "Moderate"
    },
    "filterSummary": "Filters strong language, suggestive scenes, and marijuana use."
  },
  {
    "id": "ferris-bueller",
    "title": "Ferris Bueller's Day Off",
    "year": 1986,
    "decade": "1980s",
    "runtime": 103,
    "rating": "PG-13",
    "score": 7.8,
    "genres": [
      "Comedy"
    ],
    "cast": [
      "Matthew Broderick",
      "Alan Ruck",
      "Mia Sara",
      "Jeffrey Jones",
      "Jennifer Grey"
    ],
    "director": "John Hughes",
    "synopsis": "A high school wise guy is determined to have a day off from school, despite what the Principal thinks of that, embarking on a wild Chicago adventure.",
    "poster": "https://image.tmdb.org/t/p/w500/9LTQNCvoLsKXP0LtaKAaYVtRaQL.jpg",
    "imdbId": "tt0091042",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "None",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Filters some 80s swearing and Principal Rooney's slapstick humiliations."
  },
  {
    "id": "the-incredibles",
    "title": "The Incredibles",
    "year": 2004,
    "decade": "2000s",
    "runtime": 115,
    "rating": "PG",
    "score": 8.0,
    "genres": [
      "Animation",
      "Action",
      "Adventure",
      "Family"
    ],
    "cast": [
      "Craig T. Nelson",
      "Holly Hunter",
      "Samuel L. Jackson",
      "Jason Lee",
      "Wallace Shawn",
      "Sarah Vowell",
      "Brad Bird"
    ],
    "director": "Brad Bird",
    "synopsis": "While trying to lead a quiet suburban life, a family of undercover superheroes are forced into action to save the world from a vengeful inventor.",
    "poster": "https://image.tmdb.org/t/p/w500/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg",
    "imdbId": "tt0317705",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "Mild",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Superhero action peril, explosions, and mild comic book violence."
  },
  {
    "id": "coco",
    "title": "Coco",
    "year": 2017,
    "decade": "2010s",
    "runtime": 105,
    "rating": "PG",
    "score": 8.4,
    "genres": [
      "Animation",
      "Adventure",
      "Family",
      "Fantasy",
      "Music"
    ],
    "cast": [
      "Anthony Gonzalez",
      "Gael Garc\u00eda Bernal",
      "Benjamin Bratt",
      "Alanna Ubach",
      "Ren\u00e9e Victor"
    ],
    "director": "Lee Unkrich, Adrian Molina",
    "synopsis": "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    "poster": "https://image.tmdb.org/t/p/w500/6Ryitt95xrO8KXuqRGm1fUuNwqF.jpg",
    "imdbId": "tt2380307",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "None",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Family friendly Day of the Dead celebration; skeleton imagery and emotional family reconciliation."
  },
  {
    "id": "titanic",
    "title": "Titanic",
    "year": 1997,
    "decade": "1990s",
    "runtime": 194,
    "rating": "PG-13",
    "score": 7.9,
    "genres": [
      "Drama",
      "Romance"
    ],
    "cast": [
      "Leonardo DiCaprio",
      "Kate Winslet",
      "Billy Zane",
      "Kathy Bates",
      "Frances Fisher",
      "Bill Paxton",
      "Gloria Stuart"
    ],
    "director": "James Cameron",
    "synopsis": "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    "poster": "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    "imdbId": "tt0120338",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "Moderate",
      "nudity": "Moderate",
      "substances": "Mild"
    },
    "filterSummary": "Extremely popular for filtering: removes the nude sketching portrait and car scene, and tones down ship disaster panic."
  },
  {
    "id": "soul",
    "title": "Soul",
    "year": 2020,
    "decade": "2020s",
    "runtime": 100,
    "rating": "PG",
    "score": 8.0,
    "genres": [
      "Animation",
      "Adventure",
      "Comedy",
      "Drama",
      "Family",
      "Music"
    ],
    "cast": [
      "Jamie Foxx",
      "Tina Fey",
      "Graham Norton",
      "Rachel House",
      "Alice Braga",
      "Richard Ayoade",
      "Phylicia Rashad",
      "Questlove"
    ],
    "director": "Pete Docter, Kemp Powers",
    "synopsis": "After landing the gig of a lifetime, a New York jazz pianist suddenly finds himself trapped in a strange land between Earth and the afterlife.",
    "poster": "https://image.tmdb.org/t/p/w500/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg",
    "imdbId": "tt2948372",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "None",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Wonderful existential family film about passions and living life to the fullest."
  },
  {
    "id": "the-martian",
    "title": "The Martian",
    "year": 2015,
    "decade": "2010s",
    "runtime": 144,
    "rating": "PG-13",
    "score": 8.0,
    "genres": [
      "Adventure",
      "Drama",
      "Sci-Fi"
    ],
    "cast": [
      "Matt Damon",
      "Jessica Chastain",
      "Kristen Wiig",
      "Jeff Daniels",
      "Michael Pe\u00f1a",
      "Sean Bean",
      "Kate Mara",
      "Sebastian Stan",
      "Chiwetel Ejiofor"
    ],
    "director": "Ridley Scott",
    "synopsis": "An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity and science to find a way to signal to Earth that he is alive.",
    "poster": "https://image.tmdb.org/t/p/w500/5BHuvQ6p9kfc091Z8RiFNhCwL4b.jpg",
    "imdbId": "tt3659388",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Moderate",
      "violence": "Mild",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Filters strong swearing (F-bombs) and surgical self-stapling scene on Mars."
  },
  {
    "id": "paddington-2",
    "title": "Paddington 2",
    "year": 2017,
    "decade": "2010s",
    "runtime": 103,
    "rating": "PG",
    "score": 7.8,
    "genres": [
      "Adventure",
      "Comedy",
      "Family"
    ],
    "cast": [
      "Hugh Bonneville",
      "Sally Hawkins",
      "Hugh Grant",
      "Brendan Gleeson",
      "Julie Walters",
      "Jim Broadbent",
      "Peter Capaldi",
      "Ben Whishaw"
    ],
    "director": "Paul King",
    "synopsis": "Paddington, now happily settled with the Brown family and a popular member of the local community, picks up a series of odd jobs to buy the perfect present for his Aunt Lucy's 100th birthday, only for the gift to be stolen.",
    "poster": "https://image.tmdb.org/t/p/w500/1OJ9vkD5xPt3skC6KguyXAgagRZ.jpg",
    "imdbId": "tt4468740",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "None",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Universal acclaim, pure wholesome joy for the entire family."
  },
  {
    "id": "the-sixth-sense",
    "title": "The Sixth Sense",
    "year": 1999,
    "decade": "1990s",
    "runtime": 107,
    "rating": "PG-13",
    "score": 8.2,
    "genres": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "cast": [
      "Bruce Willis",
      "Haley Joel Osment",
      "Toni Collette",
      "Olivia Williams",
      "Donnie Wahlberg"
    ],
    "director": "M. Night Shyamalan",
    "synopsis": "A child psychologist starts treating a young boy who claims to see and talk to the dead, leading both to discover a shocking truth.",
    "poster": "https://image.tmdb.org/t/p/w500/vOyfUXNFSnaTk7Vk5AjpsKTUWsu.jpg",
    "imdbId": "tt0167404",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "Moderate",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Filters ghostly jump scares, bloody head wounds, and eerie suspense moments."
  },
  {
    "id": "whiplash",
    "title": "Whiplash",
    "year": 2014,
    "decade": "2010s",
    "runtime": 106,
    "rating": "R",
    "score": 8.5,
    "genres": [
      "Drama",
      "Music"
    ],
    "cast": [
      "Miles Teller",
      "J.K. Simmons",
      "Paul Reiser",
      "Melissa Benoist"
    ],
    "director": "Damien Chazelle",
    "synopsis": "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    "poster": "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    "imdbId": "tt2582802",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Severe",
      "violence": "Mild",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Filters Fletcher's nonstop verbal abuse and severe cursing so audiences can focus on the incredible musical performances."
  },
  {
    "id": "the-grand-budapest-hotel",
    "title": "The Grand Budapest Hotel",
    "year": 2014,
    "decade": "2010s",
    "runtime": 99,
    "rating": "R",
    "score": 8.1,
    "genres": [
      "Adventure",
      "Comedy",
      "Crime"
    ],
    "cast": [
      "Ralph Fiennes",
      "Tony Revolori",
      "F. Murray Abraham",
      "Mathieu Amalric",
      "Adrien Brody",
      "Willem Dafoe",
      "Jeff Goldblum",
      "Saoirse Ronan",
      "Edward Norton",
      "Bill Murray",
      "Owen Wilson"
    ],
    "director": "Wes Anderson",
    "synopsis": "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    "poster": "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    "imdbId": "tt2278388",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Moderate",
      "violence": "Moderate",
      "nudity": "Mild",
      "substances": "Mild"
    },
    "filterSummary": "Filters quirky violence (severed fingers), brief painting nudity, and eccentric profanity."
  },
  {
    "id": "raiders-of-the-lost-ark",
    "title": "Raiders of the Lost Ark",
    "year": 1981,
    "decade": "1980s",
    "runtime": 115,
    "rating": "PG",
    "score": 8.4,
    "genres": [
      "Action",
      "Adventure"
    ],
    "cast": [
      "Harrison Ford",
      "Karen Allen",
      "Paul Freeman",
      "Ronald Lacey",
      "John Rhys-Davies",
      "Denholm Elliott"
    ],
    "director": "Steven Spielberg",
    "synopsis": "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler's forces can obtain its awesome powers.",
    "poster": "https://image.tmdb.org/t/p/w500/ceG9VzoRAVGwivFU403Wc3AHRys.jpg",
    "imdbId": "tt0082971",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "Moderate",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Famous face-melting Ark climax and airplane propeller fight can be softened for younger children."
  },
  {
    "id": "top-gun-maverick",
    "title": "Top Gun: Maverick",
    "year": 2022,
    "decade": "2020s",
    "runtime": 130,
    "rating": "PG-13",
    "score": 8.3,
    "genres": [
      "Action",
      "Drama"
    ],
    "cast": [
      "Tom Cruise",
      "Miles Teller",
      "Jennifer Connelly",
      "Jon Hamm",
      "Glen Powell",
      "Lewis Pullman",
      "Ed Harris",
      "Val Kilmer"
    ],
    "director": "Joseph Kosinski",
    "synopsis": "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on an impossible mission.",
    "poster": "https://image.tmdb.org/t/p/w500/n0YuM4f5lvGAP6MAW2kBIzugXnc.jpg",
    "imdbId": "tt1745960",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "Mild",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "A huge hit on VidAngel: mutes occasional strong language; aerial dogfight combat remains thrilling."
  },
  {
    "id": "casablanca",
    "title": "Casablanca",
    "year": 1942,
    "decade": "Classic",
    "runtime": 102,
    "rating": "PG",
    "score": 8.5,
    "genres": [
      "Drama",
      "Romance",
      "War"
    ],
    "cast": [
      "Humphrey Bogart",
      "Ingrid Bergman",
      "Paul Henreid",
      "Claude Rains",
      "Conrad Veidt",
      "Sydney Greenstreet",
      "Peter Lorre"
    ],
    "director": "Michael Curtiz",
    "synopsis": "A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.",
    "poster": "https://image.tmdb.org/t/p/w500/lGCEKlJo2CnWydQj7aamY7s1S7Q.jpg",
    "imdbId": "tt0034583",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "Mild",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Timeless golden age classic with virtually no objectionable content beyond social cigarette smoking."
  },
  {
    "id": "singin-in-the-rain",
    "title": "Singin' in the Rain",
    "year": 1952,
    "decade": "Classic",
    "runtime": 103,
    "rating": "G",
    "score": 8.3,
    "genres": [
      "Comedy",
      "Music",
      "Romance"
    ],
    "cast": [
      "Gene Kelly",
      "Donald O'Connor",
      "Debbie Reynolds",
      "Jean Hagen",
      "Millard Mitchell"
    ],
    "director": "Stanley Donen, Gene Kelly",
    "synopsis": "A silent film star falls for a chorus girl just as he and his jealous screen partner are being maneuvered into their first talking picture in 1920s Hollywood.",
    "poster": "https://image.tmdb.org/t/p/w500/zjrpWniKbzu0zFR5sUI1Ptdfl9y.jpg",
    "imdbId": "tt0045152",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "None",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Pure musical joy, clean and delightful for audiences of all ages."
  },
  {
    "id": "monty-python-holy-grail",
    "title": "Monty Python and the Holy Grail",
    "year": 1975,
    "decade": "1970s",
    "runtime": 91,
    "rating": "PG",
    "score": 8.2,
    "genres": [
      "Adventure",
      "Comedy",
      "Fantasy"
    ],
    "cast": [
      "Graham Chapman",
      "John Cleese",
      "Eric Idle",
      "Terry Gilliam",
      "Terry Jones",
      "Michael Palin"
    ],
    "director": "Terry Gilliam, Terry Jones",
    "synopsis": "King Arthur and his Knights of the Round Table embark on a surreal search for the Holy Grail, encountering many silly obstacles including the Black Knight and the Killer Rabbit.",
    "poster": "https://image.tmdb.org/t/p/w500/7nTkHjETdGMYK1phHwDbPsrzbYl.jpg",
    "imdbId": "tt0071853",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Mild",
      "violence": "Moderate",
      "nudity": "Mild",
      "substances": "None"
    },
    "filterSummary": "Filters slapstick dismemberment (Black Knight) and cheeky British humor (Castle Anthrax)."
  },
  {
    "id": "the-sound-of-music",
    "title": "The Sound of Music",
    "year": 1965,
    "decade": "Classic",
    "runtime": 172,
    "rating": "G",
    "score": 8.1,
    "genres": [
      "Biography",
      "Drama",
      "Family",
      "Music",
      "Romance"
    ],
    "cast": [
      "Julie Andrews",
      "Christopher Plummer",
      "Eleanor Parker",
      "Richard Haydn",
      "Peggy Wood"
    ],
    "director": "Robert Wise",
    "synopsis": "A young novice who is sent to be the governess to the seven children of a widowed naval captain brings music, joy, and laughter into their lives in pre-WWII Austria.",
    "poster": "https://image.tmdb.org/t/p/w500/c6CrUZypAsBCaRWX0M3RVRDbhNS.jpg",
    "imdbId": "tt0059742",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "None",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "A beloved family staple with iconic songs; gentle and clean for all generations."
  },
  {
    "id": "get-out",
    "title": "Get Out",
    "year": 2017,
    "decade": "2010s",
    "runtime": 104,
    "rating": "R",
    "score": 7.8,
    "genres": [
      "Horror",
      "Mystery",
      "Thriller"
    ],
    "cast": [
      "Daniel Kaluuya",
      "Allison Williams",
      "Bradley Whitford",
      "Catherine Keener",
      "Caleb Landry Jones",
      "Lil Rel Howery",
      "LaKeith Stanfield"
    ],
    "director": "Jordan Peele",
    "synopsis": "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
    "poster": "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
    "imdbId": "tt5052448",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "Severe",
      "violence": "Moderate",
      "nudity": "None",
      "substances": "Mild"
    },
    "filterSummary": "Filters profanity, psychological hypnosis distress, and bloody escape sequence."
  },
  {
    "id": "inside-out",
    "title": "Inside Out",
    "year": 2015,
    "decade": "2010s",
    "runtime": 95,
    "rating": "PG",
    "score": 8.1,
    "genres": [
      "Animation",
      "Adventure",
      "Comedy",
      "Drama",
      "Family",
      "Fantasy"
    ],
    "cast": [
      "Amy Poehler",
      "Phyllis Smith",
      "Richard Kind",
      "Bill Hader",
      "Lewis Black",
      "Mindy Kaling",
      "Kaitlyn Dias",
      "Diane Lane",
      "Kyle MacLachlan"
    ],
    "director": "Pete Docter",
    "synopsis": "After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school.",
    "poster": "https://image.tmdb.org/t/p/w500/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg",
    "imdbId": "tt2096673",
    "vidangelFilterable": true,
    "clearplayFilterable": true,
    "contentAdvisory": {
      "profanity": "None",
      "violence": "None",
      "nudity": "None",
      "substances": "None"
    },
    "filterSummary": "Masterful animated exploration of emotional health; completely family safe."
  }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MOVIES_DATABASE };
}
