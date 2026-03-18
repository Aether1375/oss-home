// Application data
const applications = [
    {
        id: 1,
        name: "LIVE - CLIENT DATA PORTAL",
        description: "Client information management and data entry"
    },
    {
        id: 2,
        name: "LIVE - QUALITY CONTROL",
        description: "Review and validate data entries"
    },
    {
        id: 3,
        name: "LIVE - MASTER DATA ENTRY",
        description: "Primary data entry system"
    },
    {
        id: 4,
        name: "LIVE - INVENTORY MANAGEMENT",
        description: "Track and manage inventory"
    },
    {
        id: 5,
        name: "LIVE - OPERATOR DASHBOARD",
        description: "Daily operations and tasks"
    },
    {
        id: 6,
        name: "LIVE - SUPERVISOR PANEL",
        description: "Team oversight and reports"
    },
    {
        id: 7,
        name: "LIVE - DATA LINKING TOOL",
        description: "Connect and relate data records"
    },
    {
        id: 8,
        name: "SIT - QUALITY CONTROL",
        description: "Testing environment for QC"
    },
    {
        id: 9,
        name: "LIVE - REPORT GENERATOR",
        description: "Create and export reports"
    }
];

// DOM Elements
const appsGrid = document.getElementById('appsGrid');
const searchInput = document.getElementById('appSearch');
const userIdDisplay = document.getElementById('userId');
const appCountDisplay = document.getElementById('appCount');

// Get user from session (for 10K users, this would come from backend)
const currentUser = {
    id: sessionStorage.getItem('oss_user_id') || 'OPERATOR_001',
    name: sessionStorage.getItem('oss_user_name') || 'John Doe'
};

// Initialize
function init() {
    // Set user ID
    if (userIdDisplay) {
        userIdDisplay.textContent = currentUser.id;
    }
    
    renderApplications(applications);
    updateAppCount(applications.length);
    setupEventListeners();
}

// Update application count
function updateAppCount(count) {
    if (appCountDisplay) {
        appCountDisplay.textContent = `${count} application${count !== 1 ? 's' : ''}`;
    }
}

// Render applications
function renderApplications(appsToRender) {
    if (!appsGrid) return;
    
    if (appsToRender.length === 0) {
        appsGrid.innerHTML = `
            <div class="no-results">
                <p style="font-size: 16px; margin-bottom: 8px;">No applications found</p>
                <p style="font-size: 13px; color: #9CA3AF;">Try adjusting your search</p>
            </div>
        `;
        return;
    }
    
    appsGrid.innerHTML = appsToRender.map(app => `
        <div class="app-card" data-app-id="${app.id}">
            <div class="app-icon">📋</div>
            <div class="app-info">
                <h3>${app.name}</h3>
                <p>${app.description}</p>
            </div>
        </div>
    `).join('');
    
    // Add click event listeners
    document.querySelectorAll('.app-card').forEach(card => {
        card.addEventListener('click', () => handleAppClick(card.dataset.appId));
    });
}

// Handle app click
function handleAppClick(appId) {
    const app = applications.find(a => a.id === parseInt(appId));
    console.log('Opening:', app.name);
    
    // Remove selection from all cards
    document.querySelectorAll('.app-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    const selectedCard = document.querySelector(`[data-app-id="${appId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    // Here you would navigate to the actual application
    // window.location.href = `/app/${appId}`;
}

// Search functionality
function handleSearch(searchTerm) {
    const filtered = applications.filter(app => 
        app.name.toLowerCase().includes(searchTerm) ||
        app.description.toLowerCase().includes(searchTerm)
    );
    
    renderApplications(filtered);
    updateAppCount(filtered.length);
}

// Setup event listeners
function setupEventListeners() {
    if (searchInput) {
        let debounceTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                handleSearch(e.target.value.toLowerCase());
            }, 300);
        });
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('oss_user_id');
            sessionStorage.removeItem('oss_user_name');
            window.location.href = '/login.html';
        });
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', init);