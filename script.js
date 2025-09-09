document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
        
        // Change main text based on slide
        const heroMainText = document.getElementById('hero-main-text');
        const texts = [
            'Willkommen bei Laola',
            'Jeden Freitag türkische Live-Musik',
            'Türkische Kultur und türkische Küche'
        ];
        
        heroMainText.textContent = texts[index];
        
        // Restart title animation on slide change
        const heroTitle = document.querySelector('.hero-title');
        heroTitle.style.animation = 'none';
        heroTitle.offsetHeight; // Trigger reflow
        heroTitle.style.animation = 'fadeInUp 1s ease-out 0.3s forwards';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 6000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideshow();
            showSlide(index);
            startSlideshow();
        });
    });

    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', stopSlideshow);
    heroSection.addEventListener('mouseleave', startSlideshow);

    startSlideshow();
    
    // Hamburger Menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking on a link
    const navbarLinks = document.querySelectorAll('.navbar-menu a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navbarMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Smoke effect on entire page
    function createSmokeParticle(x, y, container) {
        const particle = document.createElement('div');
        particle.className = 'smoke-particle';
        
        const size = Math.random() * 100 + 150;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = (x - size / 2) + 'px';
        particle.style.top = (y - size / 2) + 'px';
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle && particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }
    
    document.body.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.4) {
            createSmokeParticle(e.clientX, e.clientY, document.body);
        }
    });
    
    // Testimonials slider
    const testimonialsSlider = document.getElementById('testimonials-slider');
    if (testimonialsSlider) {
        let currentTestimonial = 0;
        const totalTestimonials = document.querySelectorAll('.testimonial-card').length;
        
        function slideTestimonials() {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            const translateX = -currentTestimonial * 20;
            testimonialsSlider.style.transform = `translateX(${translateX}%)`;
        }
        
        setInterval(slideTestimonials, 4000);
    }
    
    // Navbar scroll background
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#19191a';
            navbar.style.transition = 'background-color 0.3s ease';
        } else {
            navbar.style.backgroundColor = 'transparent';
        }
    });
    
    // Reservation Modal
    const reservationBtn = document.getElementById('reservation-btn');
    const navReservationBtn = document.getElementById('nav-reservation-btn');
    const footerReservationBtns = document.querySelectorAll('.footer-reservation-btn');
    const reservationModal = document.getElementById('reservation-modal');
    const modalClose = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('cancel-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const reservationForm = document.getElementById('reservation-form');

    function openModal() {
        reservationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        reservationModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        reservationForm.reset();
    }

    // Add event listeners for all reservation buttons
    if (reservationBtn) {
        reservationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
    
    if (navReservationBtn) {
        navReservationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
    
    footerReservationBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    modalClose.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && reservationModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form submission
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(reservationForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.phone || !data.date || !data.time || !data.guests) {
            alert('Bitte füllen Sie alle Pflichtfelder aus.');
            return;
        }
        
        // Create mailto link with reservation details
        const subject = `Reservierung für ${data.name} - ${data.date} um ${data.time}`;
        const body = `
Neue Reservierungsanfrage:

Name: ${data.name}
E-Mail: ${data.email}
Telefon: ${data.phone}
Datum: ${data.date}
Uhrzeit: ${data.time}
Anzahl Personen: ${data.guests}
${data.message ? `Besondere Wünsche: ${data.message}` : ''}

Mit freundlichen Grüßen,
Laola Restaurant Website
        `.trim();
        
        const mailtoLink = `mailto:info@laola-restaurant.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show confirmation and close modal
        alert('Vielen Dank für Ihre Reservierungsanfrage! Ihr E-Mail-Programm wird geöffnet.');
        closeModal();
    });
    
    // Mobile scroll animations with Intersection Observer
    if (window.innerWidth <= 768) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all animation elements
        const animatedElements = document.querySelectorAll(
            '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-up'
        );
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });

        // Add stagger delay for child elements
        document.querySelectorAll('.stagger-animation').forEach((el, index) => {
            el.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
        });
    }
});