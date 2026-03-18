🍊 JUICIFY - Premium Cold-Pressed Juice E-Commerce
https://img.shields.io/badge/demo-live-brightgreen
https://img.shields.io/badge/React-18.2.0-61DAFB
https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC
https://img.shields.io/badge/Vite-5.0.0-646CFF
https://img.shields.io/badge/license-MIT-blue

https://via.placeholder.com/1200x400/ff9f43/ffffff?text=JUICIFY+-+Fresh+Pressed+Juices

📋 Table of Contents
Overview

✨ Features

🛠️ Tech Stack

📁 Project Structure

🚀 Getting Started

💻 Usage Guide

🔐 Authentication

🛒 Shopping Cart

🗄️ Data Persistence

📧 Email Integration

🔧 Configuration

📱 Responsive Design

📸 Screenshots

🌐 Live Demo

🤝 Contributing

📄 License

👥 Contact

📖 Overview
JUICIFY is a fully functional, modern e-commerce web application built for a premium cold-pressed juice brand. The platform offers a seamless shopping experience with user authentication, product browsing, cart management, and secure checkout. Built with React and Tailwind CSS, it features a responsive design and persistent data storage.

Live Demo: https://pennyjuicemodifiedusjucifyreact.vercel.app

✨ Features
🛍️ E-Commerce Core
Product Catalog - Browse 9+ organic juice flavors

Category Filtering - Filter by Citrus, Creamy, Tropical, Berry, etc.

Sorting Options - Sort by price (low/high) and name

Product Details - Comprehensive product pages with benefits & nutrition

Related Products - Smart recommendations based on categories

3x3 Product Grid - Clean, organized product display

👤 User Experience
User Authentication - Secure signup/login with session persistence

Shopping Cart - Add/remove items, update quantities

Persistent Cart - Cart saves automatically to localStorage

Checkout Flow - Protected checkout requiring authentication

Order Confirmation - Email receipts via Web3Forms

Welcome Messages - Personalized greetings after login

🎨 Design & Interface
Responsive Design - Mobile-first approach, works on all devices

Clean Modern UI - Orange brand colors with smooth animations

Mobile Sidebar - Hamburger menu with slide-out navigation

Loading States - Spinners and progress indicators

Toast Notifications - Success/error messages

🔧 Technical Features
Context API - Clean state management (Auth, Cart)

localStorage - Persistent data across sessions

Custom Hooks - Reusable logic for cart and auth

Form Validation - Real-time validation with error messages

API Integration - Web3Forms for email notifications

🛠️ Tech Stack
Frontend Framework
Technology	Version	Purpose
React	18.2.0	UI library with hooks
React Router DOM	6.22.0	Navigation and routing
Context API	Built-in	State management
Styling & UI
Technology	Version	Purpose
Tailwind CSS	3.3.0	Utility-first styling
React Icons	5.0.1	Icon library
Custom CSS	-	Animations & keyframes
Build Tools
Technology	Version	Purpose
Vite	5.0.0	Fast build tool & dev server
ESLint	8.55.0	Code linting
PostCSS	8.4.32	CSS processing
Autoprefixer	10.4.16	CSS vendor prefixes
Data & API
Technology	Purpose
localStorage	Client-side data persistence
Web3Forms	Email notifications
📁 Project Structure
text
juicify/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images and icons
│   │   ├── apple_juice.png
│   │   ├── avocado.png
│   │   ├── banana.png
│   │   ├── blueberry.png
│   │   ├── grapefruit.png
│   │   ├── watermelon.png
│   │   ├── pineapple.png
│   │   ├── mango.png
│   │   └── strawberry.png
│   ├── components/          # React components
│   │   ├── context/         # Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── products/        # Product-related components
│   │   │   ├── Products.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── AuthModal.jsx    # Login/signup modal
│   │   ├── CartPage.jsx     # Shopping cart page
│   │   ├── Contact.jsx      # Contact form
│   │   ├── Footer.jsx       # Site footer
│   │   ├── Hero.jsx         # Homepage hero
│   │   ├── Navbar.jsx       # Navigation
│   │   ├── ProductDetails.jsx # Product detail page
│   │   └── About.jsx        # About us page
│   ├── data/                # Data files
│   │   └── productsData.js  # Product database
│   ├── App.jsx              # Main app component
│   ├── index.css            # Global styles
│   └── main.jsx             # Entry point
├── .gitignore               # Git ignore file
├── index.html               # HTML template
├── package.json             # Dependencies
├── postcss.config.js        # PostCSS config
├── tailwind.config.js       # Tailwind config
├── vite.config.js           # Vite config
└── README.md                # Project documentation
🚀 Getting Started
Prerequisites
Node.js (v18 or higher)

npm or yarn

Installation
Clone the repository

