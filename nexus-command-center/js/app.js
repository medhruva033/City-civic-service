import { initializeClock } from "./clock.js";
import { initializeTasks } from "./tasks.js";
import { initializeWeather } from "./weather.js";

document.addEventListener("DOMContentLoaded", () => {

    console.log("NEXUS Command Center initialized.");

    // Initialize modules
    initializeClock();
    initializeTasks();
    initializeWeather();

    // Restore theme
    const savedTheme = localStorage.getItem("nexus-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    // Theme toggle
    const themeButton = document.getElementById("themeButton");

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight = document.body.classList.contains("light-theme");

        localStorage.setItem(
            "nexus-theme",
            isLight ? "light" : "dark"
        );

    });

    // Initialize focus timer
    initializeFocusTimer();

    // Initial icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

});


// =================================
// FOCUS TIMER
// =================================

function initializeFocusTimer() {

    const display = document.getElementById("timerDisplay");
    const startButton = document.getElementById("startTimer");
    const resetButton = document.getElementById("resetTimer");
    const circle = document.querySelector(".timer-circle");

    const duration = 25 * 60;

    let remaining = duration;
    let timerInterval = null;
    let running = false;

    function updateDisplay() {

        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;

        display.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        const progress = ((duration - remaining) / duration) * 360;

        circle.style.background = `
            conic-gradient(
                #9b7cff ${progress}deg,
                rgba(255,255,255,0.08) ${progress}deg
            )
        `;

    }

    function pauseTimer() {

        clearInterval(timerInterval);

        timerInterval = null;
        running = false;

        startButton.innerHTML =
            '<i data-lucide="play"></i> Resume Focus';

        if (window.lucide) {
            window.lucide.createIcons();
        }

    }

    function startTimer() {

        if (running) return;

        if (remaining <= 0) {
            remaining = duration;
        }

        running = true;

        startButton.innerHTML =
            '<i data-lucide="pause"></i> Pause Focus';

        if (window.lucide) {
            window.lucide.createIcons();
        }

        timerInterval = setInterval(() => {

            remaining--;

            updateDisplay();

            if (remaining <= 0) {

                pauseTimer();

                startButton.innerHTML =
                    '<i data-lucide="play"></i> Start Focus';

                if (window.lucide) {
                    window.lucide.createIcons();
                }

                alert("Focus session completed! Take a break.");

            }

        }, 1000);

    }

    function resetTimer() {

        clearInterval(timerInterval);

        timerInterval = null;
        running = false;
        remaining = duration;

        updateDisplay();

        startButton.innerHTML =
            '<i data-lucide="play"></i> Start Focus';

        if (window.lucide) {
            window.lucide.createIcons();
        }

    }

    startButton.addEventListener("click", () => {

        if (running) {
            pauseTimer();
        } else {
            startTimer();
        }

    });

    resetButton.addEventListener("click", resetTimer);

    updateDisplay();

}