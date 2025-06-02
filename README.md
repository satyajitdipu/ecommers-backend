# SHOPX E-commerce Backend

A modern, feature-rich Node.js backend for e-commerce applications with product management, order processing, payment integration, and an admin dashboard.

## Features

- **Product Management**: Create, read, update, and delete products
- **Order Processing**: Handle customer orders with various payment statuses
- **Payment Integration**: Razorpay payment gateway integration
- **Admin Dashboard**: Comprehensive admin interface for managing products, orders, and analytics
- **Email Notifications**: Automated email notifications for order status updates
- **Database Integration**: MySQL database for data persistence

## Project Structure

```
├── controllers/       # Business logic for handling requests
│   ├── orderController.js
│   └── productController.js
├── models/           # Database connection and models
│   └── db.js
├── routes/           # API route definitions
│   ├── adminRoutes.js
│   ├── orderRoutes.js
│   ├── paymentRoutes.js
│   └── productRoutes.js
├── public/           # Static files
│   └── admin/        # Admin dashboard interface
│       └── dashboard.html
├── utils/            # Utility functions
│   └── emailService.js
├── .env              # Environment variables (create this file)
├── server.js         # Application entry point
└── package.json      # Project dependencies
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/payment/order/:orderId` - Get order details

### Admin
- `GET /api/admin/products` - Get all products (admin)
- `GET /api/admin/orders` - Get all orders (admin)
- `GET /admin` - Access the admin dashboard

## Setup Guide

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- Razorpay account (for payment processing)
- SMTP server access (for email notifications)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/satyajitdipu/ecommers-backend
   cd ecommers-backend
   ```

2. Install dependencies
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Server
   PORT=5000

   # Database
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=ecommerce

   # Razorpay
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret

   # Email
   MAIL_HOST=smtp.example.com
   MAIL_PORT=587
   MAIL_USER=your_email@example.com
   MAIL_PASS=your_email_password
   ```

4. Set up the database
   ```sql
   CREATE DATABASE ecommerce;
   USE ecommerce;

   CREATE TABLE products (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     price DECIMAL(10, 2) NOT NULL,
     image VARCHAR(255),
     inventory INT DEFAULT 0,
     variant VARCHAR(255)
   );

   CREATE TABLE orders (
     id VARCHAR(36) PRIMARY KEY,
     product_id INT,
     full_name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     phone VARCHAR(20),
     address TEXT,
     city VARCHAR(100),
     state VARCHAR(100),
     zip VARCHAR(20),
     variant VARCHAR(255),
     quantity INT DEFAULT 1,
     total DECIMAL(10, 2) NOT NULL,
     status VARCHAR(50) DEFAULT 'pending',
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (product_id) REFERENCES products(id)
   );

   CREATE TABLE payment (
     id INT AUTO_INCREMENT PRIMARY KEY,
     order_id VARCHAR(36),
     razorpay_payment_id VARCHAR(255),
     razorpay_order_id VARCHAR(255),
     razorpay_signature VARCHAR(255),
     status VARCHAR(50),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (order_id) REFERENCES orders(id)
   );
   ```

5. Start the server
   ```sh
   npm start
   ```

6. Access the admin dashboard
   - URL: `http://localhost:5000/admin`
   - Default credentials: username: `admin`, password: `admin123`

## Development

### Adding New Features

1. Create new route files in the `routes/` directory
2. Implement controller logic in the `controllers/` directory
3. Update the `server.js` file to include new routes

### Customizing Email Templates

Modify the email HTML templates in the `orderController.js` file to customize email notifications.

## Credits

- Developed by Satyajit Sahoo
- UI Design: Satyajit Sahoo
- Icons: Bootstrap Icons
- Charts: Chart.js

## License

ISC
