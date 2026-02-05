# Backend - Notes & Bookmark Manager API

RESTful API for managing notes and bookmarks with user authentication.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes-bookmark-manager
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running:
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas cloud database
# Update MONGODB_URI in .env with your Atlas connection string
```

### 4. Run the Server
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server will start on `http://localhost:5000`

## API Routes

### Health Check
- `GET /api/health` - Check if server is running

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Notes
- `GET /api/notes` - Get all user notes (Protected)
- `GET /api/notes/:id` - Get single note (Protected)
- `POST /api/notes` - Create note (Protected)
- `PUT /api/notes/:id` - Update note (Protected)
- `DELETE /api/notes/:id` - Delete note (Protected)

### Bookmarks
- `GET /api/bookmarks` - Get all user bookmarks (Protected)
- `GET /api/bookmarks/:id` - Get single bookmark (Protected)
- `POST /api/bookmarks` - Create bookmark (Protected)
- `PUT /api/bookmarks/:id` - Update bookmark (Protected)
- `DELETE /api/bookmarks/:id` - Delete bookmark (Protected)

## Features

### Core Features
- User authentication with JWT
- CRUD operations for notes and bookmarks
- Search by text (title/content)
- Filter by tags
- User-specific data isolation

### Bonus Features
- Auto-fetch title from URL if not provided
- Comprehensive error handling
- Input validation
- Proper HTTP status codes

## Database Models

### User
```javascript
{
  username: String (required, unique, min: 3)
  email: String (required, unique, lowercase)
  password: String (required, hashed, min: 6)
  timestamps: true
}
```

### Note
```javascript
{
  title: String (required, max: 200)
  content: String (required)
  tags: [String]
  isFavorite: Boolean (default: false)
  user: ObjectId (ref: User, required)
  timestamps: true
}
```

### Bookmark
```javascript
{
  url: String (required, validated)
  title: String (required, max: 200)
  description: String (max: 500)
  tags: [String]
  isFavorite: Boolean (default: false)
  user: ObjectId (ref: User, required)
  timestamps: true
}
```

## Dependencies

### Production
- express - Web framework
- mongoose - MongoDB ODM
- cors - Enable CORS
- dotenv - Environment variables
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- axios - HTTP client for URL fetching
- cheerio - HTML parsing for metadata
- validator - Input validation

### Development
- nodemon - Auto-restart server on changes

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "message": "Error message here",
  "stack": "Stack trace (development only)"
}
```

## Testing

Test the API using cURL, Postman, or any HTTP client.

### Example: Register a user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Example: Create a note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Note",
    "content": "This is the content",
    "tags": ["personal", "ideas"]
  }'
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Protected routes require valid token
- Users can only access their own data
- Input validation on all endpoints
- CORS configured for frontend access
