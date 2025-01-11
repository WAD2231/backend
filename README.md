# 1. USER MANAGEMENT

## 1.1. Create a new user

POST /api/users
permission: 0 - user, 1 - admin

```json
{
  "username": "anhtuyet",
  "password": "123456",
  "fullname": "Nguyễn Ánh Tuyết"
}
```

## 1.2. Get all users

GET /api/users?page=&size=

```json
{
  "paging": {
    "total_page": 2,
    "total_item": 3,
    "page_size": 2,
    "current_page": 1
  },
  "users": [
    {
      "user_id": 2,
      "username": "quanghai",
      "permission": 0,
      "provider_id": null,
      "created_at": "2025-01-08T23:42:01.492779",
      "login_provider": "Local",
      "fullname": "Nguyễn Quang Hải",
      "avatar": "https://th.bing.com/th/id/OIP.P8F796BGNue4Lu2SImT1bgAAAA$1rs=1&pid=ImgDetMain",
      "phone": null,
      "address": null
    },
    {
      "user_id": 3,
      "username": "mailinh",
      "permission": 0,
      "provider_id": null,
      "created_at": "2025-01-08T23:43:29.443218",
      "login_provider": "Local",
      "fullname": "Trần Linh Mai",
      "avatar": "https://th.bing.com/th/id/OIP.P8F796BGNue4Lu2SImT1bgAAAA$1rs=1&pid=ImgDetMain",
      "phone": null,
      "address": null
    }
  ]
}
```

## 1.3. Get user information

GET /api/users/:id

```json
{
  "id": 4,
  "username": "anhtuyet",
  "permission": 0,
  "provider_id": null,
  "created_at": "2025-01-08T16:44:02.205Z",
  "login_provider": "Local",
  "fullname": "Nguyễn Ánh Tuyết",
  "avatar": "https://th.bing.com/th/id/OIP.P8F796BGNue4Lu2SImT1bgAAAA$1rs=1&pid=ImgDetMain",
  "phone": null,
  "address": null
}
```

## 1.4. Reset password

PUT /api/users/reset-password

```json
{
  "password": "123456789"
}
```

## 1.5. Delete user

DELETE /api/users/:id

## 1.6. Get my profile

GET /api/user/me

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

## 7.3. Get top best-selling products
GET /api/orders/statistics/best-sellers?limit=5

```json
[
  {
    "id": 5,
    "name": "Date",
    "quantity": 4
  },
  {
    "id": 3,
    "name": "Banana",
    "quantity": 3
  },
  {
    "id": 4,
    "name": "Cherry",
    "quantity": 2
  },
  {
    "id": 2,
    "name": "Apple",
    "quantity": 2
  },
  {
    "id": 1,
    "name": "Product 1",
    "quantity": 1
  }
]
```

## 7.4. Get top customers by total spending
GET /api/orders/statistics/top-customer?limit=5

```json
[
  {
    "id": 8,
    "name": "Nguyễn Khánh Du",
    "total": 200000
  },
  {
    "id": 7,
    "name": "Bùi Công Anh",
    "total": 100000
  }
]
```

## 7.5. Statistic product quantity by category
GET /api/products/statistics/category

```json
[
  {
    "id": 1,
    "name": "PC Game Headsets",
    "quantity": 528
  },
  {
    "id": 2,
    "name": "Computers & Tablets",
    "quantity": 372
  },
  {
    "id": 6,
    "name": "Computer Keyboards, Mice & Accessories",
    "quantity": 249
  },
  {
    "id": 3,
    "name": "PlayStation 5 Headsets",
    "quantity": 211
  }
]
```

## 7.6. Statistic product quantity by manufacturer
GET /api/products/statistics/manufacturer

```json
[
  {
    "id": 1,
    "name": "Logitech",
    "quantity": 391
  },
  {
    "id": 2,
    "name": "Samsung",
    "quantity": 384
  },
  {
    "id": 3,
    "name": "Sony",
    "quantity": 380
  }
]
```
