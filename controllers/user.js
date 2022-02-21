//CONNECTIONS
const User = require("../models/user")
const bcrypt = require ("bcrypt")
const auth = require("../auth")
const user = require("../models/user")
// const course = require("../models/course")


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
         
        userName: body.userName,
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
        user.enrollments.push({courseId: body.courseId})
        return user.save().then((user, error) => {
            if (error){
                return false;
            }else{
                return true;
            }
        })
    })

    //the below process is almost exactly the same as above
    let courseSaveStatus = await course.findById(body.courseId).then(course => {
        course.enrollees.push({userId: userId})

        return course.save().then((course, error) => {
            if(error){
                return false;
            }else{
                return true;
            }
        })
    })

    if(userSaveStatus && courseSaveStatus){
        return true;
    }else {
        return false;
    }
}
