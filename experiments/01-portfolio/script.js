document.addEventListener("DOMContentLoaded", () => {
    // Scroll reveal animation
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        let windowHeight = window.innerHeight;
        let elementVisible = 150;

        reveals.forEach((reveal) => {
            let elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger on initial load

    // Navbar scroll effect
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.padding = "0.75rem 0";
            navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
        } else {
            navbar.style.padding = "1.5rem 0";
            navbar.style.boxShadow = "none";
        }
    });

    // Theme toggle
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme") || "dark";
            const next = current === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("portfolio-theme", next);
        });
    }

    // Hamburger menu toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("open");
            });
        });
    }
});
