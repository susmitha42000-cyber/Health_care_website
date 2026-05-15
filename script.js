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

const dashboardRoleContent = {
    doctor: {
        kicker: 'Doctor workflow hub',
        actions: ['Start Consultation', 'Review Lab Results', 'Patient Search', 'Approve Follow-ups'],
        appointments: {
            title: 'Doctor Schedule',
            description: 'See consultations, room assignments, and next patient touchpoints for the day.',
            listTitle: 'Upcoming Visits',
            stats: [
                { icon: 'SL', value: '8', label: 'Open Slots' },
                { icon: 'TD', value: '3', label: 'Today' },
                { icon: 'CF', value: '5', label: 'Confirmed' },
                { icon: 'RS', value: '1', label: 'Needs Reschedule' }
            ],
            items: [
                { icon: 'RM', title: 'Room 4: Sarah Lee follow-up and medication review', meta: 'Today, 11:30 AM' },
                { icon: 'NEW', title: 'Mark Diaz first consultation with imaging summary ready', meta: 'Tomorrow, 09:00 AM' },
                { icon: 'LAB', title: 'Emma Patel lab interpretation and treatment adjustment', meta: 'Tomorrow, 02:00 PM' }
            ]
        },
        reports: {
            title: 'Clinical Reports',
            description: 'Review diagnostics, summaries, and treatment-ready reports prepared for your cases.',
            listTitle: 'Priority Reports',
            stats: [
                { icon: 'REP', value: '14', label: 'Recent Reports' },
                { icon: 'SUM', value: '5', label: 'New Summaries' },
                { icon: 'REV', value: '9', label: 'Reviewed' },
                { icon: 'ARC', value: '20', label: 'Archived' }
            ],
            items: [
                { icon: 'CBC', title: 'Blood test results for Patient #543 are ready for assessment', meta: 'Completed 1 hour ago' },
                { icon: 'WK', title: 'Weekly chronic care summary highlights two improved cases', meta: 'Completed yesterday' },
                { icon: 'IMG', title: 'Radiology note uploaded with side-by-side comparison images', meta: 'Completed 2 days ago' }
            ]
        }
    },
    patient: {
        kicker: 'Patient wellness space',
        actions: ['Book Appointment', 'View Prescriptions', 'Open Care Plan', 'Message Support'],
        appointments: {
            title: 'My Appointments',
            description: 'Keep track of upcoming visits, reminders, and everything you need before arriving.',
            listTitle: 'Visit Timeline',
            stats: [
                { icon: 'UP', value: '2', label: 'Upcoming Visits' },
                { icon: 'RM', value: '1', label: 'Reminder Today' },
                { icon: 'ON', value: '3', label: 'Past Check-ins' },
                { icon: 'VC', value: '1', label: 'Video Visit' }
            ],
            items: [
                { icon: 'DR', title: 'Follow-up with Dr. Reed for progress review and next steps', meta: 'Tomorrow, 10:00 AM' },
                { icon: 'LAB', title: 'Sample collection visit with fasting reminder already sent', meta: 'Friday, 08:15 AM' },
                { icon: 'VID', title: 'Nutrition coaching video session with shared meal plan notes', meta: 'Monday, 06:00 PM' }
            ]
        },
        reports: {
            title: 'My Reports',
            description: 'Open plain-language health reports, test results, and care summaries in one place.',
            listTitle: 'Recent Updates',
            stats: [
                { icon: 'NEW', value: '4', label: 'New Reports' },
                { icon: 'DOC', value: '2', label: 'Doctor Notes' },
                { icon: 'LAB', value: '1', label: 'Lab Result' },
                { icon: 'ARC', value: '12', label: 'Saved Records' }
            ],
            items: [
                { icon: 'HLT', title: 'Blood report published with a simple explanation from your doctor', meta: 'Completed today' },
                { icon: 'SUM', title: 'Weekly wellness summary shows better sleep and hydration trends', meta: 'Completed yesterday' },
                { icon: 'RX', title: 'Medication plan updated with revised morning dosage guidance', meta: 'Completed 2 days ago' }
            ]
        }
    },
    admin: {
        kicker: 'Admin operations center',
        actions: ['Approve Accounts', 'Open Audit Trail', 'Review Alerts', 'Manage Teams'],
        appointments: {
            title: 'Operations Schedule',
            description: 'Monitor onboarding reviews, leadership meetings, and system events across the platform.',
            listTitle: 'Operational Events',
            stats: [
                { icon: 'MT', value: '6', label: 'Team Events' },
                { icon: 'RV', value: '4', label: 'Approval Reviews' },
                { icon: 'AL', value: '2', label: 'Alert Windows' },
                { icon: 'EX', value: '1', label: 'Maintenance Run' }
            ],
            items: [
                { icon: 'APP', title: 'Doctor credential review block for newly submitted profiles', meta: 'Today, 11:00 AM' },
                { icon: 'OPS', title: 'Operations leadership check-in on support and verification backlog', meta: 'Today, 03:00 PM' },
                { icon: 'SYS', title: 'Low-traffic maintenance window for analytics sync and backups', meta: 'Sunday, 01:00 AM' }
            ]
        },
        reports: {
            title: 'Admin Reports',
            description: 'Track compliance, growth, uptime, and support analytics with role-based visibility.',
            listTitle: 'Monitoring Reports',
            stats: [
                { icon: 'CMP', value: '7', label: 'Compliance Logs' },
                { icon: 'SEC', value: '3', label: 'Security Reviews' },
                { icon: 'KPI', value: '11', label: 'KPI Snapshots' },
                { icon: 'ARC', value: '26', label: 'Archived Files' }
            ],
            items: [
                { icon: 'AUD', title: 'Daily audit export confirms permission updates and access integrity', meta: 'Completed 40 minutes ago' },
                { icon: 'UP', title: 'Uptime report shows stable performance during peak login periods', meta: 'Completed today' },
                { icon: 'SUP', title: 'Support dashboard summary highlights faster turnaround on new tickets', meta: 'Completed yesterday' }
            ]
        }
    }
};

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
    const safeRole = dashboardRoleContent[role] ? role : 'patient';

    document.querySelectorAll('.role-dashboard').forEach(section => {
        section.classList.add('hidden');
    });

    const selectedDashboard = document.getElementById(`${safeRole}Dashboard`);
    if (selectedDashboard) {
        selectedDashboard.classList.remove('hidden');
    }

    applyDashboardRoleContent(safeRole);
}

