// PAGE NAVIGATION

let currentPage = 1;

const totalPages = 4;

function showPage(pageNumber) {

    if (pageNumber < 1 || pageNumber > totalPages) {
        return;
    }

    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.remove("active");
    });

    document.getElementById("page" + pageNumber)
        .classList.add("active");

    currentPage = pageNumber;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (pageNumber === 2) {
        startBirthday();
    }
}


// NEXT PAGE

function nextPage() {
    showPage(currentPage + 1);
}


// PREVIOUS PAGE

function previousPage() {
    showPage(currentPage - 1);
}


// BIRTHDAY COUNTDOWN

let birthdayStarted = false;

function startBirthday() {

    if (birthdayStarted) {
        return;
    }

    birthdayStarted = true;

    let count = 3;

    const countdown = document.getElementById("countdown");

    const message = document.getElementById("wishMessage");

    countdown.textContent = "Get ready...";

    message.textContent = "";

    setTimeout(function() {

        countdown.textContent = count;

        const timer = setInterval(function() {

            count--;

            if (count > 0) {

                countdown.textContent = count;

            } else {

                clearInterval(timer);

                blowCandles();

            }

        }, 1000);

    }, 1000);

}


// BLOW OUT CANDLES

function blowCandles() {

    document.querySelectorAll(".flame").forEach(function(flame) {

        flame.classList.add("off");

    });

    document.getElementById("countdown").textContent =
        "Make your wish... ♡";

    document.getElementById("wishMessage").textContent =
        "May all your wishes come true! 🎀";

}
