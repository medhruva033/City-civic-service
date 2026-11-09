export function initializeClock() {

    const clock = document.getElementById("clock");
    const dateElement = document.getElementById("currentDate");
    const greeting = document.getElementById("greeting");
    const timezone = document.getElementById("timezone");

    function updateClock() {

        const now = new Date();

        // Update time
        clock.textContent = now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });

        // Update date
        dateElement.textContent = now.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }).toUpperCase();

        // Automatic greeting
        const hour = now.getHours();

        let message;

        if (hour < 12) {
            message = "Good morning, Explorer";
        } else if (hour < 17) {
            message = "Good afternoon, Explorer";
        } else {
            message = "Good evening, Explorer";
        }

        greeting.innerHTML = `${message} <span>✦</span>`;

        // Timezone
        timezone.textContent = Intl.DateTimeFormat()
            .resolvedOptions()
            .timeZone
            .toUpperCase();

    }

    updateClock();

    setInterval(updateClock, 1000);

}