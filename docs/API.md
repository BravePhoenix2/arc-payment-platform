# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Payments Endpoints

### Get User Payments

```
GET /payments/:address
```

**Query Parameters:**
- `limit` (default: 50) - Number of payments to return
- `offset` (default: 0) - Pagination offset
- `type` (default: all) - Filter by type: "all", "sent", "received"

**Response:**
```json
{
  "payments": [
    {
      "paymentId": 1,
      "payer": "0x...",
      "payee": "0x...",
      "amount": "1000000000000000000",
      "timestamp": "2024-01-01T12:00:00Z",
      "description": "Payment for services",
      "completed": false,
      "refunded": false,
      "txHash": "0x...",
      "fee": "2500000000000000"
    }
  ],
  "total": 42,
  "limit": 50,
  "offset": 0
}
```

### Get Payment Details

```
GET /payments/details/:paymentId
```

**Response:**
```json
{
  "paymentId": 1,
  "payer": "0x...",
  "payee": "0x...",
  "amount": "1000000000000000000",
  "timestamp": "2024-01-01T12:00:00Z",
  "description": "Payment for services",
  "completed": false,
  "refunded": false,
  "txHash": "0x...",
  "blockNumber": 12345678,
  "fee": "2500000000000000",
  "createdAt": "2024-01-01T12:00:00Z"
}
```

### Get Pending Payments

```
GET /payments/status/pending
```

**Response:**
```json
[
  {
    "paymentId": 1,
    "payer": "0x...",
    "payee": "0x...",
    "amount": "1000000000000000000",
    "timestamp": "2024-01-01T12:00:00Z",
    "description": "Payment for services",
    "completed": false,
    "refunded": false
  }
]
```

## Users Endpoints

### Get User Profile

```
GET /users/:address
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "address": "0x...",
  "balance": "5000000000000000000",
  "totalSent": "10000000000000000000",
  "totalReceived": "25000000000000000000",
  "paymentCount": 5,
  "createdAt": "2024-01-01T12:00:00Z",
  "lastActive": "2024-01-02T15:30:00Z"
}
```

### List All Users (Admin)

```
GET /users
```

**Query Parameters:**
- `limit` (default: 100) - Number of users to return
- `offset` (default: 0) - Pagination offset

**Response:**
```json
{
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "address": "0x...",
      "balance": "5000000000000000000",
      "totalSent": "10000000000000000000",
      "totalReceived": "25000000000000000000",
      "paymentCount": 5,
      "createdAt": "2024-01-01T12:00:00Z",
      "lastActive": "2024-01-02T15:30:00Z"
    }
  ],
  "total": 250,
  "limit": 100,
  "offset": 0
}
```

### Update User Profile

```
PUT /users/:address
```

**Request Body:**
```json
{
  "balance": "10000000000000000000"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "address": "0x...",
  "balance": "10000000000000000000",
  "totalSent": "10000000000000000000",
  "totalReceived": "25000000000000000000",
  "paymentCount": 5,
  "createdAt": "2024-01-01T12:00:00Z",
  "lastActive": "2024-01-02T15:30:00Z"
}
```

## Statistics Endpoints

### Get Platform Statistics

```
GET /stats
```

**Response:**
```json
{
  "totalUsers": 250,
  "totalPayments": 1234,
  "completedPayments": 980,
  "totalAmount": "1234567890000000000000",
  "recentPayments": [
    {
      "paymentId": 1234,
      "payer": "0x...",
      "payee": "0x...",
      "amount": "1000000000000000000",
      "timestamp": "2024-01-02T15:30:00Z"
    }
  ],
  "topUsers": [
    {
      "address": "0x...",
      "totalSent": "50000000000000000000",
      "paymentCount": 25
    }
  ],
  "timestamp": "2024-01-02T15:30:00Z"
}
```

### Get Daily Statistics

```
GET /stats/daily/:days
```

**Parameters:**
- `days` - Number of days to retrieve statistics for (default: 30)

**Response:**
```json
[
  {
    "_id": "2024-01-01",
    "paymentCount": 45,
    "totalAmount": "50000000000000000000"
  },
  {
    "_id": "2024-01-02",
    "paymentCount": 52,
    "totalAmount": "55000000000000000000"
  }
]
```

## Health Check

```
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-02T15:30:00Z"
}
```

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### Common Status Codes

- `200` - Success
- `400` - Bad request (invalid parameters)
- `404` - Not found (resource doesn't exist)
- `500` - Server error

## Rate Limiting

The API implements rate limiting:
- 100 requests per minute per IP
- 1000 requests per hour per IP

## Authentication

Currently, the API does not require authentication. In production, implement:
- JWT tokens
- API keys
- OAuth2

See [DEPLOYMENT.md](./DEPLOYMENT.md) for security recommendations.
