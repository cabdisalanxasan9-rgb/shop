# JannoFresh - Secure Vegetable Shopping Platform

A modern, secure e-commerce platform built with Next.js and Node.js, featuring comprehensive authentication and security measures.

## 🚀 Features

### Security Features
- **JWT Token-Based Authentication** - Secure session management
- **Password Hashing** - Bcrypt encryption for user passwords
- **Input Validation** - Protection against XSS and injection attacks
- **Rate Limiting** - Prevents brute force attacks
- **HTTPS Ready** - Secure communication structure
- **CSRF Protection** - Secure cookie handling
- **SQL Injection Prevention** - MongoDB sanitization

### User Features
- **Secure Registration** - Email validation and password requirements
- **Secure Login** - Encrypted authentication
- **Access Control** - Protected routes for authenticated users only
- **Session Management** - Automatic logout on token expiration
- **Responsive Design** - Mobile and desktop optimized

### Technical Stack
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Bcrypt password hashing
- **Security**: Helmet, CORS, Rate Limiting, Input Validation

## 🛡️ Security Implementation

### Authentication Flow
1. User registers/logs in with email and password
2. Password is hashed using Bcrypt (12 salt rounds)
3. JWT token is generated with 7-day expiration
4. Token is stored in secure HTTP-only cookies
5. All API requests include Bearer token in Authorization header

### Security Measures
- **Helmet.js**: Security headers and XSS protection
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Sanitization**: MongoDB query injection prevention
- **CORS**: Configured for production domains only
- **Password Requirements**: Minimum 6 characters
- **Email Validation**: Proper format verification
- **Secure Cookies**: HttpOnly, Secure, SameSite=Strict

## 📁 Project Structure

```
shopping/
├── app/                    # Next.js app router
│   ├── auth/
│   │   ├── secure-login/    # Secure login page
│   │   └── secure-signup/   # Secure signup page
│   └── page.tsx           # Protected main page
├── components/
│   ├── SecureAuthGuard.tsx  # Authentication guard
│   └── ...              # Other components
├── context/
│   └── SecureAuthContext.tsx # Auth state management
├── lib/
│   ├── api.ts            # API client with security
│   └── orders.ts          # Order management
├── server.js              # Secure backend server
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shopping
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   # Development (runs both frontend and backend)
   npm run dev
   
   # Production
   npm run build
   npm start
   ```

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/JannoFresh
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
NEXT_PUBLIC_API_URL=http://localhost:5000/api
CORS_ORIGINS=http://localhost:3000
NODE_ENV=development
```

Production example:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Security Headers
All API responses include:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## 📱 Access Control

### Protected Routes
All main application routes require authentication:
- Home page (`/`)
- Profile (`/profile`)
- Orders (`/orders/*`)
- Settings (`/settings`)

### Public Routes
Only authentication pages are public:
- Login (`/auth/secure-login`)
- Signup (`/auth/secure-signup`)

## 🔒 Security Best Practices

1. **Password Security**
   - Minimum 6 characters
   - Bcrypt hashing with 12 salt rounds
   - Never stored in plain text

2. **Token Security**
   - JWT with strong secret key
   - 7-day expiration
   - Secure HTTP-only cookies

3. **Input Validation**
   - Server-side validation for all inputs
   - XSS prevention
   - SQL injection prevention

4. **Rate Limiting**
   - 100 requests per 15 minutes
   - Prevents brute force attacks

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Configure proper MongoDB URI
3. Use strong JWT secret
4. Enable HTTPS
5. Configure proper CORS origins

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Built with ❤️ for secure e-commerce**
