const userModel = require("../models/UserModel");
const { createNewUserDto } = require("../services/commonService");
const userRoles = require("../enums/userRoles");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const saltRounds = 12;

async function CreateUserAccount(email) {
    const isUserExist = await userModel.exists({ email });
    console.log("isUserExist", isUserExist);
    if (isUserExist) {
        return createNewUserDto(null, true, 409, "email already taken.");
    }

    const password = generatePassword(8);
    console.log("password", password);

    const hashpwd = await bcrypt.hashSync(password, saltRounds);

    console.log("hashpwd", hashpwd);

    const newUserModel = {
        email,
        hashPassword: hashpwd,
        role: userRoles.BACKOFFICEUSER,
        createdDate: Date.now(),
        createdBy: "", // todo : fix this
    };

    const newUser = new userModel(newUserModel);

    const result = await newUser.save()
    
    const user = {
        email,
        password,
        userId : result.id
    }
    return createNewUserDto(user, false, 201, "user created");

    /*  bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            return createNewUserDto(
                null,
                true,
                400,
                "unable to create account"
            );
        }

        const newUserModel = {
            email,
            hashPassword: hash,
            Role: userRoles.BACKOFFICEUSER,
            CreatedDate: Date.now(),
            CreatedBy: "", // todo : fix this
        };

        const newUser = new userModel(newUserModel);

        newUser.save().then((result) => {
            console.log("user result", result);
            return createNewUserDto(result, false, 201, "user created");
        });
    }); */
}

function generatePassword(length) {
    const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

async function Signin(email, password){
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Error("Account does not exist.");
    }

    const isMatched = await bcrypt.compare(password, user.hashPassword);

    console.log("isMatched", isMatched);

    if(!isMatched){
        throw new Error("Incorrect email or password.");
    }

    const userDto = {
        email,
        id : user.id,
        role : user.role
    }

    const token = jwt.sign(userDto, process.env.TOKENSECRET, {expiresIn:'30m'})

    const signinResponse = {
        userId: user._id,
        email: user.email,
        token,
        tokenExpirationTime:  new Date(now.getTime() + 30 * 60 * 1000) // token expiration time in UTC
      };

    return signinResponse;

}

module.exports = {
    CreateUserAccount,
    Signin
};