bash
git clone https://github.com/joheaven7/penny-juice-react-tailwind.git
cd penny-juice-react-tailwind
Install dependencies

bash
npm install
# or
yarn install
Start the development server

bash
npm run dev
# or
yarn dev
Open your browser

text
http://localhost:5173
Build for Production
bash
npm run build
# or
yarn build
The build output will be in the dist folder.

💻 Usage Guide
👨‍💻 For Users
Browse Products

Navigate to the Products section

Filter by category or sort by price

Click on any product for details

Add to Cart

Click "Add" on any product card

Adjust quantities in the cart page

View cart summary anytime via navbar icon

Create Account

Click "Sign Up" in the navbar

Fill in your details

Account persists across sessions

Place Order

Add items to cart

Proceed to checkout (login required)

Fill delivery details

Confirm order

Receive email confirmation

👨‍💻 For Developers
Adding New Products
Edit src/data/productsData.js:

javascript
{
  id: 9,
  name: "New Flavor",
  price: 6.99,
  description: "Product description",
  longDescription: "Detailed description",
  image: newFlavorImg,
  category: "citrus",
  size: "16oz",
  calories: 150,
  benefits: ["Benefit 1", "Benefit 2", "Benefit 3"]
}
Customizing Colors
Edit tailwind.config.js:

javascript
theme: {
  extend: {
    colors: {
      orange: {
        500: '#f97316',
        600: '#ea580c',
      }
    }
  }
}
🔐 Authentication
The app uses a localStorage-based authentication system:

Features
Sign up with name, email, password

Login with existing credentials

Persistent login state

Protected checkout

Welcome messages on login

How it works
javascript
// User data stored in localStorage
localStorage.setItem('juicify_users', JSON.stringify(users))
localStorage.setItem('juicify_user', JSON.stringify(currentUser))
Protected Routes
Checkout page requires authentication

Cart actions available to all users

Order placement requires login

🛒 Shopping Cart
Features
Add/remove items

Update quantities

Persistent storage

Real-time total calculation

Free shipping threshold ($30)

Cart Logic
javascript
// Cart structure
{
  id: productId,
  quantity: number,
  // Product details merged when needed
}
Persistence
Cart automatically saves to localStorage and restores on page reload.

🗄️ Data Persistence
localStorage Keys
Key	Purpose
juicify_cart	Shopping cart items
juicify_user	Current user session
juicify_users	Registered users database
Persistence Behavior
Cart survives browser close/refresh

User stays logged in

All data client-side only

📧 Email Integration
Web3Forms Configuration
The app uses Web3Forms for email notifications:

Contact Form

Sends messages to your inbox

Auto-responds to users

Spam protection included

Order Confirmations

Sends order details to customer

Sends order notification to admin

Includes order summary

Setup
The app uses environment variables for the Web3Forms key:

javascript
access_key: import.meta.env.VITE_WEB3FORMS_KEY
🔧 Configuration
Environment Variables
Create a .env.local file for local development:

text
VITE_WEB3FORMS_KEY=5573cdad6-89a0-4518-a8d5-38b8218b8927
Tailwind Configuration
javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fff7ed',
          500: '#f97316',
          600: '#ea580c',
        }
      }
    }
  }
}
📱 Responsive Design
Breakpoints
Screen	Range	Layout
Mobile	< 640px	Hamburger menu, stacked
Tablet	640px - 1024px	Optimized grids
Desktop	> 1024px	Full navigation
Features
Hamburger menu on mobile

Sidebar navigation slides from right

Responsive product grid (1→2→3 columns)

Touch-friendly buttons

Optimized for all screen sizes

📸 Screenshots
Desktop Home	Products Page
https://via.placeholder.com/600x400/ff9f43/ffffff?text=Desktop+Home	https://via.placeholder.com/600x400/ff9f43/ffffff?text=Products+Page
Cart Page	Product Details
https://via.placeholder.com/600x400/ff9f43/ffffff?text=Cart+Page	https://via.placeholder.com/600x400/ff9f43/ffffff?text=Product+Details
🌐 Live Demo
Visit the live application:

URL: https://pennyjuicemodifiedusjucifyreact.vercel.app

Test Credentials
text
Email: test@example.com
Password: password123
Or create your own account!

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open a Pull Request

Guidelines
Follow existing code style

Add comments for complex logic

Test across devices

Update documentation as needed

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Contact
Yohanis Desalegn Dinsa - Lead Developer

Email: desajohn5@gmail.com

Phone: +251 941-847-108

GitHub: @joheaven7

LinkedIn: Yohanis Desalegn

Project Repository: https://github.com/joheaven7/penny-juice-react-tailwind

<div align="center"> <h3>Made with ❤️ in Finfine, Ethiopia</h3> <p>Freshly pressed every day</p> <br> <p>⭐ Star this project if you found it helpful!</p> </div>
