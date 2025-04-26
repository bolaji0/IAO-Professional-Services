/**
 * IAO Professional Services - Accountant Website
 * Main JavaScript File
 */

// DOM Elements
const body = document.body;
const mobileMenuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const navLinks = document.querySelectorAll('.nav-menu a');
const calculatorForm = document.getElementById('calculator-form');
const calculateBtn = document.getElementById('calculate-btn');
const contactForm = document.getElementById('contact-form');
const sections = document.querySelectorAll('section');

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Particles.js
  initParticles();
  
  // Initialize Theme
  initTheme();
  
  // Initialize Mobile Menu
  initMobileMenu();
  
  // Initialize Smooth Scrolling
  initSmoothScrolling();
  
  // Initialize Calculator
  initCalculator();
  
  // Initialize Contact Form
  initContactForm();
  
  // Initialize Scroll Reveal
  initScrollReveal();
  
  // Initialize Nav Highlight on Scroll
  initNavHighlightOnScroll();
});

// Theme Initialization
function initTheme() {
  // Check for saved theme preference or use user's OS preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.classList.add('dark-mode');
  }
  
  // Theme toggle button event listener
  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    // Save theme preference
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    
    // Update particles color for dark/light mode
    updateParticlesColor();
  });
}

// Mobile Menu Initialization
function initMobileMenu() {
  mobileMenuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Toggle active state on the toggle button
    const spans = this.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
    
    if (navMenu.classList.contains('active')) {
      // Transform spans to create an X
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      // Reset spans
      spans.forEach(span => {
        span.style.transform = 'none';
        span.style.opacity = '1';
      });
    }
  });
  
  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      
      // Reset toggle button
      const spans = mobileMenuToggle.querySelectorAll('span');
      spans.forEach(span => {
        span.classList.remove('active');
        span.style.transform = 'none';
        span.style.opacity = '1';
      });
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      
      // Reset toggle button
      const spans = mobileMenuToggle.querySelectorAll('span');
      spans.forEach(span => {
        span.classList.remove('active');
        span.style.transform = 'none';
        span.style.opacity = '1';
      });
    }
  });
}

// Smooth Scrolling Initialization
function initSmoothScrolling() {
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Smooth scroll to section
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Accounting for fixed navbar
          behavior: 'smooth'
        });
        
        // Update active link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
}

