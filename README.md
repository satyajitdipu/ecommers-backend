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
- `POST /api/orders` - Create a new order (with payment link)
- `GET /api/payment/order/:orderId` - Get order details

### Payments
- `POST /api/payment/save-payment` - Save payment details after Razorpay payment

### Admin
- `GET /api/admin/products` - Get all products (admin)
- `GET /api/admin/orders` - Get all orders (admin)
- `GET /api/admin/orders/:id` - Get order details (admin)
- `PATCH /api/admin/orders/:id/status` - Update order status (admin)
- `GET /api/admin/stats` - Get dashboard statistics (admin)
- `GET /admin` - Access the admin dashboard

## Database Schema

### Table: `product`
| Field        | Type              | Description                |
|--------------|-------------------|----------------------------|
| id           | int (PK, AI)      | Product ID                 |
| name         | varchar(255)      | Product name               |
| description  | text              | Product description        |
| price        | decimal(10,2)     | Product price              |
| variant      | varchar(255)      | Product variant            |
| inventory    | int               | Inventory count            |
| image_url    | varchar(500)      | Product image URL          |
| category     | varchar(100)      | Product category           |
| is_new       | tinyint(1)        | Is new product             |
| is_hot       | tinyint(1)        | Is hot product             |
| rating       | decimal(2,1)      | Product rating             |
| reviews      | int               | Number of reviews          |
| colors       | longtext (JSON)   | Available colors           |

### Table: `orders`
| Field      | Type           | Description         |
|------------|----------------|---------------------|
| id         | varchar(100)   | Order ID (UUID)     |
| product_id | int            | Product ID          |
| full_name  | varchar(255)   | Customer name       |
| email      | varchar(255)   | Customer email      |
| phone      | varchar(20)    | Customer phone      |
| address    | text           | Address             |
| city       | varchar(100)   | City                |
| state      | varchar(100)   | State               |
| zip        | varchar(20)    | Zip code            |
| variant    | varchar(50)    | Product variant     |
| quantity   | int            | Quantity            |
| total      | decimal(10,2)  | Total amount        |
| status     | varchar(50)    | Order status        |
| created_at | timestamp      | Order creation time |

### Table: `payment`
| Field               | Type           | Description                |
|---------------------|----------------|----------------------------|
| id                  | int (PK, AI)   | Payment ID                 |
| order_id            | varchar(255)   | Order ID                   |
| razorpay_payment_id | varchar(255)   | Razorpay payment ID        |
| razorpay_order_id   | varchar(255)   | Razorpay order ID          |
| razorpay_signature  | text           | Razorpay signature         |
| status              | varchar(50)    | Payment status             |
| created_at          | timestamp      | Payment creation time      |

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
   - Import the [`ecommerce (1).sql`](ecommerce%20(1).sql) file into your MySQL server to create the required tables and sample data.

5. Start the server
   ```sh
   npm start
   ```

6. Access the admin dashboard
   - URL: `https://ecommers-backend-hogy.onrender.com/admin`
   - Default credentials: username: `admin`, password: `admin123`

## Development

### Adding New Features

1. Create new route files in the `routes/` directory
2. Implement controller logic in the `controllers/` directory
3. Update the `server.js` file to include new routes

### Customizing Email Templates

Modify the email HTML templates in the [`orderController.js`](controllers/orderController.js) file to customize email notifications.

## Credits

- Developed by Satyajit Sahoo
- UI Design: Satyajit Sahoo
- Icons: Bootstrap Icons
- Charts: Chart.js

## License

ISC
