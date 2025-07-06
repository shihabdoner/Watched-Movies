function getSection(id) {
    return document.querySelector(`[data-id="${id}"]`) || document.getElementById(id);
}


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
    const generalDiv = document.querySelector('[data-id="AnimeInGeneralWithMoviesDIV"]');
    const toggleButton = document.querySelector("button[onclick='toggleAnimeinGeneral()']");
    const slideBox = generalDiv.closest(".slide-content");
    const isOpen = generalDiv.classList.contains("open");

    if (isOpen) {
        generalDiv.style.maxHeight = generalDiv.scrollHeight + "px";
        requestAnimationFrame(() => {
            generalDiv.style.maxHeight = "0";
        });
        generalDiv.classList.remove("open");
        toggleButton.classList.remove("active");
    } else {
        generalDiv.style.maxHeight = "0";
        generalDiv.classList.add("open");
        requestAnimationFrame(() => {
            generalDiv.style.maxHeight = generalDiv.scrollHeight + "px";
        });
        toggleButton.classList.add("active");
    }

    requestAnimationFrame(() => {
        slideBox.style.maxHeight = slideBox.scrollHeight + "px";
    });
}

function toggleAnimeinMovies() {
    const animesDiv = document.querySelector('[data-id="AnimeMoviesDIV"]');
    const toggleButton = document.getElementById("animeMoviesButton"); // assume ID here is unique
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

/*Search function*/
let lastVisibleSectionId = null;

function storeCurrentState() {
    ['TVShowsDIV', 'MoviesDIV', 'AnimeDIV', 'DocumentsDIV'].forEach(id => {
        const el = document.getElementById(id);
        if (el && el.style.display !== 'none') lastVisibleSectionId = id;
    });
}

function restorePreviousState() {
    ['TVShowsDIV', 'MoviesDIV', 'AnimeDIV', 'DocumentsDIV'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
    if (lastVisibleSectionId) {
        document.getElementById(lastVisibleSectionId).style.display = 'block';
    }
    clearHighlights();
}

function clearHighlights() {
    document.querySelectorAll(".highlighted-word").forEach(span => {
        span.outerHTML = span.textContent;
    });
}


// Open all necessary parent containers of a match
function openAllParents(el) {
    const mainSections = ['TVShowsDIV', 'MoviesDIV', 'AnimeDIV', 'DocumentsDIV', 'FreecomicsDIV',
        'WatchedDIV', 'WatchingDIV', 'NextInCueDIV', 'AnimeMoviesDIV', 'AnimeInGeneralWithMoviesDIV'];

    let parent = el;

    while (parent && parent !== document.body) {
        const targetId = parent.dataset.id || parent.id;
        if (mainSections.includes(targetId)) {

            // Handle top-level sections
            if (['TVShowsDIV', 'MoviesDIV', 'AnimeDIV', 'DocumentsDIV'].includes(parent.id)) {
                document.getElementById(parent.id).style.display = 'block';
            }

            // Trigger toggle buttons for inner IDs
            const toggleBtn = document.querySelector(`button[data-target="${targetId}"]`);
            if (toggleBtn) toggleBtn.click();
        }
        // 2. Trigger Free Comics
        if (parent.id === 'FreecomicsDIV') {
            const toggleBtn = document.querySelector('button[onclick="toggleFreeComics()"]');
            if (toggleBtn) toggleBtn.click();
        }

        parent = parent.parentNode;
    }
}
function scrollToMatch(el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.style.backgroundColor = "yellow";
    setTimeout(() => el.style.backgroundColor = "", 2000);
}
function focusOnMatch(text) {
    const allElements = document.querySelectorAll('body *');
    for (let el of allElements) {
        if (el.children.length === 0 && el.textContent.trim().toLowerCase().includes(text.toLowerCase())) {
            openAllParents(el);
            setTimeout(() => scrollToMatch(el), 600);
            break;
        }
    }
}

// Utility: Find the previous button before a content div
function findPreviousToggleButton(targetDiv, cls = null) {
    let el = targetDiv.previousElementSibling;
    let depth = 0;
    while (el && depth < 5) {
        if (
            el.tagName === 'BUTTON' &&
            (!cls || el.classList.contains(cls))
        ) return el;
        el = el.previousElementSibling;
        depth++;
    }
    return null;
}


// Utility: Checks if an element is currently hidden
function isCollapsed(el) {
    return el.style.display === 'none' || getComputedStyle(el).display === 'none';
}
console.log("Clicking button to open:", toggleBtn?.textContent);

// Core filter logic
function filterList() {
    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    const suggestionBox = document.getElementById("suggestionBox");
    suggestionBox.innerHTML = "";
    clearHighlights();

    if (input === "") {
        restorePreviousState();
        return;
    }

    if (!lastVisibleSectionId) storeCurrentState();

    const elements = document.querySelectorAll("h1, h2, h3, p, span, button, li, div");
    const suggestions = [];

    elements.forEach(el => {
        if (el.children.length === 0 && el.textContent.trim()) {
            const text = el.textContent;
            const index = text.toLowerCase().indexOf(input);
            if (index !== -1) {
                suggestions.push({ element: el, text, index });
            }
        }
    });

    suggestions.slice(0, 8).forEach((s, i) => {
        const div = document.createElement("div");
        div.textContent = s.text;
        div.className = "suggestion";
        div.style.cursor = "pointer";
        div.onclick = () => {
            clearHighlights();

            const el = s.element;
            const matchStart = s.index;
            const matchEnd = matchStart + input.length;
            const before = s.text.slice(0, matchStart);
            const match = s.text.slice(matchStart, matchEnd);
            const after = s.text.slice(matchEnd);
            const highlightId = "highlight_" + i;

            el.innerHTML = `${before}<span id="${highlightId}" class="highlighted-word">${match}</span>${after}`;

            openAllParents(el);

            setTimeout(() => {
                const highlightEl = document.getElementById(highlightId);
                if (highlightEl) highlightEl.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 200);
        };
        suggestionBox.appendChild(div);
    });
}

// Stacking Dynamic
function updateStickyOffsets() {
    const searchbox = document.getElementById("Searchbox");
    const parentButtons = document.getElementById("ParentButtons");

    if (!searchbox || !parentButtons) return;

    const searchboxHeight = searchbox.offsetHeight;
    const gap = 10; // optional gap
    parentButtons.style.top = `${searchboxHeight + gap}px`;
}

function updateSpacingBelowSticky() {
    const parentButtons = document.getElementById("ParentButtons");
    const beneath = document.getElementById("BeneathParrentButtons");

    if (!parentButtons || !beneath) return;

    const parentHeight = parentButtons.offsetHeight;
    beneath.style.marginTop = `${parentHeight + 20}px`; // spacing below stickies
}

window.addEventListener("load", () => {
    updateStickyOffsets();
    updateSpacingBelowSticky();
});
window.addEventListener("resize", () => {
    updateStickyOffsets();
    updateSpacingBelowSticky();
});
