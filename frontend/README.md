# Ethiopian Real Estate Platform - Frontend

Modern React frontend for the Ethiopian Real Estate Platform built with Vite, React Router, and Tailwind CSS.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Zustand** - State management
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications

## Features

- ✅ User authentication (login/register)
- ✅ Browse properties with filters
- ✅ Property details page
- ✅ Send inquiries
- ✅ User dashboard
- ✅ Responsive design
- ✅ Protected routes
- ✅ Toast notifications

## Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The app will run on `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── PrivateRoute.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Properties.jsx
│   │   ├── PropertyDetails.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── services/       # API services
│   │   └── api.js
│   ├── store/          # State management
│   │   └── authStore.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The frontend connects to the backend API running on `http://localhost:5000`.

API proxy is configured in `vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  }
}
```

## Authentication

Authentication is handled using JWT tokens stored in localStorage.

The auth store (`src/store/authStore.js`) manages:
- User login/register
- Token storage
- User state
- Logout

## Routing

Routes are defined in `src/App.jsx`:

- `/` - Home page
- `/properties` - Browse properties
- `/properties/:id` - Property details
- `/login` - Login page
- `/register` - Register page
- `/dashboard/*` - Protected dashboard routes

## Styling

Tailwind CSS is used for styling with custom utility classes defined in `src/index.css`:

- `.btn` - Button base
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.btn-outline` - Outline button
- `.input` - Input field
- `.card` - Card container

## State Management

Zustand is used for global state management:

- `authStore` - Authentication state

## Next Steps

### To Complete:
1. Create dashboard sub-pages:
   - MyProperties component
   - MyInquiries component
   - Profile component
2. Add property creation form
3. Add image upload functionality
4. Add admin dashboard (if admin role)
5. Add loading states and skeletons
6. Add error boundaries
7. Add form validation messages
8. Optimize images and performance

### Future Enhancements:
- Property search with autocomplete
- Map integration for property locations
- Image gallery/carousel
- Property comparison
- Favorites/wishlist
- Chat/messaging system
- Email notifications
- Social sharing
- SEO optimization
- PWA support

## Development Tips

1. **Hot Module Replacement (HMR)** is enabled by default
2. **Tailwind CSS IntelliSense** extension recommended for VS Code
3. **React Developer Tools** browser extension recommended
4. Use **React Hook Form** for complex forms
5. Use **React Hot Toast** for notifications

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Environment Variables

Create a `.env` file in the frontend directory if needed:

```env
VITE_API_URL=http://localhost:5000/api
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT