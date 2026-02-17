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

function toggleDocumentSubSection(idToToggle, buttonElement) {
    const sectionIds = [
        "FreecomicsDIV",
        "BooksDIV",
        "NewsPapersDIV",
        "MangasDIV",
        "ManhwaDIV",
        "NotFreeComicsDIV"
    ];

    const frontParagraph = document.querySelector(".FrntinDoc");
    let anyVisible = false;

    // Remove 'active' class from all document section buttons
    const allDocButtons = document.querySelectorAll("#Buttons-in-document-section button");
    allDocButtons.forEach(btn => btn.classList.remove("active"));

    sectionIds.forEach(id => {
        const div = document.getElementById(id);

        if (!div) return;

        if (id === idToToggle) {
            const isVisible = div.style.display === "block";
            div.style.display = isVisible ? "none" : "block";
            anyVisible = !isVisible;

            if (!isVisible && buttonElement) {
                buttonElement.classList.add("active");
            }
        } else {
            div.style.display = "none";
        }
    });

    // Show or hide the front text (like initial state)
    if (frontParagraph)
        frontParagraph.style.display = anyVisible ? "none" : "block";
}


function toggleSection(idToShow) {
    const sectionIds = ["TVShowsDIV", "MoviesDIV", "AnimeDIV", "DocumentsDIV"];
    const frontParagraph = document.querySelector(".Frnt2");
    let anyVisible = false;

    // Remove 'active' class from all parent buttons
    const parentButtons = document.querySelectorAll("#ParentButtons button");
    parentButtons.forEach(btn => btn.classList.remove("active"));

    sectionIds.forEach(function (id) {
        const div = document.getElementById(id);
        if (!div) return;

        if (id === idToShow) {
            const isCurrentlyVisible = div.style.display === "block";
            div.style.display = isCurrentlyVisible ? "none" : "block";
            anyVisible = !isCurrentlyVisible;

            if (!isCurrentlyVisible) {
                const clickedButton = document.querySelector(`button[onclick="toggleSection('${id}')"]`);
                if (clickedButton) clickedButton.classList.add("active");
            }

            // ✅ FIX: Re-check child visibility if DocumentsDIV is being shown
            if (id === "DocumentsDIV" && !isCurrentlyVisible) {
                const docChildIds = [
                    "FreecomicsDIV",
                    "BooksDIV",
                    "NewsPapersDIV",
                    "MangasDIV",
                    "ManhwaDIV",
                    "NotFreeComicsDIV"
                ];

                docChildIds.forEach((childId, index) => {
                    const childDiv = document.getElementById(childId);
                    if (childDiv && childDiv.style.display === "block") {
                        // Find the matching button and re-activate
                        const childButtons = document.querySelectorAll("#Buttons-in-document-section button");
                        const btn = childButtons[index];
                        if (btn) btn.classList.add("active");
                    }
                });
            }

        } else {
            div.style.display = "none";
        }
    });

    if (frontParagraph)
        frontParagraph.style.display = anyVisible ? "none" : "block";
}
// ✅ Ensures all slide and inner-slide contents are CLOSED on page load
window.addEventListener("DOMContentLoaded", () => {
    // Existing logic
    document.querySelectorAll(".slide-content, .inner-slide").forEach(el => {
        el.classList.remove("open");
        el.style.maxHeight = "0"; // force closed
    });

    document.querySelectorAll(".toggle-btn, [onclick*='toggleInnerSlide']").forEach(btn => {
        btn.classList.remove("active");
    });
    // Popup logic
    document.querySelectorAll('.popup-btn').forEach(button => {
        button.addEventListener('click', function () {
            // Find the nearest popup-image
            let popup = this.parentElement.querySelector('.popup-image');
            if (!popup) {
                popup = this.nextElementSibling;
            }
            if (!popup || !popup.classList.contains("popup-image")) return;

            const img = popup.querySelector('img');
            popup.classList.add('show'); // Use new show class

            if (img.complete) {
                startFadeOut(popup);
            } else {
                img.onload = () => startFadeOut(popup);
                img.onerror = () => {
                    console.error("Failed to load popup image");
                    popup.classList.remove('show');
                };
            }
        });

        function startFadeOut(popup) {
            setTimeout(() => {
                popup.classList.remove('show');
            }, 1500);
        }
    });

    // Optional: Click to close early
    document.querySelectorAll('.popup-image').forEach(popup => {
        popup.addEventListener('click', () => {
            popup.classList.remove('show');
        });
    });

});

