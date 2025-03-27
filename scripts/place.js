document.addEventListener("DOMContentLoaded", function () {
    const lastModified = new Date(document.lastModified);
    document.getElementById("lastModified").textContent = lastModified.toLocaleDateString();

    const temperature = 5; // Celsius
    const windSpeed = 10; // km/h

    function calculateWindChill(temp, speed) {
        return (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(2);
    }

    if (temperature <= 10 && windSpeed > 4.8) {
        document.getElementById("windChill").textContent = calculateWindChill(temperature, windSpeed) + " °C";
    }
});