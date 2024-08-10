
const fs = require('fs');

// Generate a list of years from 1985 to 2024
const years = [];
for (let i = 1985; i <= 2024; i++) {
    years.push(i);
}

// Function to create a list of random years for 365 days with variety
function generateRandomYears() {
    const randomYears = [];
    let previousDecade = null;

    for (let i = 0; i < 365; i++) {
        while (true) {
            const year = years[Math.floor(Math.random() * years.length)];
            const currentDecade = Math.floor(year / 10) * 10;
            if (currentDecade !== previousDecade) {
                randomYears.push(year);
                previousDecade = currentDecade;
                break;
            }
        }
    }

    return randomYears;
}

// Generate the years
const randomYears = generateRandomYears();

// Create a dictionary with dates and their corresponding years
const data = {};
randomYears.forEach((year, index) => {
    data[`day_${index + 1}`] = year;
});

// Save the data to a JSON file
const filePath = './random_years.json';
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log(`Data saved to ${filePath}`);

// inset prompt: "find todays date from file list of years, find out one popular song from that year on given date and create talk break about this song, use no more than 80 words"