function toggleSlide(button) {

    // Only handle the floating ☰ toggle
    // 1. Check if this is the ☰ button (floating controller)
    if (button.classList.contains('toggle-button')) {
        const autoButtons = button.nextElementSibling;
        if (autoButtons && autoButtons.classList.contains("autoslidebuttons")) {
            if (autoButtons.style.display === "flex") {
                // Currently shown — hide autoslidebuttons and show menu button
                autoButtons.style.display = "none";
                button.style.display = "inline-block";
            } else {
                // Currently hidden — show autoslidebuttons and hide menu button
                autoButtons.style.display = "flex";
                button.style.display = "none";
            }
        }
        return;
    }

    // 2. Main toggle logic for sections (accordion behavior)
    const content = button.nextElementSibling;
    // 🔍 Handle content panel toggling (accordion-style)
    const parentContainer = button.closest("#TVShowsDIV, #MoviesDIV, #AnimeDIV");
    const isOpen = content.classList.contains("open");

    // 🔒 Close all others first
    parentContainer.querySelectorAll(".slide-content").forEach(slide => {
        slide.classList.remove("open");
        slide.style.maxHeight = "0";

        // Hide floating controller inside each slide
        const fc = slide.querySelector(".floating-controller");
        if (fc) fc.style.display = "none";

        const btn = slide.previousElementSibling;
        if (btn && btn.classList.contains("toggle-btn")) {
            btn.classList.remove("active");
        }
    });
    // Open the clicked section
    if (!isOpen) {
        content.classList.add("open");
        requestAnimationFrame(() => {
            content.style.maxHeight = content.scrollHeight + "px";
        });
        button.classList.add("active");

        // Show this section’s floating controller
        const fc = content.querySelector(".floating-controller");
        if (fc) {
            fc.style.display = "flex";

            // Reset to show ☰ again and hide controls
            const toggleBtn = fc.querySelector(".toggle-button");
            const autoBtns = fc.querySelector(".autoslidebuttons");
            if (toggleBtn) toggleBtn.style.display = "inline-block";
            if (autoBtns) autoBtns.style.display = "none";
        }
    }
}

function toggleInnerSlide(innerButton) {
    if (!innerButton) return;

    // Identify which content to open (local search only!)
    const targetSelector = innerButton.getAttribute("data-target");

    // 🔥 FIXED: Only search inside the current slide-content
    const parentSlide = innerButton.closest(".slide-content");
    if (!parentSlide) return;

    const innerDiv = parentSlide.querySelector(`[data-id="${targetSelector}"]`);
    if (!innerDiv) return;

    const isOpen = innerDiv.classList.contains("open");

    // Close all other inner sections inside ONLY this parent
    parentSlide.querySelectorAll(".inner-slide").forEach(slide => {
        slide.classList.remove("open");
        slide.style.maxHeight = "0";
        const button = parentSlide.querySelector(
            `[data-target="${slide.getAttribute("data-id")}"]`
        );
        if (button) button.classList.remove("active");
    });

    // Open the clicked section
    if (!isOpen) {
        innerDiv.classList.add("open");
        innerDiv.style.maxHeight = innerDiv.scrollHeight + "px";
        innerButton.classList.add("active");
    }

    // Auto-resize parent container
    parentSlide.style.maxHeight = parentSlide.scrollHeight + "px";
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
function showPopupImage() {
    const popup = document.getElementById("popup-image");
    popup.style.display = "block";

    // Fade in
    setTimeout(() => {
        popup.style.opacity = "1";
    }, 10); // Short delay to trigger transition

    // Wait 1 second, then fade out
    setTimeout(() => {
        popup.style.opacity = "0";

        // Hide after fade out
        setTimeout(() => {
            popup.style.display = "none";
        }, 500); // Match transition duration
    }, 1500); // 1000ms visible + 500ms fade in
}
