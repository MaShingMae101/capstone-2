//CONNECTIONS
const User = require("../models/userModel")
const bcrypt = require ("bcrypt")
const auth = require("../auth")
const user = require("../models/userModel")


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


module.exports.getProfile = (userId) =>{
    return User.findById(userId).then(result => {
        result.password = undefined
        return result
    })
}

module.exports.enroll = async (userId, body) => {
    let userSaveStatus = await User.findById(userId).then(user => {
        user.enrollments.push({productId: body.productId})
        return user.save().then((user, error) => {
            if (error){
                return false;
            }else{
                return true;
            }
        })
    })

    let productSaveStatus = await product.findById(body.productId).then(product => {
        product.enrollees.push({userId: userId})

        return product.save().then((product, error) => {
            if(error){
                return false;
            }else{
                return true;
            }
        })
    })

    if(userSaveStatus && productSaveStatus){
        return true;
    }else {
        return false;
    }
}
