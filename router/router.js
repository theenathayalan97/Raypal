let express = require("express"); 
let route = express()

const user = require ("../controller/userController.js"); 
const role = require ("../controller/roleController.js"); 
const organization = require ("../controller/organizationController.js");
const product = require('../controller/productCompanyController.js') 
const order = require('../controller/orderController.js') 

//middleware
const check = require('../middleware/auth.js')

// role router
route.post('/roleCreate',role.createRole)
route.get('/getRole/:id',role.getRole)
route.get('/getAllRole',role.getAllRole)
route.put('/updateRole/:id',role.updateRole)
route.delete('/deleteRole/:id',role.deleteRole)
 
// user router
route.post("/superAdminSignIn",user.superAdminSignIn); 
route.post("/superAdminLogIn",user.superAdminLogIn); 
route.post("/signIn",user.signIn); 
route.post("/logIn",user.logIn); 
route.get("/getUser/:id",user.getUser); 
route.get("/getAllUser",user.getAllUser);
route.put("/updateUser",user.updateUser); 
route.put("/deleteUser",user.deleteUser); 

//organization
route.post('/organizationCreate',check.tokenValidation,check.accessValidation(['superAdmin']),organization.createOrganization)
route.get('/getOrganization/:id',check.tokenValidation,check.accessValidation(['superAdmin','admin']),organization.getOrganization)
route.get('/getAllOrganization',check.tokenValidation,check.accessValidation(['superAdmin','admin']),organization.getAllOrganization)
route.put('/updateOrganization/:id',check.tokenValidation,check.accessValidation(['superAdmin','admin']),organization.updateOrganization)
route.delete('/deleteOrganization/:id',check.tokenValidation,check.accessValidation(['superAdmin','admin']),organization.deleteOrganization)

//product
route.post('/productCreate',check.tokenValidation,check.accessValidation(['superAdmin','admin']),product.productCreate)
route.get('/getProduct/:id',check.tokenValidation,check.accessValidation(['superAdmin','admin',"customer"]),product.getProduct)
route.get('/getAllProduct',check.tokenValidation,check.accessValidation(['superAdmin','admin',"customer"]),product.getAllProduct)
route.put('/updateProduct/:id',check.tokenValidation,check.accessValidation(['superAdmin','admin']),product.updateProduct)
route.delete('/deleteProduct/:id',check.tokenValidation,check.accessValidation(['superAdmin','admin']),product.deleteProduct)

//order
route.post('/orderProduct/:id',check.tokenValidation,check.accessValidation(['superAdmin','admin',"customer"]),order.orderCreate)
route.get('/getOrder/:id',check.tokenValidation,check.accessValidation(['superAdmin','admin',"customer"]),order.getOrder)
route.get('/getAllOrder/:id',check.tokenValidation,check.accessValidation(['superAdmin','admin']),order.getAllOrder)
route.put('/orderSuccess/:id',check.tokenValidation,check.accessValidation(['superAdmin','admin',]),order.orderSuccess)
route.put('/orderCancel/:id',check.tokenValidation,check.accessValidation(['superAdmin','admin',]),order.orderCancel)

module.exports = route; 