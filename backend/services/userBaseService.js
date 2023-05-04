const userModel = require("../models/UserModel");
const { CreateNewUserDto } = require("../services/commonService");
const userRoles = require("../enums/userRoles");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const saltRounds = 12;

async function CreateUserAccount(email, role) {
    const isUserExist = await userModel.exists({ email });
    console.log("isUserExist", isUserExist);
    if (isUserExist) {
        return CreateNewUserDto(null, true, 409, "email already taken.");
    }

    const password = generatePassword(8);

    const hashpwd = await bcrypt.hashSync(password, saltRounds);

    console.log("hashpwd", hashpwd);

    const newUserModel = {
        email,
        hashPassword: hashpwd,
        role,
        createdDate: Date.now(),
        createdBy: "", // todo : fix this
        isDefaultPwdChanged: false,
    };

    const newUser = new userModel(newUserModel);

    const result = await newUser.save();

    const user = {
        email,
        password,
        userId: result.id,
    };
    return CreateNewUserDto(user, false, 201, "user created");
}

async function Signin(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Error("Account does not exist.");
    }

    const isMatched = await bcrypt.compare(password, user.hashPassword);

    console.log("isMatched", isMatched);

    if (!isMatched) {
        throw new Error("Incorrect email or password.");
    }

    const userDto = {
        email,
        id: user.id,
        role: user.role,
    };

    const token = jwt.sign(userDto, process.env.TOKENSECRET, { expiresIn: "30m" });

    const signinResponse = {
        userId: user._id,
        email: user.email,
        role:user.role,
        token,
        tokenExpirationTime: new Date(Date.now() + 30 * 60 * 1000), // token expiration time in UTC
    };

    return signinResponse;
}

function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()_+|}{[]:;?/-=";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

async function GetUserByEmail(email){
    const user = await userModel.findOne({ email });
    return user;
}

async function GenerateResetPasswordOneTimeLink(baseUrl, user){

    const userDto = {
        email:user.email,
        id:user.id
    }
    const token = jwt.sign(userDto, process.env.RESETPASSWORDTOKENSECRET, { expiresIn: '10m' });

    const url = baseUrl + `auth/resetcallback?token=${token}`
    return url;
}

async function ResetPassword(token, email, password) {
    
    const extractUserFromJwt = await jwt.verify(token, process.env.RESETPASSWORDTOKENSECRET);

    if(extractUserFromJwt.email !== email){
        
        throw new Error("user given email and jwt token email is does not match")
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        throw new Error("Account does not exist.");
    }


    const hashpwd = await bcrypt.hashSync(password, saltRounds);

    user.hashPassword = hashpwd

    const updateUser = await userModel.findByIdAndUpdate(user.id, user, {
        new: true, // return the updated document
    });


    console.log("updateUser",updateUser)
    return updateUser;
   
   
}
module.exports = {
    CreateUserAccount,
    Signin,
    GetUserByEmail,
    GenerateResetPasswordOneTimeLink,
    ResetPassword
};