function displayUserInfo(userData) {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const dashboardUserEmail = document.getElementById('dashboardUserEmail');
    const dashboardKicker = document.getElementById('dashboardKicker');
    const roleContent = dashboardRoleContent[userData.role] || dashboardRoleContent.patient;

    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${userData.fullname}`;
    }

    if (dashboardUserEmail) {
        dashboardUserEmail.textContent = userData.email;
    }

    if (dashboardKicker) {
        dashboardKicker.textContent = roleContent.kicker;
    }
}

function applyDashboardRoleContent(role) {
    const roleContent = dashboardRoleContent[role] || dashboardRoleContent.patient;

    document.body.classList.remove('theme-doctor', 'theme-patient', 'theme-admin');
    document.body.classList.add(`theme-${role}`);

    renderDashboardActions(roleContent.actions);
    renderDashboardSection(roleContent.appointments, {
        titleId: 'appointmentsTitle',
        descriptionId: 'appointmentsDescription',
        listTitleId: 'appointmentsListTitle',
        statsId: 'appointmentsStats',
        listId: 'appointmentsList'
    });
    renderDashboardSection(roleContent.reports, {
        titleId: 'reportsTitle',
        descriptionId: 'reportsDescription',
        listTitleId: 'reportsListTitle',
        statsId: 'reportsStats',
        listId: 'reportsList'
    });
}

function renderDashboardActions(actions) {
    actions.forEach((label, index) => {
        const button = document.getElementById(`actionBtn${index + 1}`);
        if (!button) {
            return;
        }

        button.textContent = label;
    });
}

function renderDashboardSection(content, targets) {
    const title = document.getElementById(targets.titleId);
    const description = document.getElementById(targets.descriptionId);
    const listTitle = document.getElementById(targets.listTitleId);
    const statsContainer = document.getElementById(targets.statsId);
    const listContainer = document.getElementById(targets.listId);

    if (title) title.textContent = content.title;
    if (description) description.textContent = content.description;
    if (listTitle) listTitle.textContent = content.listTitle;

    if (statsContainer) {
        statsContainer.innerHTML = content.stats.map(item => `
            <div class="stat-card">
                <div class="stat-icon">${item.icon}</div>
                <div class="stat-info">
                    <h3>${item.value}</h3>
                    <p>${item.label}</p>
                </div>
            </div>
        `).join('');
    }

    if (listContainer) {
        listContainer.innerHTML = content.items.map(item => `
            <div class="activity-item">
                <div class="activity-icon">${item.icon}</div>
                <div class="activity-content">
                    <p>${item.title}</p>
                    <span>${item.meta}</span>
                </div>
            </div>
        `).join('');
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

function showFormSuccess(form, message) {
    form.querySelector('.success-message')?.remove();

    const success = document.createElement('div');
    success.className = 'success-message';
    success.textContent = message;
    success.style.color = '#0d6b5d';
    success.style.fontSize = '0.9rem';
    success.style.marginTop = '0.75rem';

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.insertAdjacentElement('afterend', success);
        return;
    }

    form.appendChild(success);
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
    showFormSuccess(event.target, 'Account created successfully');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1200);
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
