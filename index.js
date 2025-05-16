

// Planet data for modal display
const planetData = {
    colorful: {
        name: "Chromaria",
        image: "images/colourful planet.jpeg",
        description: "Chromaria is a vibrant gas giant located in the outer reaches of our solar system. Its atmosphere is composed of various gases that create stunning swirls of color visible from space. Scientists believe the planet's unique coloration is due to the interaction of sunlight with different atmospheric compounds.",
        diameter: "142,984 km",
        distance: "2.8 billion km",
        temperature: "-150°C to -100°C",
        atmosphere: "Hydrogen, Helium, Methane, Ammonia"
    },
    rocky: {
        name: "Terranova",
        image: "images/rocky planet.jpeg",
        description: "Terranova is a rocky terrestrial planet with vast mountain ranges and deep canyons. Its surface is primarily composed of silicate rocks and metals, similar to Earth but with a more rugged landscape. The planet has a thin atmosphere and experiences extreme temperature variations between day and night.",
        diameter: "12,742 km",
        distance: "160 million km",
        temperature: "-30°C to 70°C",
        atmosphere: "Carbon Dioxide, Nitrogen, Argon"
    },
    sandy: {
        name: "Aridus",
        image: "images/sandy planet.jpeg",
        description: "Aridus is a desert planet with vast sand dunes and minimal water. The planet's surface is dominated by expansive deserts, with small oases scattered across its surface. Despite its harsh conditions, Aridus hosts a variety of specialized life forms adapted to its arid environment.",
        diameter: "10,832 km",
        distance: "203 million km",
        temperature: "10°C to 60°C",
        atmosphere: "Nitrogen, Oxygen, Trace Water Vapor"
    },
    ringed: {
        name: "Annularis",
        image: "images/planet with rings and moon.jpeg",
        description: "Annularis is a magnificent ringed planet with multiple moons. Its distinctive rings are composed of ice particles, rock debris, and dust. The planet itself is a gas giant with a turbulent atmosphere and powerful storms. Its system of moons creates a complex gravitational dance that maintains the stability of its rings.",
        diameter: "116,464 km",
        distance: "1.4 billion km",
        temperature: "-180°C to -140°C",
        atmosphere: "Hydrogen, Helium, Methane"
    },
    moon: {
        name: "Lunaris",
        image: "images/moon from a planet.jpeg",
        description: "Lunaris is a view of a moon from the surface of its host planet. This perspective showcases the breathtaking sight of a large moon dominating the sky of its parent planet. The moon's surface features are clearly visible, including impact craters, mountain ranges, and vast plains.",
        diameter: "3,474 km",
        distance: "384,400 km from its parent planet",
        temperature: "-233°C to 123°C",
        atmosphere: "Virtually None (Trace amounts of Helium, Neon)"
    },
    star: {
        name: "Solaris",
        image: "images/star and planet.jpeg",
        description: "Solaris is a planet orbiting close to its parent star. This hot world experiences intense solar radiation and has developed a unique ecosystem adapted to these extreme conditions. The planet's proximity to its star creates spectacular views of the stellar surface from certain vantage points.",
        diameter: "9,578 km",
        distance: "58 million km from its star",
        temperature: "80°C to 450°C",
        atmosphere: "Carbon Dioxide, Sulfur Dioxide, Nitrogen"
    }
};

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize planet cards click events
    initPlanetCards();
    
    // Initialize carousel items click events
    initCarouselItems();
    
    // Add animation classes to elements as they scroll into view
    initScrollAnimations();
});

// Initialize planet cards click events
function initPlanetCards() {
    const planetCards = document.querySelectorAll('.planet-card');
    
    planetCards.forEach(card => {
        card.addEventListener('click', function() {
            const planetType = this.getAttribute('data-planet');
            openPlanetModal(planetType);
        });
    });
}

// Initialize carousel items click events
function initCarouselItems() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    carouselItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            let planetType;
            
            // Determine which planet based on carousel index
            switch(index) {
                case 0:
                    planetType = 'ringed';
                    break;
                case 1:
                    planetType = 'moon';
                    break;
                case 2:
                    planetType = 'star';
                    break;
                default:
                    planetType = 'colorful';
            }
            
            openPlanetModal(planetType);
        });
        
        // Add cursor pointer to indicate clickable
        item.style.cursor = 'pointer';
    });
}

// Open the planet modal with the specified planet data
function openPlanetModal(planetType) {
    const planet = planetData[planetType];
    
    if (!planet) return;
    
    // Set modal content
    document.getElementById('modalImage').src = planet.image;
    document.getElementById('modalTitle').textContent = planet.name;
    document.getElementById('modalDescription').textContent = planet.description;
    document.getElementById('modalDiameter').textContent = planet.diameter;
    document.getElementById('modalDistance').textContent = planet.distance;
    document.getElementById('modalTemperature').textContent = planet.temperature;
    document.getElementById('modalAtmosphere').textContent = planet.atmosphere;
    
    // Open the modal
    const planetModal = new bootstrap.Modal(document.getElementById('planetModal'));
    planetModal.show();
}

// Initialize scroll animations
function initScrollAnimations() {
    // Add animation order to planet cards for staggered animation
    const planetCards = document.querySelectorAll('.planet-card');
    planetCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
    
    // Implement scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe section headings for animation
    document.querySelectorAll('section h2').forEach(heading => {
        observer.observe(heading);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effect to navbar on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
});

// Add CSS class for animation when elements come into view
document.addEventListener('scroll', function() {
    const animatedElements = document.querySelectorAll('.planet-card, .carousel, .hero-image');
    
    animatedElements.forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains('in-view')) {
            element.classList.add('in-view');
        }
    });
});

// Helper function to check if an element is in the viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}
