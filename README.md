# Personal Notes & Bookmark Manager

A full-stack web application for managing personal notes and bookmarks with search, tagging, and favorites functionality.

## 🚀 Features

### Core Features
- **Notes Management**: Create, read, update, and delete notes
- **Bookmarks Management**: Save and organize web bookmarks
- **Search & Filter**: Search by text and filter by tags
- **Tagging System**: Organize notes and bookmarks with custom tags
- **Favorites**: Mark important items as favorites

### Bonus Features
- **User Authentication**: JWT-based authentication system
- **Auto-fetch Metadata**: Automatically fetch page titles from bookmark URLs
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Real-time Updates**: Instant UI updates after operations

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Axios & Cheerio for URL metadata fetching

### Frontend
- Next.js (React)
- Tailwind CSS
- Axios for API calls
- React Icons
- Context API for state management

## 📁 Project Structure

```
notes-bookmark-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── noteController.js
│   │   └── bookmarkController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Note.js
│   │   └── Bookmark.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── noteRoutes.js
│   │   └── bookmarkRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── urlMetadata.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── components/
    │   ├── Navbar.js
    │   ├── ProtectedRoute.js
    │   ├── NoteCard.js
    │   ├── BookmarkCard.js
    │   ├── NoteForm.js
    │   ├── BookmarkForm.js
    │   ├── SearchBar.js
    │   └── Modal.js
    ├── context/
    │   └── AuthContext.js
    ├── pages/
    │   ├── _app.js
    │   ├── index.js
    │   ├── login.js
    │   ├── register.js
    │   ├── notes.js
    │   └── bookmarks.js
    ├── styles/
    │   └── globals.css
    ├── utils/
    │   └── api.js
    ├── .env.example
    ├── next.config.js
    ├── postcss.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes-bookmark-manager
JWT_SECRET=your_secret_key_here_change_this
NODE_ENV=development
```

5. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Notes Endpoints

#### Get All Notes
```http
GET /api/notes
Authorization: Bearer <token>

# With search and filters
GET /api/notes?q=searchTerm&tags=work,personal
```

#### Get Single Note
```http
GET /api/notes/:id
Authorization: Bearer <token>
```

#### Create Note
```http
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Note",
  "content": "Note content here",
  "tags": ["work", "important"],
  "isFavorite": false
}
```

#### Update Note
```http
PUT /api/notes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Note",
  "content": "Updated content",
  "tags": ["work"],
  "isFavorite": true
}
```

#### Delete Note
```http
DELETE /api/notes/:id
Authorization: Bearer <token>
```

### Bookmarks Endpoints

#### Get All Bookmarks
```http
GET /api/bookmarks
Authorization: Bearer <token>

# With search and filters
GET /api/bookmarks?q=searchTerm&tags=articles,tools
```

#### Get Single Bookmark
```http
GET /api/bookmarks/:id
Authorization: Bearer <token>
```

#### Create Bookmark
```http
POST /api/bookmarks
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://example.com",
  "title": "Example Site",
  "description": "A useful website",
  "tags": ["resources", "tools"],
  "isFavorite": false
}

# Title can be omitted for auto-fetch
{
  "url": "https://example.com",
  "tags": ["resources"]
}
```

#### Update Bookmark
```http
PUT /api/bookmarks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://example.com",
  "title": "Updated Title",
  "description": "Updated description",
  "tags": ["resources"],
  "isFavorite": true
}
```

#### Delete Bookmark
```http
DELETE /api/bookmarks/:id
Authorization: Bearer <token>
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- User-specific data isolation
- CORS enabled for frontend access

## 🎨 UI Features

- Clean and modern design
- Responsive layout (mobile, tablet, desktop)
- Loading states and error handling
- Search and filter functionality
- Modal forms for create/edit operations
- Toast notifications for user feedback
- Favorite indicators
- Tag management

## 🧪 Testing the Application

### Using cURL

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Create a note (replace TOKEN with your JWT):**
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Test Note","content":"This is a test note","tags":["test"]}'
```

## 🌟 Key Highlights

- **Clean Architecture**: Modular code structure with separation of concerns
- **Error Handling**: Comprehensive error handling and validation
- **User Experience**: Intuitive UI with immediate feedback
- **Scalability**: Built with best practices for easy scaling
- **Documentation**: Well-documented code and API endpoints

## 📝 Development Notes

### Code Quality
- Consistent naming conventions
- Proper error handling at all levels
- Input validation on both frontend and backend
- Clean and maintainable code structure

### Performance
- Efficient database queries with indexing
- Optimized React components with proper state management
- Lazy loading and code splitting with Next.js

## 🤝 Contributing

This is a demonstration project for Dev Innovations Labs assignment.

## 📄 License

This project is created for educational and demonstration purposes.

## 👨‍💻 Author

Created as part of the Full Stack Developer assignment for Dev Innovations Labs.

---

**Note**: Make sure MongoDB is running before starting the backend server. You can use MongoDB Atlas for a cloud database or install MongoDB locally.
