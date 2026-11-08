// PAGE NAVIGATION

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    // Start birthday countdown

    if (pageName === "birthday") {
        startBirthday();
    }

    window.scrollTo(0, 0);
}


// BIRTHDAY COUNTDOWN

let birthdayStarted = false;

function startBirthday() {

    if (birthdayStarted) return;

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