const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required: [true, "Email is required"]
    },
    password: {
        type:String,
        required: [true, "Password required"]
    },
    isAdmin: {
        type:Boolean,
        default: false
    },
 products:[{
 	productId: {
 		type: String,
 		required: true
 	},
 	quantity: {
 		type: Number,
 		required: true
 	},
 	totalAmount: {
 		type: Number,
 		required: true
 	},
 	purchasedOn: {
 		type: Date,
 		default: new Date()
	}
}]

})

module.exports = mongoose.model("User", userSchema)


//Token

//Admin
//admin123
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTRkMGI2ZTRiYzYwZWM0NGNjNTQ3MCIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NDU1MzQ4NTh9.2uvd4LNLqsrYZcfZasjWf9-rddpQUOrMnY5PlDJFCU0


//User Shing
//shing101
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTRkMGQyZTRiYzYwZWM0NGNjNTQ3MiIsImVtYWlsIjoic2hpbmdAbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjQ1NTMxMzU2fQ.-SLxL9rsov1E9JypuX-Tbs7YZ0bJAKrPCQBOct0Mi5k


//User Mae
//mae101
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWI3MjUzMjI2ZjVjN2I5M2Y4MDE4NCIsImVtYWlsIjoibWFlQG1haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0NjEwMTM4M30.5kyUB5ra60upw15kgzfee98QoJFVwAbXi3SIL39_OtM