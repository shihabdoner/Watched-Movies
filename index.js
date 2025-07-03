function toggleTVShows() {
    var TVShowsDIV = document.getElementById("TVShowsDIV");
    TVShowsDIV.style.display = (TVShowsDIV.style.display === "none") ? "block" : "none";
}

function toggleMovies() {
    var moviesDiv = document.getElementById("MoviesDIV");
    moviesDiv.style.display = (moviesDiv.style.display === "none") ? "block" : "none";
}
function toggleAnime() {
    var animesDiv = document.getElementById("AnimeDIV");
    animesDiv.style.display = (animesDiv.style.display === "none") ? "block" : "none";
}

function toggleAnimeinGeneral() {
    const generalDiv = document.getElementById("AnimeinGeneralDIV");
    const moviesButton = document.getElementById("animeMoviesButton");
    const toggleButton = document.querySelector("button[onclick='toggleAnimeinGeneral()']");

    const isVisible = generalDiv.style.display === "block";


    generalDiv.style.display = isVisible ? "none" : "block";

    if (!isVisible) {
        toggleButton.classList.add("active");
    } else {
        toggleButton.classList.remove("active");
    }
}

function toggleAnimeinMovies() {
    const animesDiv = document.getElementById("AnimeMoviesDIV");
    const toggleButton = document.getElementById("animeMoviesButton");

    const isVisible = animesDiv.style.display === "block";
    animesDiv.style.display = isVisible ? "none" : "block";

    if (!isVisible) {
        toggleButton.classList.add("active");
    } else {
        toggleButton.classList.remove("active");
    }
}
function togglePDFs() {
    var moviesDiv = document.getElementById("PDFsDIV");
    moviesDiv.style.display = (moviesDiv.style.display === "none") ? "block" : "none";
}

function toggleFreeComics() {
    const comicsDiv = document.getElementById("FreecomicsDIV");
    const toggleButton = document.querySelector("button[onclick='toggleFreeComics()']");

    const isVisible = comicsDiv.style.display === "block";
    comicsDiv.style.display = isVisible ? "none" : "block";

    if (!isVisible) {
        toggleButton.classList.add("active");
    } else {
        toggleButton.classList.remove("active");
    }
}
function toggleSection(idToShow) {
    const sectionIds = ["TVShowsDIV", "MoviesDIV", "AnimeDIV", "PDFsDIV"];
    const FrontText = document.querySelector(".FrontText");
    let anyVisible = false;

    // Remove 'active' class from all buttons
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => btn.classList.remove("active"));

    sectionIds.forEach(function (id) {
        const div = document.getElementById(id);
        if (id === idToShow) {
            // Toggle clicked section
            const isCurrentlyVisible = div.style.display === "block";
            div.style.display = isCurrentlyVisible ? "none" : "block";
            anyVisible = !isCurrentlyVisible;
            // Add 'active' class to the clicked button only if visible
            if (!isCurrentlyVisible) {
                const clickedButton = document.querySelector(`button[onclick="toggleSection('${id}')"]`);
                if (clickedButton) clickedButton.classList.add("active");
            }
        } else {
            // Hide all other sections
            div.style.display = "none";
        }
    });
    // Show or hide .FrontText based on visibility of any section
    Frnt2.style.display = anyVisible ? "none" : "block";
}
