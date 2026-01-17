# Contributing to PropertyHub

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git
- npm or yarn

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/property-hub-platform.git
   cd property-hub-platform
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   - Copy `backend/.env.example` to `backend/.env`
   - Fill in your MongoDB URI and other required variables

4. **Start development servers**
   ```bash
   npm run dev
   ```

## 🛠️ Development Guidelines

### Code Style
- Use ES6+ features
- Follow consistent indentation (2 spaces)
- Use meaningful variable and function names
- Add comments for complex logic
- Use async/await instead of callbacks

### Commit Messages
Follow the conventional commit format:
```
type(scope): description

Examples:
feat(auth): add password reset functionality
fix(api): resolve property search filtering bug
docs(readme): update installation instructions
style(frontend): improve responsive design
```

### Branch Naming
- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation updates
- `refactor/description` - for code refactoring

## 📝 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Add tests if applicable
   - Update documentation as needed

3. **Test your changes**
   ```bash
   # Run backend tests
   cd backend && npm test
   
   # Test frontend build
   cd frontend && npm run build
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Use the PR template
   - Provide clear description of changes
   - Link related issues
   - Request review from maintainers

## 🐛 Bug Reports

When reporting bugs, please include:
- **Environment**: OS, Node.js version, browser
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Error messages**: Full error logs

## 💡 Feature Requests

For new features:
- Check existing issues first
- Provide clear use case
- Explain the problem it solves
- Consider implementation complexity
- Be open to discussion and feedback

## 🏗️ Project Structure

```
property-hub-platform/
├── backend/                # Node.js/Express API
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── server.js          # Entry point
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
└── docs/                  # Documentation
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Property creation and editing
- [ ] Property search and filtering
- [ ] Inquiry system functionality
- [ ] Image upload and display
- [ ] Responsive design on mobile

## 📚 Resources

- [React Documentation](https://reactjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Material-UI Components](https://mui.com/components/)

## 🤝 Community

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Provide constructive feedback
- Follow our Code of Conduct

## 📞 Getting Help

- Create an issue for bugs or questions
- Join our discussions
- Check existing documentation
- Review closed issues for solutions

Thank you for contributing to PropertyHub! 🏡✨