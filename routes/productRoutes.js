//setup the dependencies
const express = require("express");
const router = express.Router();

//import the controller file
const productController = require("../controllers/productControllers");
const auth = require("../auth");

//route to get all active Products
router.get("/", (req, res)=>{
    productController.getProducts().then(resultFromController => res.send(resultFromController))
})

//route to get specific product
router.get("/:productId", (req, res) => {
    productController.getSpecific(req.params.productId).then(resultFromController => res.send(resultFromController))

})

//route to create a new product
router.post("/", auth.verify, (req,res) => {
    if(auth.decode(req.headers.authorization).isAdmin){
            productController.addProduct(req.body).then(resultFromController => res.send(resultFromController))
    }else{
        res.send(false)
    }
})

//route to update a single product
router.put("/:productId", auth.verify, (req, res) => {
	if(auth.decode(req.headers.authorization).isAdmin){
		productController.updateProduct(req.params.productId, req.body).then(resultFromController => res.send(resultFromController))
	}else{
		res.send(false)
	}
})

router.delete("/:productId/archive", auth.verify, (req, res) => {
	if(auth.decode(req.headers.authorization).isAdmin){
		productController.archiveProduct(req.params.productId).then(resultFromController => res.send(resultFromController))
	}else{
		res.send(false)
	}
})

//export the router
module.exports = router;
