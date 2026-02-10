const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS for development - MUST be before other middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory data storage
let complaints = [];
let complaintIdCounter = 1;

// GET /complaints – Get all complaints
app.get('/complaints', (req, res) => {
    res.json(complaints);
});

// GET /complaints/:id – Get complaint by ID
app.get('/complaints/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const complaint = complaints.find(c => c.id === id);
    
    if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
    }
    
    res.json(complaint);
});

// POST /complaints – Add complaint
app.post('/complaints', (req, res) => {
    const { name, email, subject, complaintText } = req.body;
    
    if (!name || !email || !complaintText) {
        return res.status(400).json({ message: 'Name, email, and complaint text are required' });
    }
    
    const newComplaint = {
        id: complaintIdCounter++,
        name,
        email,
        subject: subject || 'No Subject',
        complaintText,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    complaints.push(newComplaint);
    res.status(201).json(newComplaint);
});

// PUT /complaints/:id – Update complaint status
app.put('/complaints/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!status || !['pending', 'resolved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be pending, resolved, or rejected' });
    }
    
    const complaint = complaints.find(c => c.id === id);
    
    if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
    }
    
    complaint.status = status;
    complaint.updatedAt = new Date().toISOString();
    
    res.json(complaint);
});

// DELETE /complaints/:id – Delete complaint
app.delete('/complaints/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = complaints.findIndex(c => c.id === id);
    
    if (index === -1) {
        return res.status(404).json({ message: 'Complaint not found' });
    }
    
    const deletedComplaint = complaints.splice(index, 1)[0];
    res.json({ message: 'Complaint deleted successfully', complaint: deletedComplaint });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
