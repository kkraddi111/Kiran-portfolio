console.log('script.js loaded.');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired.');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlElement = document.documentElement;

    // Initial theme is set via an inline script in the <head> to prevent FOUC

    // Handle theme toggle button click
    if (themeToggleBtn) {
        console.log('Theme toggle button found. Attaching click listener.');
        themeToggleBtn.addEventListener('click', function() {
            console.log('Theme toggle button clicked!');
            // toggle the 'dark' class on the <html> element
            htmlElement.classList.toggle('dark');

            // update localStorage
            if (htmlElement.classList.contains('dark')) {
                localStorage.theme = 'dark';
            } else {
                localStorage.theme = 'light';
            }
        });
    } else {
        console.error('Theme toggle button with id "theme-toggle-btn" was not found!');
    }

    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    // Typing effect
    const roles = ['Frontend Developer', 'Python Developer', 'Tech Enthusiastic'];
    let currentIndex = 0;
    const typeDelay = 200; // Consistent typing speed
    const pauseDelay = 4000; // Pause at the end of each word
    
    function typeRole() {
        const roleElement = document.getElementById('role');
        const currentRole = roles[Math.floor(currentIndex / 2)];
        const isDeleting = currentIndex % 2;
        
        if (!isDeleting) {
            // Typing forward
            const progress = (currentIndex % 2) ? 1 - (currentRole.length - roleElement.textContent.length) / currentRole.length : roleElement.textContent.length / currentRole.length;
            
            if (progress < 1) {
                roleElement.textContent = currentRole.substring(0, Math.floor(currentRole.length * progress) + 1);
                setTimeout(typeRole, typeDelay);
            } else {
                setTimeout(() => {
                    currentIndex++;
                    typeRole();
                }, pauseDelay);
            }
        } else {
            // Deleting
            if (roleElement.textContent.length > 0) {
                roleElement.textContent = roleElement.textContent.slice(0, -1);
                setTimeout(typeRole, typeDelay);
            } else {
                currentIndex = (currentIndex + 1) % (roles.length * 2);
                setTimeout(typeRole, typeDelay);
            }
        }
    }

    // Start typing effect
    typeRole();

    // Back to Top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.remove('hidden');
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
            backToTopButton.classList.add('hidden');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.parentElement.dataset.progress || entry.target.style.width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        bar.parentElement.dataset.progress = width;
        observer.observe(bar);
    });
});