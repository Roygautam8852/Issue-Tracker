// Admin Panel JavaScript

let allComplaints = [];
let currentFilter = 'all';

// Load all complaints when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadComplaints();
    
    // Add filter button event listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
    
    // Add search input event listener
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
});

// Function to load and display all complaints
async function loadComplaints() {
    const container = document.getElementById('complaintsContainer');
    
    try {
        container.innerHTML = '<p class="loading">Loading complaints...</p>';
        
        const response = await fetch('http://localhost:3000/complaints');
        allComplaints = await response.json();
        
        updateStats(allComplaints);
        displayComplaints(allComplaints);
        
    } catch (error) {
        container.innerHTML = '<p class="message error">Error loading complaints</p>';
        console.error('Error:', error);
    }
}

// Function to update dashboard statistics
function updateStats(complaints) {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'pending').length;
    const resolved = complaints.filter(c => c.status === 'resolved').length;
    const rejected = complaints.filter(c => c.status === 'rejected').length;
    
    document.getElementById('totalCount').textContent = total;
    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('resolvedCount').textContent = resolved;
    document.getElementById('rejectedCount').textContent = rejected;
}

// Function to display complaints
function displayComplaints(complaints) {
    const container = document.getElementById('complaintsContainer');
    
    if (complaints.length === 0) {
        container.innerHTML = '<p class="no-complaints">No complaints found</p>';
        return;
    }
    
    container.innerHTML = complaints.map(complaint => createComplaintHTML(complaint)).join('');
    
    // Add event listeners to complaint cards
    addEventListeners();
}

// Function to create HTML for a complaint card
function createComplaintHTML(complaint) {
    const date = new Date(complaint.createdAt).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const complaintId = `CMP${String(complaint.id).padStart(3, '0')}`;
    
    return `
        <div class="complaint-card" data-id="${complaint.id}">
            <div class="complaint-header" onclick="toggleDetails(${complaint.id})">
                <div>
                    <div class="complaint-id">${complaintId}</div>
                    <h3 class="complaint-title">${complaint.subject || 'No Subject'}</h3>
                    <div class="complaint-meta">
                        <div class="meta-item">
                            <span class="meta-icon">👤</span>
                            <span>${complaint.name}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">✉️</span>
                            <span>${complaint.email}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">📅</span>
                            <span>Submitted: ${date}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <span class="status-badge status-${complaint.status}">${complaint.status}</span>
                </div>
            </div>
            
            <div class="complaint-details" id="details-${complaint.id}">
                <div class="complaint-description">
                    ${complaint.complaintText}
                </div>
                
                <div class="complaint-actions">
                    <button class="action-btn btn-resolved" onclick="updateStatus(${complaint.id}, 'resolved')">
                        Mark Resolved
                    </button>
                    <button class="action-btn btn-pending" onclick="updateStatus(${complaint.id}, 'pending')">
                        Mark Pending
                    </button>
                    <button class="action-btn btn-rejected" onclick="updateStatus(${complaint.id}, 'rejected')">
                        Mark Rejected
                    </button>
                    <button class="action-btn btn-delete" onclick="deleteComplaint(${complaint.id})">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Function to toggle complaint details
function toggleDetails(id) {
    const details = document.getElementById(`details-${id}`);
    details.classList.toggle('expanded');
}

// Function to add event listeners
function addEventListeners() {
    // Event listeners are now inline in the HTML
}

// Function to handle filter buttons
function handleFilter(e) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    currentFilter = e.target.dataset.filter;
    applyFilters();
}

// Function to handle search
function handleSearch(e) {
    applyFilters();
}

// Function to apply filters and search
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let filtered = allComplaints;
    
    // Apply status filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(c => c.status === currentFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(c => {
            const complaintId = `CMP${String(c.id).padStart(3, '0')}`.toLowerCase();
            const name = c.name.toLowerCase();
            const subject = (c.subject || '').toLowerCase();
            const email = c.email.toLowerCase();
            
            return complaintId.includes(searchTerm) ||
                   name.includes(searchTerm) ||
                   subject.includes(searchTerm) ||
                   email.includes(searchTerm);
        });
    }
    
    displayComplaints(filtered);
}

// Function to handle status update
async function updateStatus(id, status) {
    try {
        const response = await fetch(`http://localhost:3000/complaints/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        
        if (response.ok) {
            // Reload complaints to show updated status
            await loadComplaints();
        } else {
            const data = await response.json();
            alert(data.message || 'Error updating complaint');
        }
    } catch (error) {
        alert('Error connecting to server');
        console.error('Error:', error);
    }
}

// Function to handle delete
async function deleteComplaint(id) {
    const complaintId = `CMP${String(id).padStart(3, '0')}`;
    
    if (!confirm(`Are you sure you want to delete complaint ${complaintId}?`)) {
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/complaints/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            // Reload complaints to show updated list
            await loadComplaints();
        } else {
            const data = await response.json();
            alert(data.message || 'Error deleting complaint');
        }
    } catch (error) {
        alert('Error connecting to server');
        console.error('Error:', error);
    }
}
