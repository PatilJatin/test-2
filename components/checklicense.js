// Function to check license validity
function checkLicense(license_key, todays_date, license_expiration_date) {
    // Dummy function to validate the license key
    // Replace this with actual validation logic if needed
    function validateLicenseKey(license_key) {
        // Example: Assume the license key is valid if it matches a specific pattern
        const licenseKeyPattern = /^[A-Z0-9]{10}$/; // Example pattern
        return licenseKeyPattern.test(license_key);
    }

    // Check if the license key is valid
    if (!validateLicenseKey(license_key)) {
        return {
            valid: false,
            message: "This user doesn't have valid license."
        };
    }

    // Convert dates to JavaScript Date objects
    const today = new Date(todays_date);
    const expirationDate = new Date(license_expiration_date);

    // Check if the license has expired
    if (today > expirationDate) {
        return {
            valid: false,
            message: "License has expired. Time to pay up!"
        };
    }

    // License is valid
    return {
        valid: true,
        message: "Welcome to AIShowPrep"
    };
}

// Example usage:
const license_key = "ABC1234567"; // Replace with actual license key
const todays_date = "2024-08-06"; // Replace with actual today's date
const license_expiration_date = "2024-12-31"; // Replace with actual expiration date

const result = checkLicense(license_key, todays_date, license_expiration_date);
console.log(result.message); // Output: "License is valid." or "Invalid license key." or "License has expired."


