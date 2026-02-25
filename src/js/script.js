/* =============================================
   [rudv-ar] COMMAND NODE · SCRIPT
   ============================================= */

// ── SECTION NAVIGATION ──────────────────────
function switchTab(sectionId, btn) {
    // Deactivate all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    // Activate target section
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    else {
        // Find the tab with matching data-section
        const matchingTab = document.querySelector(`[data-section="${sectionId}"]`);
        if (matchingTab) matchingTab.classList.add('active');
    }

    // On mobile, close sidebar after navigation
    if (window.innerWidth <= 900) closeSidebar();

    // Scroll main content to top
    window.scrollTo(0, 0);

    // Trigger skills animation if switching to skills
    if (sectionId === 'skills') animateSkillBars();

    // Log the navigation
    addLog(`[NAV] Section accessed: ${sectionId.toUpperCase()}`, 'info');
}

// ── SIDEBAR TOGGLE (MOBILE) ──────────────────
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
}

// ── CLOCK ────────────────────────────────────
function updateClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    el.textContent = `${hh}:${mm}:${ss}`;
}
setInterval(updateClock, 1000);
updateClock();

// ── TERMINAL LOG ─────────────────────────────
const logMessages = [
    { text: '[BOOT] System node initialized', type: 'info' },
    { text: '[NET] Network interfaces configured', type: 'info' },
    { text: '[SEC] Firewall rules loaded', type: 'info' },
    { text: '[SYS] Arch Linux kernel stable', type: 'sys' },
    { text: '[WM] Bspwm session active', type: 'sys' },
    { text: '[WARN] Readiness index: 15% — training in progress', type: 'warn' },
    { text: '[DORMANT] Full activation scheduled: APR 2026', type: 'warn' },
    { text: '[GITHUB] Repositories accessible', type: 'info' },
    { text: '[SEC] HTB sessions logged — 2 machines pwned', type: 'sys' },
    { text: '[LAB] DVWA container running', type: 'info' },
    { text: '[LAB] Metasploitable2 QEMU instance online', type: 'info' },
    { text: '[INFO] Doctrine: Gita 2.47 · Boundless Action', type: 'sys' },
    { text: '[READY] Command node operational', type: 'info' },
];

let logIndex = 0;

function addLog(text, type = 'sys') {
    const terminal = document.getElementById('syslog');
    if (!terminal) return;
    const line = document.createElement('div');
    line.className = `tline ${type}`;
    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
    line.textContent = `[${ts}] ${text}`;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

function bootLogs() {
    logMessages.forEach((msg, i) => {
        setTimeout(() => {
            addLog(msg.text, msg.type);
        }, 400 + i * 600);
    });
}

// ── SKILL BAR ANIMATION ──────────────────────
function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-bar');
    bars.forEach(bar => {
        // Re-trigger animation by cloning
        const clone = bar.cloneNode(true);
        bar.parentNode.replaceChild(clone, bar);
    });
}

// ── PROFILE IMAGE HANDLING ───────────────────
function initProfileImage() {
    const img = document.getElementById('profileImg');
    const fallback = document.getElementById('photoFallback');
    if (!img) return;
    img.addEventListener('error', () => {
        img.style.display = 'none';
        if (fallback) fallback.style.display = 'flex';
    });
}

// ── SIDEBAR OVERLAY (mobile) ──────────────────
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.id = 'sidebarOverlay';
    overlay.addEventListener('click', closeSidebar);
    document.body.appendChild(overlay);
}

// ── KEYBOARD SHORTCUTS ───────────────────────
const keyMap = {
    '1': 'landing',
    '2': 'profile',
    '3': 'skills',
    '4': 'projects',
    '5': 'systems',
    '6': 'contact',
};

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const section = keyMap[e.key];
    if (section) {
        const tab = document.querySelector(`[data-section="${section}"]`);
        switchTab(section, tab);
    }
});

// ── INIT ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    createOverlay();
    initProfileImage();
    bootLogs();

    // Boot sequence: clear first placeholder line in terminal
    const terminal = document.getElementById('syslog');
    if (terminal) terminal.innerHTML = '';
});

