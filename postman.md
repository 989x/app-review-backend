
### auth > register > hashedpass

POST > localhost:5000/api/auth/register
{
    "username": "john",
    "email": "john@gmail.com",
    "password": "123456"
}

### auth > login > findOne username & compare pass

POST > localhost:5000/api/auth/login
{
    "username": "john",
    "email": "john@gmail.com",
    "password": "123456"
}

### user > delete 

DELETE > localhost:5000/api/users/622331c8da1bbdc16f190ab4
{
    "userId": "622331c8da1bbdc16f190ab4",
    "username": "jame",
    "password": "123456"
}