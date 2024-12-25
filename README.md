# 1. USER MANAGEMENT
## 1.1. Create a new user
POST /api/users
```json
{
    "username": "quanghai@12",
    "password": "123456789",
    "email": "hainq@gmail.com",
    "permission": 0,
    "wallet_id": 3
}
```
## 1.2. Get all users
GET /api/users

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