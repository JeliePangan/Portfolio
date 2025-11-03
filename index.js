// =========================
// Elements
// =========================
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('#project-cards .group');

const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const modalClose = document.getElementById('modal-close');

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

const parallaxBg = document.querySelector('.parallax-bg');
const stickyNav = document.getElementById('sticky-nav');

const form = document.getElementById('contactForm');
const confirmationMessage = document.getElementById('confirmationMessage');

// =========================
// Filter Projects
// =========================
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        projects.forEach(project => {
            if (filter === 'all' || project.getAttribute('data-category') === filter) {
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        });

        // Refresh AOS animations after filtering
        AOS.refresh();
    });
});

// =========================
// Modal
// =========================
projects.forEach(group => {
    group.addEventListener('click', () => {
        const img = group.querySelector('img');
        if (!img) return;

        modal.classList.remove('hidden');
        modalImg.src = img.src;
        modalCaption.textContent = img.alt || group.querySelector('h5').textContent;
    });
});

if (modalClose) {
    modalClose.addEventListener('click', () => modal.classList.add('hidden'));
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
}

// =========================
// Contact Form
// =========================
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (confirmationMessage) {
            confirmationMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            confirmationMessage.classList.remove('hidden');
        }
        form.reset();
    });
}

// =========================
// Hamburger Menu
// =========================
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Toggle mobile menu
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuBtn.textContent = mobileMenu.classList.contains('hidden') ? '☰' : '✕';
    });


    // HERO NAVBAR MOBILE MENU
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    // STICKY NAVBAR MOBILE MENU
    const stickyMenuBtn = document.getElementById("sticky-menu-btn");
    const stickyMobileMenu = document.getElementById("sticky-mobile-menu");
    stickyMenuBtn.addEventListener("click", () => {
        stickyMobileMenu.classList.toggle("hidden");
    });

    // SHOW/HIDE STICKY NAVBAR ON SCROLL
    const stickyNav = document.getElementById("sticky-nav");
    window.addEventListener("scroll", () => {
        if (window.scrollY > window.innerHeight * 0.8) {
            stickyNav.classList.remove("opacity-0", "-translate-y-10");
            stickyNav.classList.add("opacity-100", "translate-y-0");
        } else {
            stickyNav.classList.add("opacity-0", "-translate-y-10");
            stickyNav.classList.remove("opacity-100", "translate-y-0");
        }
    });

    // Auto-close menu on window resize (desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            mobileMenu.classList.add('hidden');
            menuBtn.textContent = '☰';
        }
    });

    // Auto-close menu when clicking a link (mobile only)
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.textContent = '☰';
        });
    });
});


// =========================
// Scroll: Parallax & Sticky Navbar
// =========================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Parallax
    if (parallaxBg) {
        const speed = 0.4;
        parallaxBg.style.transform = `translateY(${scrollY * speed}px)`;
    }

    // Sticky Navbar
    if (stickyNav) {
        const triggerPoint = window.innerHeight * 0.8;
        if (scrollY > triggerPoint) {
            stickyNav.classList.remove('opacity-0', '-translate-y-10');
            stickyNav.classList.add('opacity-100', 'translate-y-0');
        } else {
            stickyNav.classList.add('opacity-0', '-translate-y-10');
            stickyNav.classList.remove('opacity-100', 'translate-y-0');
        }
    }
});

// =========================
// Initialize AOS
// =========================
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
        disable: 'mobile'
    });
});