// Nav Highlight on Scroll
function initNavHighlightOnScroll() {
  window.addEventListener('scroll', function() {
    // Get current scroll position
    const scrollPosition = window.scrollY;
    
    // Highlight the appropriate nav link based on scroll position
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    // Add shadow to navbar when scrolling
    const navbar = document.getElementById('main-nav');
    if (scrollPosition > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Particles.js Initialization
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    const particlesConfig = {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: body.classList.contains('dark-mode') ? '#ffffff' : '#0A2342'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: 0.3,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: body.classList.contains('dark-mode') ? '#ffffff' : '#0A2342',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    };
    
    particlesJS('particles-js', particlesConfig);
  }
}

// Update Particles Color based on Theme
function updateParticlesColor() {
  if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
    const isDarkMode = body.classList.contains('dark-mode');
    const color = isDarkMode ? '#ffffff' : '#0A2342';
    
    // Update particle colors
    pJSDom[0].pJS.particles.color.value = color;
    pJSDom[0].pJS.particles.line_linked.color = color;
    
    // Refresh particles
    pJSDom[0].pJS.fn.particlesRefresh();
  }
}

// Calculator Initialization
function initCalculator() {
  if (calculateBtn) {
    calculateBtn.addEventListener('click', function(e) {
      e.preventDefault();
      calculateTaxSavings();
    });
  }
}

// Tax Savings Calculator Logic
function calculateTaxSavings() {
  // Get input values
  const income = parseFloat(document.getElementById('annual-income').value) || 0;
  const expenses = parseFloat(document.getElementById('expenses').value) || 0;
  const businessType = document.getElementById('business-type').value;
  
  // Get selected tax credits
  const taxCreditsSelect = document.getElementById('tax-credits');
  const selectedCredits = Array.from(taxCreditsSelect.selectedOptions).map(option => option.value);
  
  // Calculate current estimated tax (simplified calculation)
  let taxRate = 0.3; // Default tax rate
  
  // Adjust tax rate based on business type
  switch (businessType) {
    case 'sole-prop':
      taxRate = 0.28;
      break;
    case 'llc':
      taxRate = 0.25;
      break;
    case 's-corp':
      taxRate = 0.22;
      break;
    case 'c-corp':
      taxRate = 0.21;
      break;
    case 'partnership':
      taxRate = 0.26;
      break;
  }
  
  // Calculate base tax
  const taxableIncome = income - expenses;
  const currentTax = Math.max(0, taxableIncome * taxRate);
  
  // Calculate savings based on selected credits
  let savings = 0;
  
  if (selectedCredits.includes('r-and-d')) {
    savings += Math.min(income * 0.07, 20000);
  }
  
  if (selectedCredits.includes('home-office')) {
    savings += Math.min(income * 0.03, 5000);
  }
  
  if (selectedCredits.includes('vehicle')) {
    savings += Math.min(income * 0.02, 3000);
  }
  
  if (selectedCredits.includes('retirement')) {
    savings += Math.min(income * 0.04, 8000);
  }
  
  if (selectedCredits.includes('healthcare')) {
    savings += Math.min(income * 0.05, 10000);
  }
  
  // Calculate optimized tax
  const optimizedTax = Math.max(0, currentTax - savings);
  
  // Calculate savings percentage
  const savingsPercentage = currentTax === 0 ? 0 : Math.round((savings / currentTax) * 100);
  
  // Update results
  document.getElementById('current-tax').textContent = formatCurrency(currentTax);
  document.getElementById('tax-savings').textContent = formatCurrency(savings);
  document.getElementById('optimized-tax').textContent = formatCurrency(optimizedTax);
  document.getElementById('savings-percentage').textContent = `${savingsPercentage}%`;
  
  // Show results with animation
  const resultsContent = document.getElementById('results-content');
  resultsContent.style.opacity = '0';
  
  setTimeout(() => {
    resultsContent.style.transition = 'opacity 0.5s ease';
    resultsContent.style.opacity = '1';
  }, 300);
}

// Format currency
function formatCurrency(amount) {
  return '$' + amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

// Contact Form Initialization
function initContactForm() {
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const formObject = {};
      
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      
      // Simulate form submission
      showFormSubmitMessage('Thank you for your message! We will get back to you soon.', 'success');
      
      // Reset form
      this.reset();
    });
  }
}

// Show form submission message
function showFormSubmitMessage(message, type) {
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = `form-message ${type}`;
  messageElement.textContent = message;
  
  // Append to form container
  const formContainer = document.querySelector('.contact-form-container');
  formContainer.appendChild(messageElement);
  
  // Automatically remove after 5 seconds
  setTimeout(() => {
    messageElement.style.opacity = '0';
    setTimeout(() => {
      messageElement.remove();
    }, 500);
  }, 5000);
  
  // Add styles
  messageElement.style.padding = '1rem';
  messageElement.style.marginTop = '1rem';
  messageElement.style.borderRadius = 'var(--radius)';
  messageElement.style.textAlign = 'center';
  messageElement.style.transition = 'opacity 0.5s ease';
  
  if (type === 'success') {
    messageElement.style.backgroundColor = 'rgba(45, 106, 79, 0.1)';
    messageElement.style.color = 'var(--green)';
    messageElement.style.border = '1px solid var(--green)';
  } else {
    messageElement.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
    messageElement.style.color = '#dc2626';
    messageElement.style.border = '1px solid #dc2626';
  }
}

// Scroll Reveal Animation
function initScrollReveal() {
  // Get all elements to animate on scroll
  const elementsToReveal = document.querySelectorAll('.service-card, .value, .stat-card, .info-card');
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Apply initial styles and observe elements
  elementsToReveal.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
  
  // Stagger animation for service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
}