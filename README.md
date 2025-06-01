# Ecommerce Backend

This is a Node.js backend for an e-commerce application, supporting order management, payment processing (Razorpay), and email notifications.

## Features
- RESTful API for products, orders, and payments
- Razorpay integration for payment processing
- MySQL database support
- Nodemailer for transactional emails
- Duplicate payment prevention
- CORS enabled for frontend integration

## Project Structure
```
controllers/
  orderController.js
  productController.js
models/
  db.js
routes/
  orderRoutes.js
  paymentRoutes.js
  productRoutes.js
utils/
  emailService.js
server.js
.env
package.json
```

## Setup
1. **Clone the repository**
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env.example` to `.env` and fill in your database, email, and Razorpay credentials.
4. **Set up the MySQL database**
   - Create the required tables (`products`, `orders`, `payment`).
   - Example for `payment` table:
     ```sql
     CREATE TABLE payment (
       id INT AUTO_INCREMENT PRIMARY KEY,
       order_id VARCHAR(255) NOT NULL,
       razorpay_payment_id VARCHAR(255) NOT NULL UNIQUE,
       razorpay_order_id VARCHAR(255),
       razorpay_signature VARCHAR(255),
       status VARCHAR(50),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```
5. **Start the server**
   ```sh
   npm start
   ```

## API Endpoints
- `POST /api/orders` — Create a new order
- `POST /api/payment/save-payment` — Save payment info (idempotent)
- `GET /api/payment/order/:orderId` — Get order details for Thank You page
- `GET /api/products` — List products
- `GET /api/products/:id` — Get product by ID

## Notes
- All endpoints are prefixed with `/api`.
- Payments are not saved if the `razorpay_payment_id` already exists.
- See `.gitignore` for files/folders excluded from version control.

## License
MIT
