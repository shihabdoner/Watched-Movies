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
    const toggleButton = document.querySelector("button[onclick='toggleAnimeinGeneral()']");
    const slideBox = generalDiv.closest(".slide-content");
    const isOpen = generalDiv.classList.contains("open");

    if (isOpen) {
        // Closing: Set maxHeight to current height first to enable transition
        generalDiv.style.maxHeight = generalDiv.scrollHeight + "px";
        requestAnimationFrame(() => {
            generalDiv.style.maxHeight = "0";
        });
        generalDiv.classList.remove("open");
        toggleButton.classList.remove("active");
    } else {
        // Opening: Start from 0, then set maxHeight to scrollHeight to trigger animation
        generalDiv.style.maxHeight = "0";
        generalDiv.classList.add("open");
        requestAnimationFrame(() => {
            generalDiv.style.maxHeight = generalDiv.scrollHeight + "px";
        });
        toggleButton.classList.add("active");
    }

    // Adjust parent container height
    requestAnimationFrame(() => {
        slideBox.style.maxHeight = slideBox.scrollHeight + "px";
    });
}

function toggleAnimeinMovies() {
    const animesDiv = document.getElementById("AnimeMoviesDIV");
    const toggleButton = document.getElementById("animeMoviesButton");
    const slideBox = animesDiv.closest(".slide-content");
    const isOpen = animesDiv.classList.contains("open");

    if (isOpen) {
        animesDiv.style.maxHeight = animesDiv.scrollHeight + "px";
        requestAnimationFrame(() => {
            animesDiv.style.maxHeight = "0";
        });
        animesDiv.classList.remove("open");
        toggleButton.classList.remove("active");
    } else {
        animesDiv.style.maxHeight = "0";
        animesDiv.classList.add("open");
        requestAnimationFrame(() => {
            animesDiv.style.maxHeight = animesDiv.scrollHeight + "px";
        });
        toggleButton.classList.add("active");
    }

    requestAnimationFrame(() => {
        slideBox.style.maxHeight = slideBox.scrollHeight + "px";
    });
}


function toggleDocuments() {
    var moviesDiv = document.getElementById("DocumentsDIV");
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
    const sectionIds = ["TVShowsDIV", "MoviesDIV", "AnimeDIV", "DocumentsDIV"];
    const frontParagraph = document.querySelector(".Frnt2");
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
    if (frontParagraph)
        frontParagraph.style.display = anyVisible ? "none" : "block";

}


/*slide content button*/
function toggleSlide(button) {
    const content = button.nextElementSibling;
    const isOpen = content.classList.contains("open");

    if (isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        requestAnimationFrame(() => {
            content.style.maxHeight = "0";
        });
        content.classList.remove("open");
        button.classList.remove("active");
    } else {
        content.classList.add("open");
        requestAnimationFrame(() => {
            content.style.maxHeight = content.scrollHeight + "px";
        });
        button.classList.add("active");
    }
}

// Handles inner toggles (like Anime Movies or General)
function toggleInnerSlide(innerButton) {
    const innerDiv = innerButton.nextElementSibling;
    const parentSlide = innerDiv.closest(".slide-content");

    const isOpen = innerDiv.classList.contains("open");

    if (isOpen) {
        innerDiv.style.maxHeight = innerDiv.scrollHeight + "px";
        requestAnimationFrame(() => {
            innerDiv.style.maxHeight = "0";
        });
        innerDiv.classList.remove("open");
        innerButton.classList.remove("active");
    } else {
        innerDiv.classList.add("open");
        innerDiv.style.maxHeight = "0";
        requestAnimationFrame(() => {
            innerDiv.style.maxHeight = innerDiv.scrollHeight + "px";
        });
        innerButton.classList.add("active");
    }

    // Resize the outer container too
    requestAnimationFrame(() => {
        parentSlide.style.maxHeight = parentSlide.scrollHeight + "px";
    });
}
