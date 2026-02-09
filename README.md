# 📋 Online Complaint / Issue Tracker System

A full-stack web application for managing complaints and issues without a database, built with HTML, CSS, JavaScript, Node.js, and Express.js.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![Express](https://img.shields.io/badge/express-4.18.2-lightgrey)

## 📝 Description

A modern, responsive complaint tracking system where users can submit complaints and administrators can manage them through an intuitive dashboard. All data is stored in-memory using JavaScript data structures.

## ✨ Features

### User Module
- ✅ Submit complaints with auto-generated ID
- ✅ Form validation for all required fields
- ✅ Subject and detailed description support
- ✅ Email and name capture
- ✅ Success confirmation with tracking ID
- ✅ Clean, modern UI with responsive design

### Admin Module
- ✅ Dashboard with real-time statistics
  - Total complaints count
  - Pending complaints
  - Resolved complaints
  - Rejected complaints
- ✅ Search functionality (by ID, name, subject, email)
- ✅ Filter by status (All, Pending, Resolved, Rejected)
- ✅ Expandable complaint cards for details
- ✅ Update complaint status
- ✅ Delete complaints with confirmation
- ✅ Formatted complaint IDs (CMP001, CMP002, etc.)

## 🛠️ Technology Stack

**Frontend:**
- HTML5
- CSS3 (Modern design with gradients, animations)
- Vanilla JavaScript (ES6+)

**Backend:**
- Node.js
- Express.js
- In-memory data storage (no database)

## 📁 Project Structure

```
complaint-tracker/
├── server.js              # Express server with API routes
├── package.json           # Project dependencies
├── README.md             # Project documentation
└── public/
    ├── index.html        # User portal for submitting complaints
    ├── admin.html        # Admin dashboard for managing complaints
    ├── style.css         # Modern responsive styling
    └── script.js         # Admin panel JavaScript
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd minor-project1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node server.js
   ```

4. **Access the application**
   - User Portal: http://localhost:3000/index.html
   - Admin Panel: http://localhost:3000/admin.html

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/complaints` | Get all complaints |
| GET | `/complaints/:id` | Get complaint by ID |
| POST | `/complaints` | Create new complaint |
| PUT | `/complaints/:id` | Update complaint status |
| DELETE | `/complaints/:id` | Delete complaint |

### Request/Response Examples

**POST /complaints**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Product Delivery Issue",
  "complaintText": "My order has not been delivered yet..."
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Product Delivery Issue",
  "complaintText": "My order has not been delivered yet...",
  "status": "pending",
  "createdAt": "2026-02-09T12:00:00.000Z"
}
```

## 🎨 Features Highlight

### Modern UI/UX
- **Gradient Header** with animated logo
- **Glassmorphism Effects** on navigation buttons
- **Card-based Layout** for better organization
- **Color-coded Status Badges** (Pending, Resolved, Rejected)
- **Smooth Animations** and transitions
- **Mobile-first Responsive Design**

### Admin Dashboard
- **Live Statistics** showing complaint metrics
- **Real-time Search** across all fields
- **One-click Filtering** by status
- **Expandable Cards** for detailed view
- **Quick Actions** for status updates

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices (320px - 767px)
- 📱 Tablets (768px - 1199px)
- 💻 Desktop (1200px+)

## 🔒 Constraints & Rules

✅ No database - uses in-memory data structures  
✅ No frontend frameworks (React, Vue, Angular, etc.)  
✅ Vanilla JavaScript only  
✅ Express.js for backend  

## 🎯 Use Cases

1. **Customer Support** - Track customer complaints and issues
2. **HR Department** - Manage employee grievances
3. **Educational Institutions** - Handle student complaints
4. **Service Industry** - Monitor service-related issues

## 🔄 Data Persistence Note

⚠️ **Important:** Since this application uses in-memory storage, all data will be lost when the server restarts. This is by design as per project requirements (no database allowed).

For production use, consider implementing:
- MongoDB for persistent storage
- Redis for caching
- File-based storage as a lightweight alternative

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as part of Minor Project - 1 assignment

## 🙏 Acknowledgments

- Modern design inspired by contemporary web applications
- Built following RESTful API best practices
- Responsive design principles applied throughout

---

**Note:** Make sure to run `node server.js` before accessing the application. The server must be running on port 3000 for the frontend to work properly.
