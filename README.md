# Crypto Market Cap BE

## URL
https://crypto-backend-rjo.herokuapp.com/

### **-----TABLES-----**

#### users_table:

```JSON
{
    "users_id": "integer",
    "users_email": "string",
    "users_password": "string",
}
```

### **-----LOGIN and REGISTER-----**

### [POST] /api/users/register -- creates a new user

WHAT TO SEND

```JSON
{
    "user_email": "string",
    "user_password": "string",
}
```

WHAT YOU GET BACK

```JSON
{
    "message": "Welcome user_email",
    "token": "token",
}
```

### [POST] /api/users/login -- logs in an existing user

WHAT TO SEND

```JSON
{
    "user_email": "string",
    "user_password": "string",
}
```

WHAT YOU GET BACK

```JSON
{
    "message": "Welcome back user_email",
    "token": "token",
}
```

### **-----GET-----**

### [GET] /api/users -- retrieves all users

WHAT TO SEND

```JSON
None
```

WHAT YOU GET BACK

```JSON
[
  {
    "user_id": "integer",
    "user_email": "string",
    "user_password": "string",
    "created_at": "string",
    "updated_at": "string"
  },
    "etc"
]
```

### **-----DELETE-----**

### [DELETE] /api/users/delete/:user_id -- deletes a user

WHAT TO SEND

```JSON
None
```

WHAT YOU GET BACK

```JSON
{
    "message": "User profile has been deleted"
}
```
