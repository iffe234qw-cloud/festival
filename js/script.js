/**
 * NEON WAVE FESTIVAL 2026
 * High-Voltage Edition Core Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCountdown();
    initSchedule();
    initFAQ();
    initScrollReveal();
    initForm();
});

// 1. NAVIGATION & SCROLL TRACKING
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Hamburger Menu Toggle
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
}

// 2. COUNTDOWN TIMER
function initCountdown() {
    const targetDate = new Date('August 15, 2026 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff < 0) return;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = d < 10 ? '0'+d : d;
        document.getElementById('hours').innerText = h < 10 ? '0'+h : h;
        document.getElementById('minutes').innerText = m < 10 ? '0'+m : m;
        document.getElementById('seconds').innerText = s < 10 ? '0'+s : s;
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// 3. SCHEDULE TAB LOGIC
function initSchedule() {
    const scheduleData = {
        fri: [
            { time: '6:00 PM', artist: 'Nova Sky', details: 'Opening Sequence', stage: 'Main Stage' },
            { time: '8:30 PM', artist: 'DJ Voltage', details: 'Electric Storm Set', stage: 'Neon Dome' },
            { time: '11:00 PM', artist: 'Luna Echo', details: 'Midnight Dreams', stage: 'Main Stage' },
        ],
        sat: [
            { time: '4:00 PM', artist: 'Kai Blaze', details: 'Urban Heatwave', stage: 'Main Stage' },
            { time: '7:00 PM', artist: 'Nova Sky', details: 'Future Rhythms', stage: 'Neon Dome' },
            { time: '10:00 PM', artist: 'Aurora Pulse', details: 'Cosmic Shift', stage: 'Main Stage' },
        ],
        sun: [
            { time: '5:00 PM', artist: 'Mia Rivers', details: 'Sunset Soul', stage: 'Main Stage' },
            { time: '8:00 PM', artist: 'DJ Voltage', details: 'Final Surge', stage: 'Neon Dome' },
            { time: '11:00 PM', artist: 'All-Stars', details: 'Grand Finale', stage: 'Main Stage' },
        ]
    };

    window.showDay = function(day, btn) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const container = document.getElementById('scheduleContent');
        container.innerHTML = '';

        scheduleData[day].forEach(item => {
            container.innerHTML += `
                <div class="timeline-item">
                    <span class="time">${item.time}</span>
                    <div class="event-info">
                        <h3>${item.artist}</h3>
                        <p class="space-grotesk">${item.details}</p>
                    </div>
                    <span class="stage-badge">${item.stage}</span>
                </div>
            `;
        });
    };

    const defaultBtn = document.querySelector('.tab-btn');
    if(defaultBtn) showDay('fri', defaultBtn);
}

// 4. FAQ ACCORDION
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('active');
            q.querySelector('span').innerText = item.classList.contains('active') ? '−' : '+';
        });
    });
}

// 5. SCROLL REVEAL SYSTEM
function initScrollReveal() {
    const observerOptions = { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// 6. FORM VALIDATION
function initForm() {
    const contactForm = document.getElementById('contactForm');
    if(!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = "SENDING...";
        btn.disabled = true;

        setTimeout(() => {
            alert('Transmission Sent! We will pulse you back soon.');
            btn.innerText = originalText;
            btn.disabled = false;
            contactForm.reset();
        }, 1500);
    });
}