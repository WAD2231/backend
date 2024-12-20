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