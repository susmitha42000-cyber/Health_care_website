document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initCounters();
    initForms();
    initDashboard();
    initRevealAnimations();
    initParallax();
    initScrollState();
    initDashboardAnimations();
});

function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) {
        return;
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    counters.forEach(counter => {
        const target = Number.parseInt(counter.dataset.target || '0', 10);
        if (!target) {
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }

                animateCounter(counter, target);
                observer.unobserve(counter);
            });
        }, { threshold: 0.35 });

        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    const duration = 1400;
    const start = performance.now();

    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(target * eased);
        element.textContent = value.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(step);
            return;
        }

        element.textContent = target.toLocaleString();
    }

    requestAnimationFrame(step);
}

function initForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const passwordToggle = document.getElementById('passwordToggle');
    const fullNameInput = document.getElementById('fullname');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    if (passwordToggle) {
        passwordToggle.addEventListener('click', togglePasswordVisibility);
    }

    if (fullNameInput) {
        fullNameInput.addEventListener('input', enforceNameInput);
    }
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('passwordToggle');

    if (!passwordInput || !toggleButton) {
        return;
    }

    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    toggleButton.textContent = isHidden ? 'Hide' : 'Show';
}

function initDashboard() {
    const currentUser = getStoredUser('currentUser');
    updateNavbarUserState(currentUser);

    if (window.location.pathname.includes('dashboard.html')) {
        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }

        displayUserInfo(currentUser);
        renderRoleDashboard(currentUser.role);
        initDashboardNav();
        initDashboardMenu();
    }

    document.querySelectorAll('#logoutBtn, #dashboardLogoutBtn, #navLogoutBtn').forEach(button => {
        button.addEventListener('click', handleLogout);
    });
}

function getStoredUser(key) {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) {
        return null;
    }

    try {
        return JSON.parse(rawValue);
    } catch (error) {
        return null;
    }
}

function initDashboardNav() {
    const navLinks = document.querySelectorAll('.sidebar-nav a[data-section]');

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.dataset.section;
            if (!targetId) {
                return;
            }

            document.querySelectorAll('.sidebar-nav li').forEach(item => item.classList.remove('active'));
            link.parentElement?.classList.add('active');
            showDashboardSection(targetId);
            closeDashboardMenu();
        });
    });
}

