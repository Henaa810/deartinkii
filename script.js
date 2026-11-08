// PAGE NAVIGATION

function showPage(pageNumber) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById("page" + pageNumber)
        .classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// COVER PHOTO UPLOAD

const coverUpload = document.getElementById("coverUpload");
const coverPreview = document.getElementById("coverPreview");
const coverLabel = document.getElementById("uploadLabel");
const photoActions = document.getElementById("photoActions");

function displayCoverPhoto(photo) {
    if (photo) {
        coverPreview.src = photo;
        coverPreview.style.display = "block";
        coverLabel.style.display = "none";
        photoActions.style.display = "flex";
    } else {
        coverPreview.src = "";
        coverPreview.style.display = "none";
        coverLabel.style.display = "flex";
        photoActions.style.display = "none";
    }
}

const savedCover = localStorage.getItem("coverPhoto");

if (savedCover) {
    displayCoverPhoto(savedCover);
}

coverUpload.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
        const photo = event.target.result;

        try {
            localStorage.setItem("coverPhoto", photo);
            displayCoverPhoto(photo);
        } catch (error) {
            alert("This photo is too large. Try a smaller image.");
        }
    };

    reader.readAsDataURL(file);

    // Allows selecting the same photo again
    this.value = "";
});

function removeCoverPhoto() {
    localStorage.removeItem("coverPhoto");
    displayCoverPhoto(null);
}


// BIRTHDAY COUNTDOWN

let countdownStarted = false;

function startCountdown() {

    if (countdownStarted) return;

    countdownStarted = true;

    const countdown = document.getElementById("countdown");
    const button = document.getElementById("countdownButton");
    const cake = document.querySelector(".cake-scene");
    const wishMessage = document.getElementById("wishMessage");

    button.style.display = "none";

    let number = 3;

    countdown.textContent = number;

    const timer = setInterval(() => {

        number--;

        if (number > 0) {

            countdown.textContent = number;

        } else {

            clearInterval(timer);

            countdown.textContent = "Happy Birthday!";

            // Candles automatically go out

            cake.classList.add("blown");

            wishMessage.textContent =
                "Hope all your wishes come true. ♡";

        }

    }, 1000);

}


// MEMORIES PHOTO GALLERY

const memoryUpload = document.getElementById("memoryUpload");
const memoryGallery = document.getElementById("memoryGallery");

let memories = [];

try {
    memories = JSON.parse(localStorage.getItem("memories")) || [];
} catch (error) {
    memories = [];
}


// Display saved photos

function displayMemories() {

    memoryGallery.innerHTML = "";

    memories.forEach((memory, index) => {

        const card = document.createElement("div");
        card.className = "memory-card";

        const image = document.createElement("img");
        image.src = memory.photo;
        image.alt = "Memory photograph";

        const caption = document.createElement("input");
        caption.type = "text";
        caption.placeholder = "A little caption...";
        caption.value = memory.caption || "";

        caption.addEventListener("input", function () {

            memories[index].caption = this.value;

            saveMemories();

        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-photo";
        deleteButton.textContent = "×";
        deleteButton.title = "Remove photo";

        deleteButton.addEventListener("click", function () {

            memories.splice(index, 1);

            saveMemories();
            displayMemories();

        });

        card.appendChild(deleteButton);
        card.appendChild(image);
        card.appendChild(caption);

        memoryGallery.appendChild(card);

    });

}


// Save gallery

function saveMemories() {

    try {
        localStorage.setItem("memories", JSON.stringify(memories));
    } catch (error) {
        alert("Storage is full. Try uploading smaller photographs.");
    }

}


// Upload multiple photographs

memoryUpload.addEventListener("change", function () {

    const files = Array.from(this.files);

    files.forEach(file => {

        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();

        reader.onload = function (event) {

            memories.push({
                photo: event.target.result,
                caption: ""
            });

            saveMemories();
            displayMemories();

        };

        reader.readAsDataURL(file);

    });

    this.value = "";

});


// Load saved memories

displayMemories();


// PERSONAL BIRTHDAY LETTER

const birthdayLetter = document.getElementById("birthdayLetter");
const savedMessage = document.getElementById("savedMessage");

// Load previously written letter

birthdayLetter.value =
    localStorage.getItem("birthdayLetter") || "";


// Automatically save while typing

birthdayLetter.addEventListener("input", function () {

    try {

        localStorage.setItem(
            "birthdayLetter",
            birthdayLetter.value
        );

        savedMessage.textContent = "Saved automatically ♡";

    } catch (error) {

        savedMessage.textContent =
            "Storage full. Please copy your letter somewhere safe.";

    }

});
