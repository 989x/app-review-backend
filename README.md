## 2-product-review-example-backend

---
<!-- o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o -->

### MongoDB - modals 

|  products                                 |   users                  |
|---                                        |---                       |
|  username : String                        |   username : String      |
|  realName : String                        |   email : String         |
|  typeOrCategory : String                  |   password : String      |
|  brandOrCompany : String                  |   profilepic : String    |
|  goodOrNot : String                       |                          |
|  massage : String                         |
|  photo : String                           |
|  productComment : ref: "ProductComment"   |                          

| ProductComment                |
|---                            |
| comment_id : String           |
| product_id : ref: "Product"   |
| user_id : ref: "User"         |

---
<!-- o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o -->

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

| ProductComment                                       |
|---                                                   |
| GET 1 : get ( /:product_id/comments )                |
| POST  : post ( /:product_id/comments/create )        |
| PUT  : put ( /comments/:comment_id/update )          |
| DELETE  : delete ( /comments/:comment_id/delete )    |

---
<!-- o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o o-o -->