function initDashboardMenu() {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.getElementById('dashboardMenuToggle');
    const closeButton = document.getElementById('sidebarCloseBtn');

    if (!sidebar || !toggle || toggle.dataset.bound === 'true') {
        return;
    }

    toggle.dataset.bound = 'true';

    let backdrop = document.querySelector('.dashboard-sidebar-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'dashboard-sidebar-backdrop';
        document.body.appendChild(backdrop);
    }

    toggle.addEventListener('click', () => {
        if (window.innerWidth >= 1025) {
            return;
        }

        const isOpen = sidebar.classList.toggle('open');
        toggle.classList.toggle('active', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        backdrop.classList.toggle('visible', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    backdrop.addEventListener('click', closeDashboardMenu);
    closeButton?.addEventListener('click', closeDashboardMenu);

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1025) {
            closeDashboardMenu();
        }
    });
}

function closeDashboardMenu() {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.getElementById('dashboardMenuToggle');
    const backdrop = document.querySelector('.dashboard-sidebar-backdrop');

    sidebar?.classList.remove('open');
    toggle?.classList.remove('active');
    toggle?.setAttribute('aria-expanded', 'false');
    backdrop?.classList.remove('visible');
    document.body.style.overflow = '';
}

function showDashboardSection(sectionId) {
    document.querySelectorAll('.dashboard-content section').forEach(section => {
        section.classList.add('hidden');
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.remove('hidden');
        retriggerSectionAnimations(activeSection);
    }
}

function renderRoleDashboard(role) {
    document.querySelectorAll('.role-dashboard').forEach(section => {
        section.classList.add('hidden');
    });

    const selectedDashboard = document.getElementById(`${role}Dashboard`);
    if (selectedDashboard) {
        selectedDashboard.classList.remove('hidden');
    }
}

function displayUserInfo(userData) {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const dashboardUserEmail = document.getElementById('dashboardUserEmail');

    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${userData.fullname}`;
    }

    if (dashboardUserEmail) {
        dashboardUserEmail.textContent = userData.email;
    }
}

function updateNavbarUserState(userData) {
    const userSession = document.getElementById('userSession');
    const navUserName = document.getElementById('navUserName');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');

    if (!userSession || !navUserName) {
        return;
    }

    if (userData) {
        navUserName.textContent = userData.fullname;
        userSession.hidden = false;
        if (loginLink) loginLink.hidden = true;
        if (signupLink) signupLink.hidden = true;
        return;
    }

    userSession.hidden = true;
    if (loginLink) loginLink.hidden = false;
    if (signupLink) signupLink.hidden = false;
}

function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function initRevealAnimations() {
    const revealItems = document.querySelectorAll('[data-animate]');

    if (!revealItems.length) {
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            const delay = entry.target.dataset.delay || '0';
            entry.target.style.setProperty('--delay', `${delay}ms`);
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.18,
        rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(item => observer.observe(item));
}

function initDashboardAnimations() {
    if (!window.location.pathname.includes('dashboard.html')) {
        return;
    }

    const initialSection = document.querySelector('.dashboard-content section:not(.hidden)');
    if (initialSection) {
        retriggerSectionAnimations(initialSection);
    }
}

function retriggerSectionAnimations(section) {
    section.querySelectorAll('.dashboard-actions .btn, .stat-card, .chart-card, .dashboard-panel, .activity-item, .dashboard-list-item').forEach(node => {
        node.style.animation = 'none';
        void node.offsetWidth;
        node.style.animation = '';
    });

    section.querySelectorAll('[data-animate]').forEach(node => {
        node.classList.remove('in-view');
        void node.offsetWidth;
        const delay = node.dataset.delay || '0';
        node.style.setProperty('--delay', `${delay}ms`);
        node.classList.add('in-view');
    });
}

function initParallax() {
    const nodes = document.querySelectorAll('.parallax-node');

    if (!nodes.length) {
        return;
    }

    const updateParallax = () => {
        const offset = window.scrollY;

        nodes.forEach(node => {
            const speed = Number.parseFloat(node.dataset.speed || '0.08');
            node.style.transform = `translate3d(0, ${offset * speed}px, 0)`;
        });
    };

    updateParallax();
    window.addEventListener('scroll', debounce(updateParallax, 8), { passive: true });
}

function initScrollState() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) {
        return;
    }

    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', debounce(handleScroll, 8), { passive: true });
}

function enforceNameInput(event) {
    const input = event.target;
    const sanitizedValue = input.value
        .replace(/[^A-Za-z\s]/g, '')
        .replace(/\s{2,}/g, ' ')
        .replace(/^\s+/, '');

    if (input.value !== sanitizedValue) {
        input.value = sanitizedValue;
    }
}

function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('input[required], select[required]');

    clearFormErrors(form);

    fields.forEach(field => {
        if (!field.value.trim()) {
            showFormError(field, 'This field is required');
            isValid = false;
        }
    });

    const emailField = form.querySelector('#email');
    const passwordField = form.querySelector('#password');
    const roleField = form.querySelector('#role');

    if (emailField && emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
        showFormError(emailField, 'Please enter a valid email address');
        isValid = false;
    }

    if (roleField && !roleField.value.trim()) {
        showFormError(roleField, 'Please select your role');
        isValid = false;
    }

    if (passwordField && passwordField.value) {
        if (passwordField.value.includes(' ')) {
            showFormError(passwordField, 'Password cannot contain spaces');
            isValid = false;
        }

        if (passwordField.value.length < 6) {
            showFormError(passwordField, 'Password must be at least 6 characters');
            isValid = false;
        }
    }

    if (form.id === 'signupForm') {
        const fullName = form.querySelector('#fullname');
        const password = form.querySelector('#password');
        const confirmPassword = form.querySelector('#confirmPassword');

        if (fullName && fullName.value.trim()) {
            const normalizedName = fullName.value.trim().replace(/\s+/g, ' ');
            fullName.value = normalizedName;

            if (normalizedName.length < 3) {
                showFormError(fullName, 'Full name must be at least 3 letters');
                isValid = false;
            } else if (!isValidName(normalizedName)) {
                showFormError(fullName, 'Name should contain only letters and spaces');
                isValid = false;
            }
        }

        if (password && password.value.length >= 6 && !isStrongPassword(password.value)) {
            showFormError(password, 'Use uppercase, lowercase, and a number');
            isValid = false;
        }

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            showFormError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isValidName(name) {
    return /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(name);
}

function isStrongPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
}

function clearFormErrors(form) {
    form.querySelectorAll('.error-message').forEach(error => error.remove());
}

function showFormError(input, message) {
    const parent = input.parentElement;
    if (!parent) {
        return;
    }

    parent.querySelector('.error-message')?.remove();

    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#c14f4f';
    error.style.fontSize = '0.85rem';
    error.style.marginTop = '0.5rem';
    parent.appendChild(error);

    input.addEventListener('input', () => {
        error.remove();
    }, { once: true });
}

function handleLogin(event) {
    event.preventDefault();

    if (!validateForm(event.target)) {
        return;
    }

    const email = document.getElementById('email')?.value.trim().toLowerCase() || '';
    const password = document.getElementById('password')?.value || '';
    const role = document.getElementById('role')?.value || '';
    const savedUser = getStoredUser(`user_${email}`);

    const userData = {
        fullname: savedUser?.fullname || email.split('@')[0] || 'User',
        email,
        role: savedUser?.role || role,
        password,
        loginTime: new Date().toISOString()
    };

    localStorage.setItem('currentUser', JSON.stringify(userData));
    window.location.href = 'dashboard.html';
}

function handleSignup(event) {
    event.preventDefault();

    if (!validateForm(event.target)) {
        return;
    }

    const fullname = document.getElementById('fullname')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim().toLowerCase() || '';
    const password = document.getElementById('password')?.value || '';
    const role = document.getElementById('role')?.value || '';
    const storageKey = `user_${email}`;

    if (localStorage.getItem(storageKey)) {
        alert('An account with this email already exists. Please log in.');
        return;
    }

    const userData = {
        fullname,
        email,
        role,
        password,
        signupTime: new Date().toISOString()
    };

    localStorage.setItem(storageKey, JSON.stringify(userData));
    alert('Account created successfully! Redirecting to login...');
    window.location.href = 'login.html';
}

function debounce(fn, wait) {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), wait);
    };
}

document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) {
        return;
    }

    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') {
        return;
    }

    const target = document.querySelector(targetId);
    if (!target) {
        return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

window.addEventListener('resize', debounce(() => {
    if (window.innerWidth >= 1025) {
        closeDashboardMenu();
    }
}, 100));

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
        closeDashboardMenu();
    }
});
