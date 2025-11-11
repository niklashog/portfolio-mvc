// START Navbar with conditional autohide

let throttling = false;
let scrollHandlingPaused = false; // Flagga för att pausa auto-hide av navbar

function onScrollThrottled() {
    if (!throttling && !scrollHandlingPaused) { // Kolla flaggan innan scroll-hantering
        throttling = true;
        requestAnimationFrame(() => {
            onScroll();
            throttling = false;
        });
    }
}

let lastScrollPosition = 0;
const navbar = document.querySelector("#navbar");

function onScroll() {
    if (scrollHandlingPaused) return; // Aktiv flagga = stoppad autohide

    const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (currentScrollPosition <= 0) {
        navbar.style.top = "0";
        navbar.style.opacity = "1";
    } else {
        if (currentScrollPosition > lastScrollPosition) {
            navbar.style.top = "-100px";
            navbar.style.opacity = "0";
        } else {
            navbar.style.top = "0";
            navbar.style.opacity = "1";
        }
    }

    lastScrollPosition = currentScrollPosition;
}

// Vid klick i navbar, kort paus på autohide vid scroll
document.querySelectorAll("#navbar a, .hero-bottom a")
    .forEach(link => {
        link.addEventListener("click", () => {
            scrollHandlingPaused = true;
            navbar.style.top = "0"; // Säkerställ att navbaren visas igen

            setTimeout(() => {
                scrollHandlingPaused = false; // Återaktivera auto-hide
            }, 1000); // Tid som auto-hide är inaktiv
        });
    });

window.addEventListener("scroll", onScrollThrottled, { passive: true });

// END Navbar with conditional autohide


// START Ramlande kort i hero
document.addEventListener("DOMContentLoaded", () => {
    const spans = document.querySelectorAll(".hero-cards-container span");
    spans.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.12}s`;
    });
});

// END Ramlande kort i hero

//START Links to projects

// Hotel
const hotelApp = document.querySelector('#hotelApp');

hotelApp.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'https://github.com/niklashog/Hotel_Transylvania/';
    link.target = '_blank';

    document.body.appendChild(link);

    link.click();
});

const bankApp = document.querySelector('#bankApp');

bankApp.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'https://github.com/niklashog/BankApp/';
    link.target = '_blank';

    document.body.appendChild(link);

    link.click();
});

//END Links to projects


// START of Weather

window.onload = () => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=62.632922&lon=17.799248&units=metric&lang=sv&appid=8442f21f549f1ef24a8124568a2536af'

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Anslutningen avbröts");
            }
            return response.json();
        })
        .then((data) => {
            const temperature = data.main.temp;
            const location = data.name;
            const icon = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

            const weatherIcon = document.querySelector("#weatherIcon");
            weatherIcon.src = iconUrl;
            weatherIcon.alt = data.weather[0].description;

            document.querySelector(
                "#weatherInfo"
            ).innerHTML = `${temperature}°C`;

            document.querySelector(
                "#weatherCity"
            ).innerHTML = `${location}`;



        })
        .catch((error) => {
            console.error("Det gick inte att hämta väderdata:", error);
        });
}

// END of Weather


// START of Formular Popup

const form = document.querySelector('#form');
const result = document.querySelector('#result');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.textContent = "Skickar meddelande..";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.textContent = "Så! Allt gick bra :)";
            } else {
                console.log(response);
                result.textContent = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.textContent = "Något gick fel, försök igen.";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});


// End of Formular Popup