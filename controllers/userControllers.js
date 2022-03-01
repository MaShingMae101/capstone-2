//CONNECTIONS
const User = require("../models/userModel")
const bcrypt = require ("bcrypt")
const auth = require("../auth")
const user = require("../models/userModel")
const product = require("../models/productModel")


module.exports.checkEmail = (body) => {
    return User.find({email: body.email}).then(result => {
        if(result.length > 0){
            return true;
        } else {
            return false;
        }
    })
}

module.exports.register = (body) => {

    return User.find({isActive:true}).then(result => {
        return result;
    })
}

module.exports.register = (body) => {

    let newUser = new User ({

        email: body.email,
        password: bcrypt.hashSync(body.password,10)

    })

    return newUser.save().then((user, error) => {
        if(error){
            return false;
        }else{
            return true;
        }
    })
}


module.exports.allUsers = () => {
    return User.find({}).then(result => {
        return result;
    })
}



module.exports.login = (body) => {
    return User.findOne({email: body.email}).then(result => {
        if (result === null){ //user does not exist in db
            return false;
        } else {
            const isPasswordCorrect = bcrypt.compareSync(body.password, result.password)

            if(isPasswordCorrect){
                return {accessToken: auth.createAccessToken(result.toObject())}

            } else {
                return false
            }
            }
    })
}

//GetProfile Module
module.exports.getProfile = (userId) =>{
    return User.findById(userId).then(result => {
        result.password = undefined
        return result
    })
}





//CHECKOUT Module
module.exports.checkout = async (userId, body) => {
    let userSaveStatus = await User.findById(userId).then(user => {
        user.products.push({productId: body.productId, quantity: body.quantity, totalAmount: body.totalAmount})
        return user.save().then((user) => {
            if (user){
                return true;
            }else{
                return false;
            }
        })
    })

    if(userSaveStatus){
        return true;
    }else {
        return false;
    }
}

//Get my Orders
module.exports.getSpecificUser = (userId) => {
    return User.findById(userId).then(result => {
        return result;
    })
}