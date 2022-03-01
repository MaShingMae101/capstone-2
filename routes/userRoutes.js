const express = require("express")
const router = express.Router()
const userController = require("../controllers/userControllers")
const auth = require("../auth")


//route for checking if an email exists in our database
router.post("/checkEmail", (req, res) =>{
    userController.checkEmail(req.body).then(resultFromController => res.send(resultFromController))
})


//Get all users
router.get("/all",  auth.verify,(req, res)=>{
    userController.allUsers().then(resultFromController => res.send(resultFromController))
})


//route for user registration
router.post("/register", (req, res) => {
    console.log(req.body)
    userController.register(req.body).then(resultFromController => res.send(resultFromController))
})

//route for login
router.post("/login", (req,res) => {
    userController.login(req.body).then(resultFromController => res.send(
        resultFromController
        ))
    })

//route for getting user profile
 router.get("/details", auth.verify, (req, res) => {
     const userId = auth.decode(req.headers.authorization).id
     userController.getProfile(userId).then(resultFromController => res.send(
         resultFromController
    ))
})

//route for checkout
router.post("/checkout", auth.verify, (req, res) => {
    const userId = auth.decode(req.headers.authorization).id
    userController.checkout(userId, req.body).then(resultFromController => res.send(resultFromController))
})

//get specific user
router.get("/:userId/myOrders", (req, res) => {
    userController.getSpecificUser(req.params.userId).then(resultFromController => res.send(resultFromController))

})


module.exports = router;















