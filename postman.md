## Users

### POST : Register
localhost:5000/api/auth/register
{
    "username": "jame",
    "email": "jame@gmail.com",
    "password": "123456"
}

### POST : Login
localhost:5000/api/auth/login
{
    "username": "johnupdate2",
    "email": "john@gmail.com",
    "password": "123456"
}

### PUT : Update User
localhost:5000/api/users/622306110b1003c80d7e9323
{
    "userId": "622306110b1003c80d7e9323",
    "username": "johnupdate2",
    "password": "123456"
}

### DEL : Delete User
localhost:5000/api/users/622331c8da1bbdc16f190ab4
{
    "userId": "622331c8da1bbdc16f190ab4",
    "username": "jame",
    "password": "123456"
}

### GET : Get User
localhost:5000/api/users/622306110b1003c80d7e9323
{
    "username": "johnupdate2",
    "email": "john@gmail.com",
    "password": "123456"
}



## Products

### POST : Post Product
localhost:5000/api/products/
{
    "username": "user100",
    "realName": "name1",
    "typeOrCategory": "type1",
    "brandOrCompany": "brand1",
    "goodOrNot": "GOOD PRODUCT",
    "massage": "massage1"
}

### PUT : Update Product
localhost:5000/api/products/62235e60a0801b01c69d2b26
{
    "username": "user1",
    "realName": "name update 2",

    "massage": "massage update and update"
}

### DEL : Delete Product
localhost:5000/api/products/62236e17dccdd17675e023a1
{
    "username": "user100"
}

### GET : Get Product
localhost:5000/api/products/62235e60a0801b01c69d2b26
{

}

### GET : Get All Product by name (Query)
localhost:5000/api/products?user=user100
{
    
}