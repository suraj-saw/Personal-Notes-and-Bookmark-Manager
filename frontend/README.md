# Frontend - Notes & Bookmark Manager

Modern, responsive web application for managing notes and bookmarks built with Next.js and Tailwind CSS.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the frontend root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
npm run dev
```

Application will start on `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
npm start
```

## Pages

### Public Pages
- `/` - Home page (redirects to notes if logged in, login if not)
- `/login` - User login
- `/register` - User registration

### Protected Pages (require authentication)
- `/notes` - Notes management
- `/bookmarks` - Bookmarks management

## Components

### Layout Components
- `Navbar` - Navigation bar with user info and logout
- `ProtectedRoute` - HOC for protecting routes

### Feature Components
- `NoteCard` - Display individual note
- `BookmarkCard` - Display individual bookmark
- `NoteForm` - Create/edit note form
- `BookmarkForm` - Create/edit bookmark form
- `SearchBar` - Search and filter component
- `Modal` - Reusable modal component

## State Management

### Context API
- `AuthContext` - Global authentication state
  - User information
  - Login/logout functions
  - Registration
  - Loading state

### Local State
- Component-level state using React hooks
- Form state management
- UI state (modals, loading, etc.)

## Features

### Authentication
- User registration with validation
- User login with JWT token
- Persistent authentication (localStorage)
- Protected routes
- Automatic token refresh check

### Notes Management
- Create, read, update, delete notes
- Search notes by text
- Filter by tags
- Mark as favorite
- Real-time updates

### Bookmarks Management
- Create, read, update, delete bookmarks
- Search bookmarks by text
- Filter by tags
- Mark as favorite
- Auto-fetch title from URL
- Open in new tab

### UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Loading indicators
- Error handling with user feedback
- Confirmation dialogs for delete actions
- Modal forms for create/edit
- Tag management
- Favorite indicators
- Clean and modern design

## Styling

### Tailwind CSS Configuration
- Custom color palette (primary blues)
- Responsive utilities
- Custom component classes
- Mobile-first approach

### Custom Components Classes
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary buttons
- `.btn-danger` - Danger/delete buttons
- `.input-field` - Form inputs
- `.card` - Card container
- `.tag` - Tag badge

## API Integration

### Axios Configuration
- Base URL configuration
- Automatic token injection
- Request/response interceptors
- Error handling

### API Methods
All API calls use the custom axios instance from `utils/api.js`

## Dependencies

### Core
- next - React framework
- react - UI library
- react-dom - React DOM bindings

### UI
- tailwindcss - Utility-first CSS
- react-icons - Icon library
- autoprefixer - CSS post-processor
- postcss - CSS transformer

### HTTP & State
- axios - HTTP client

## Development

### File Structure
```
frontend/
├── components/      # Reusable components
├── context/        # React Context providers
├── pages/          # Next.js pages
├── styles/         # Global styles
├── utils/          # Utility functions
└── public/         # Static assets
```

### Code Style
- Functional components with hooks
- ESLint for code quality
- Consistent naming conventions
- Component-level organization

## Environment Variables

Required variables in `.env.local`:
- `NEXT_PUBLIC_API_URL` - Backend API URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Performance

- Next.js automatic code splitting
- Optimized images
- Lazy loading
- Minimal bundle size

## Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus management

## Testing Locally

1. Ensure backend is running on `http://localhost:5000`
2. Start frontend development server
3. Open `http://localhost:3000`
4. Register a new account
5. Start creating notes and bookmarks!

## Common Issues

### API Connection Error
- Check if backend is running
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS configuration in backend

### Authentication Issues
- Clear localStorage and try again
- Check JWT token expiration (30 days default)
- Verify backend JWT_SECRET matches

### Build Errors
- Delete `.next` folder and rebuild
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies
