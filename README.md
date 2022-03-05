## 2-product-review-example-backend

---

### MongoDB - modals 

|  products                 |   users                  |
|---                        |---                       |
|  username : String        |   username : String      |
|  realName : String        |   email : String         |
|  typeOrCategory : String  |   password : String      |
|  brandOrCompany : String  |   profilepic : String    |
|  goodOrNot : String       |                          |
|  massage : String         |
|  photo : String           |

---

### ExpressJS - routes 

| auth                             | users                      |
|---                               |---                         |
| register : post ( /register )    | UPDATE : put ( /:id )      |
| login : post ( /login )          | DELETE : delete ( /:id )   |
|                                  | GET USER : get ( /:id )    |

| products                      |
|---                            |
| CREATE  : post ( / )          |
| UPDATE  : put ( /:id )        |
| DELETE  : delete ( /:id )     |
| GET 1 : get ( /:id )          |
| GET ALL : get ( / )           |

---