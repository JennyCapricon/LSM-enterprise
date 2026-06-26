# Order Notification Backend

A simple backend service that receives order notifications and logs them to the console so you can see what people order when they make purchases on your website.

## Features

- Receives order data via POST requests
- Logs each order to the console (your notification)
- Stores orders in memory (for demonstration)
- Provides endpoint to view all orders
- Simple and lightweight

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```
   Or for development with auto-restart:
   ```
   npm run dev
   ```

The server will run on port 3000 by default (or the port specified in the PORT environment variable).

## API Endpoints

### POST `/order`
Receive a new order notification.

**Request Body:**
```json
{
  "customerName": "John Doe",
  "items": [
    {"name": "Product A", "quantity": 2, "price": 19.99},
    {"name": "Product B", "quantity": 1, "price": 29.99}
  ],
  "total": 69.97,
  "paymentMethod": "credit_card" // or whatever you're currently using
}
```

**Response:**
```json
{
  "message": "Order received and notified",
  "orderId": 1685678901234
}
```

When an order is received, it will be logged to your console like this:
```
New Order Received: {
  "id": 1685678901234,
  "timestamp": "2023-06-02T10:30:00.000Z",
  "customerName": "John Doe",
  "items": [
    {"name": "Product A", "quantity": 2, "price": 19.99},
    {"name": "Product B", "quantity": 1, "price": 29.99}
  ],
  "total": 69.97,
  "paymentMethod": "credit_card"
}
```

### GET `/orders`
View all received orders (useful for debugging).

### GET `/`
Health check endpoint.

## Integration with Your Website

To integrate this with your existing website:

1. Deploy this backend somewhere accessible (localhost for testing, or a cloud service like Vercel, Render, etc. for production)
2. In your payment processing code, after a successful payment, send a POST request to `/order` with the order details
3. Keep your existing payment method handling exactly as it is - this only adds notification capability

## Example Integration (JavaScript)

```javascript
// After successful payment in your existing code
fetch('http://your-backend-url.com/order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customerName: customerName,
    items: cartItems,
    total: orderTotal,
    paymentMethod: usedPaymentMethod // leave this as-is
  })
})
.then(response => response.json())
.then(data => console.log('Order notified:', data))
.catch(error => console.error('Error notifying order:', error));
```

## Customization

- To change the port, set the PORT environment variable
- To persist orders, replace the in-memory array with a database (MongoDB, PostgreSQL, etc.)
- To change where notifications appear, modify the `console.log` statement in the `/order` route

## Notes

- This backend intentionally leaves payment method handling unchanged as requested
- Order details are logged to console for your visibility
- For production use, consider:
  - Adding authentication to the endpoints
  - Using a proper database instead of memory storage
  - Adding rate limiting
  - Using HTTPS