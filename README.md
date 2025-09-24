# EventQuest - Next.js Event Management Platform

A modern, full-stack event management platform built with Next.js 15, designed specifically for college students. EventQuest allows users to discover, create, and manage campus events with a comprehensive authentication and authorization system.

## 🚀 Features

### Core Functionality
- **Event Discovery**: Browse and search campus events with advanced filtering
- **Event Management**: Create, edit, and delete events with rich details
- **User Authentication**: Secure sign-up/sign-in with role-based access control
- **Event Registration**: Register for events and manage attendance
- **Real-time Updates**: Automatic UI updates without page refreshes

### User Roles
- **Students (USER)**: Browse events, register for events, view personal dashboard
- **Administrators (ADMIN)**: Full event management, user oversight, analytics dashboard

### Technical Features
- **Modern Stack**: Next.js 15 with App Router and React 19
- **Database**: SQLite with Prisma ORM for robust data management
- **Authentication**: NextAuth.js with secure credential-based auth
- **Responsive Design**: Mobile-first design optimized for all devices
- **Image Optimization**: Advanced image handling with WebP/AVIF support
- **Server Components**: Optimized performance with React Server Components

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.3 with Turbopack
- **Runtime**: React 19.1.0
- **Database**: SQLite with Prisma 6.16.2
- **Authentication**: NextAuth.js 4.24.11
- **Password Hashing**: bcryptjs
- **Styling**: CSS Modules with modern responsive design
- **Development**: ESLint for code quality

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/UCD-Professional-Academy/eventquest-next.git
   cd eventquest-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.local.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Create and migrate database
   npx prisma db push
   
   # Seed with sample college events
   npx prisma db seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🗄️ Database Schema

The application uses a relational database with the following models:

- **User**: Student/admin profiles with role-based permissions
- **Event**: Campus events with details, capacity, and pricing
- **Registration**: Many-to-many relationship for event attendance
- **Account/Session**: NextAuth.js authentication tables

## 🔐 Authentication

### Default Accounts (for testing)
- **Admin**: `admin@ucd.ie` / `admin123`
- **Student**: `student@ucd.ie` / `student123`

### Role-Based Access
- **Public**: View events and event details
- **Authenticated Users**: Register for events, access dashboard
- **Admins**: Create/edit/delete events, access admin panel

## 📱 API Routes

### Events API
- `GET /api/events` - List all events with filtering
- `GET /api/events/[id]` - Get event details
- `POST /api/events` - Create new event (admin only)
- `PUT /api/events/[id]` - Update event (admin only)
- `DELETE /api/events/[id]` - Delete event (admin only)

### Authentication API
- `POST /api/auth/signin` - User sign-in
- `POST /api/auth/signout` - User sign-out
- `GET /api/auth/session` - Get current session

### Utility APIs
- `GET /api/admin/stats` - Admin analytics
- `POST /api/revalidate` - Cache invalidation
- `GET /api/time` - Server time
- `GET /api/ping` - Health check

## 🎨 Project Structure

```
eventquest-next/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   ├── NavBar.js          # Navigation component
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── events/            # Event pages and components
│   ├── dashboard/         # User dashboard
│   ├── admin/             # Admin panel
│   └── lib/               # Shared utilities
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js           # Sample data
├── middleware.js          # Route protection
└── next.config.mjs       # Next.js configuration
```

## 🚀 Development

### Available Scripts

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Database operations
npx prisma studio          # Database GUI
npx prisma db push        # Apply schema changes
npx prisma db seed        # Seed sample data
npx prisma generate       # Update Prisma client
```

### Key Development Features

- **Hot Reload**: Instant updates during development
- **Turbopack**: Ultra-fast bundling and compilation
- **Server Components**: Optimized server-side rendering
- **Automatic Caching**: Intelligent cache invalidation
- **Type Safety**: Prisma-generated types for database operations

## 🎯 Sample Events

The seed data includes college-focused events such as:
- Free coding workshops and bootcamps
- Career fairs and networking sessions
- Study abroad information sessions
- Campus social events and game nights
- Mental health and wellness workshops
- Music festivals and cultural events

All events are designed with student budgets in mind, featuring many free events and affordable pricing for premium activities.

## 🔧 Configuration

### Image Optimization
The project includes optimized image handling with:
- WebP and AVIF format support
- Responsive image sizing
- Automatic optimization for different devices
- Security features for external images

### Performance
- Server-side rendering for optimal SEO
- Automatic code splitting
- Optimized bundle sizes
- Progressive image loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎓 Educational Context

This project was developed as part of the UCD Professional Academy's web development curriculum, demonstrating:
- Modern React and Next.js development patterns
- Full-stack application architecture
- Database design and management
- Authentication and authorization
- API development and integration
- Production deployment considerations

## 📞 Support

For questions, issues, or contributions, please:
- Open an issue on GitHub
- Contact the UCD Professional Academy team
- Check the documentation in the `docs/` folder

---

**EventQuest** - Connecting college students through amazing campus events! 🎉