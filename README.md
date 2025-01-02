# 1. USER MANAGEMENT

## 1.1. Create a new user

POST /api/users

```json
{
  "username": "quanghai@12",
  "password": "123456789",
  "email": "hainq@gmail.com",
  "permission": 0
}
```

## 1.2. Get all users

GET /api/users

```json
{
  "total": 1,
  "users": [
    {
      "id": 7,
      "username": "anan1997",
      "email": "anto97@gmail.com",
      "permission": 0,
      "provider_id": null,
      "created_at": "2024-12-20T06:14:43.796Z",
      "login_provider": "Local",
      "profile": {
        "id": 1,
        "name": "Tô An An",
        "phone": "0334191260",
        "address": "Quận Tân Bình, TP Hồ Chí Minh"
      }
    }
  ]
}
```

## 1.3. Get user information by id (includes account and profile)

GET /api/users/:id

```json
{
  "id": 7,
  "username": "anan1997",
  "email": "anto97@gmail.com",
  "permission": 0,
  "provider_id": null,
  "created_at": "2024-12-20T06:14:43.796Z",
  "login_provider": "Local",
  "profile": {
    "id": 1,
    "name": "Tô An An",
    "phone": "0334191260",
    "address": "Quận Tân Bình, TP Hồ Chí Minh"
  }
}
```

## 1.4. Update user information (update email or password only)

PUT /api/users/:id

```json
{
  "email": "toanan1997@gmail.com",
  "password": "123456789"
}
```

## 1.5. Delete user

DELETE /api/users/:id

# 2. USER AUTHENTICATION

## 2.1. Local login

POST /api/auth/login/local

```json
{
  "username": "quanghai@12",
  "password": "123456789"
}
```

## 2.2. Facebook login

GET /api/auth/login/facebook

## 2.3. Google login

GET /api/auth/login/google

## 2.4. Logout

GET /api/auth/logout

# 3. USER PROFILE

## 3.1. Get profile by id

GET /api/profiles/:id

```json
{
  "id": 1,
  "name": "Tô An An",
  "phone": "0334191260",
  "address": "Quận Tân Bình, TP Hồ Chí Minh",
  "user": {
    "id": 7,
    "username": "anan1997"
  }
}
```

## 3.2. Create new profile

POST /api/profiles

```json
{
  "name": "Nguyễn Khánh Du",
  "phone": "01668823429",
  "address": "TP Biên Hòa, Tỉnh Đồng Nai"
}
```

## 3.3. Update profile

PUT /api/profiles/:id

```json
{
  "name": "Tô An An",
  "address": "Quận Tân Phú, TP Hồ Chí Minh",
  "phone": "0935127671"
}
```

## 3.4. Delete profile

DELETE /api/profiles/:id

# 4. PRODUCT REVIEW

## 4.1. Post a review

POST /api/reviews

```json
{
  "content": "This product is fantastic! It has exceeded all my expectations. The performance is top-notch and it is very user-friendly. I highly recommend it to anyone looking for a high-quality product.",
  "rating": 5,
  "product_id": 1
}
```

## 4.2. Get all reviews of a product

GET /api/reviews?id=1&page=1&size=5

```json
{
  "paging": {
    "total_item": 7,
    "total_page": 3,
    "current_page": 1,
    "page_size": 3
  },
  "average_rating": 3.7,
  "reviews": [
    {
      "id": 5,
      "content": "I'm very disappointed with this product. It stopped working after a week of use. The quality is poor and not worth the price. I would not recommend this to anyone.",
      "rating": 1,
      "posted_at": "2024-12-20T09:28:52.822Z",
      "user": {
        "id": 8,
        "name": "Nguyễn Khánh Du"
      }
    },
    {
      "id": 2,
      "content": "The product is decent for its price. It performs well for basic tasks, but don't expect high-end features. The build quality is average, but it gets the job done. Overall, a good purchase if you're on a budget.",
      "rating": 3,
      "posted_at": "2024-12-20T09:28:09.021Z",
      "user": {
        "id": 8,
        "name": "Nguyễn Khánh Du"
      }
    },
    {
      "id": 6,
      "content": "Great product! It arrived on time and in perfect condition. Easy to set up and use. I am very satisfied with my purchase and would buy again.",
      "rating": 4,
      "posted_at": "2024-12-20T09:28:57.391Z",
      "user": {
        "id": 7,
        "name": "Bùi Công Anh"
      }
    }
  ]
}
```

# 5. ORDER

## 5.1. Create order

POST /api/orders

```json
{
  "total": 100000,
  "details": [
    {
      "product_id": 1,
      "quantity": 1,
      "subtotal": 20000
    },
    {
      "product_id": 2,
      "quantity": 2,
      "subtotal": 80000
    }
  ]
}
```

# 6. CART
## 6.1. Get cart by user id
GET /api/carts?page=1&size=2
``` json
{
  "user_id": 1,
  "paging": {
    "total_item": 5,
    "total_page": 3,
    "current_page": 1,
    "page_size": 2
  },
  "items": [
    {
      "product": {
        "id": 1,
        "name": "Product 1",
        "price": 100000,
        "discount": 0.1,
        "quantity": 20,
        "images": [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg"
        ]
      },
      "quantity": 2
    },
    {
      "product": {
        "id": 2,
        "name": "Apple",
        "price": 1,
        "discount": 0.1,
        "quantity": 100,
        "images": [
          "https://example.com/image3.jpg",
          "https://example.com/image4.jpg"
        ]
      },
      "quantity": 2
    }
  ]
}
```

## 6.2. Add product to cart
POST /api/carts
```json
{
    "product_id": 1,
}
```

## 6.3. Update product quantity in cart
PUT /api/carts/:id
```json
{
    "quantity": 3
}
```

## 6.4. Delete product from cart
DELETE /api/carts/:id

# 7. VIEW STATISTICS

## 7.1. Get new user count by month
GET /api/users/statistics/new-users

```json
[
  {
    "month": 12,
    "year": 2024,
    "quantity": 6
  }
]
```

## 7.2. Get total revenue by month
GET /api/orders/statistics/revenue

```json
[
  {
    "month": 12,
    "year": 2024,
    "sales": 200000
  },
  {
    "month": 1,
    "year": 2025,
    "sales": 100000
  }
]
```
