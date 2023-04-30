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
        Role: userRoles.BACKOFFICEUSER,
        CreatedDate: Date.now(),
        CreatedBy: "", // todo : fix this
    };

    const newUser = new userModel(newUserModel);

    const result = await newUser.save()

    return createNewUserDto(result, false, 201, "user created");

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

module.exports = {
    CreateUserAccount,
};
