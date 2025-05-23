document.addEventListener("DOMContentLoaded", () => {
    const authButton = document.getElementById("w-btn"); // Keeps the same ID for styling
    const browseJobs = document.getElementById("browseJobs");
    const allProtectedLinks = document.querySelectorAll(".protected-link"); // Selects all protected links

    // Function to check login status
    function isLoggedIn() {
        return sessionStorage.getItem("loggedIn") === "true";
    }

    // Function to update button text and behavior across all pages
    function updateAuthButton() {
        if (authButton) { // Check if the button exists on the page
            if (isLoggedIn()) {
                authButton.textContent = "Logout"; // Change text to "Logout"
                authButton.onclick = () => {
                    sessionStorage.removeItem("loggedIn"); // Clear session
                    window.location.reload(); // Reload page to reflect logout
                };
            } else {
                authButton.textContent = "Join"; // Reset to "Join"
                authButton.onclick = () => {
                    window.location.href = "login.html"; // Redirect to login
                };
            }
        }
    }

    // Redirect Browse Jobs
    if (browseJobs) {
        browseJobs.addEventListener("click", (e) => {
            e.preventDefault();
            if (isLoggedIn()) {
                window.location.href = "/jobs/job.html"; // Allow access
            } else {
                window.location.href = "login.html"; // Redirect to login
            }
        });
    }

    // Restrict access to all protected links (e.g., job listing, contact, etc.)
    allProtectedLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            if (!isLoggedIn()) {
                e.preventDefault(); // Prevent navigation
                alert("Please log in first!");
                window.location.href = "login.html";
            }
        });
    });

    updateAuthButton(); // Apply functionality on all pages
});

// Sorting Functionality
const sortBtns = document.querySelectorAll(".job-id > *");
const sortItems = document.querySelectorAll(".job-container > *");

sortBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        sortBtns.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");

        const targetData = btn.getAttribute("data-target");
        sortItems.forEach((item) => {
            item.classList.add("delete");
            if (item.getAttribute("data-item") === targetData || targetData === "all") {
                item.classList.remove("delete");
            }
        });
    });
});
