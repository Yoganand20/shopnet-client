# ShopNet - E-Commerce Client Storefront

A modern, responsive, and fully functional customer-facing web application for the ShopNet e-commerce platform. This storefront allows users to seamlessly browse products, manage their shopping carts, and securely check out, providing a premium shopping experience powered by React, Shadcn UI, and Tailwind CSS.

Server backend: https://github.com/Yoganand20/ShopNet-API  
Admin frontend: https://github.com/Yoganand20/shopnet-admin

## Key Features

- **Product Catalog & Search**: Browse categories, filter items, and search for specific products with real-time updates.
- **Shopping Cart**: Add, remove, and update quantities of products in the cart with instant total calculations.
- **User Authentication**: Secure user registration, login, and password management.
- **Checkout & Payments**: Seamless checkout flow with address management and payment integration placeholders.
- **User Profile & Order History**: Customers can view their account details, track current order statuses (Pending, Shipped, Delivered), and review past purchases.
- **State Management**: Global state handling using Redux Toolkit for efficient cart and user session data flow.
- **Modern UI/UX**: Clean, mobile-first interface using Shadcn UI components and Tailwind CSS.
- **API Integration**: Centralized API calls using Axios.

## Tech Stack

- **Frontend Framework**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Folder Structure

```bash
src/
├── assets/          # Static assets (images, banners, icons)
├── components/      # Reusable UI components =
│   ├── form/        # All the forms used in the application
│   └── ui/          # Shadcn UI primitives
├── features/        # Redux slices (cartSlice, authSlice, productSlice, etc.)
├── hooks/           # Custom React hooks (e.g., useCart, useDebounce)
├── pages/           # Page components (Home, ProductDetails, Cart, Checkout)
├── services/        # API configuration and Axios interceptors
├── lib/             # Helper functions (currency formatter, validation)
├── App.jsx          # Main application component
└── main.jsx         # Entry point
```

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)

- npm or yarn

- shopnet-api

### Installation

1. Clone the repository

```bash
git clone https://github.com/Yoganand20/shopnet-client.git
cd shopnet-client
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Configure Environment Variable
   Create a .env file in the root directory and add your API endpoint:

```code
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

4. Start backend server
   Clone and start backend server from [repo](https://github.com/Yoganand20/ShopNet-API)

5. Run the development server

```bash
npm run dev
```

6. Build for production

```bash
npm run build
```
