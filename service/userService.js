const db = require("../db/config.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtSecretKey = "the user"
const validation = require('../validation/userValidation.js')
const salt = 10;
const user = db.user;
const organization = db.organization;

async function superAdminSignIn(req, res) {
    try {
        let value = req.body
        let passwordValid = validation.validatePassword(value.password)
        if(pass == false){
            return res.status(400).json({ message: "minimum 8 characters in password"})
        }
        let nameValid = validation.validateUsername(value.user_name)
        if(nameValid == false){
            return res.status(400).json({message: "invalid characters"})
        }
        let password = await bcrypt.hash(passwordValid, salt)
        let users = {}
        users.user_name = value.user_name
        users.password = password
        users.phone_number = value.phone_number
        users.email = value.email
        users.address = value.address
        users.role_id = value.role_id
        let checkPhone = await user.findOne({ where: { phone_number: value.phone_number } })
        if (!checkPhone) {
            let checkEmail = await user.findOne({ where: { email: value.email } })
            if (!checkEmail) {
                let data = await user.create(users)
                return data;
            } else {
                return res.status(400).json({ message: "Already email exists" })
            }
        } else {
            return res.status(400).json({ message: "Already phone number exists" })
        }
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function superAdminLogIn(req, res) {
    try {
        let phoneNumber = req.body.phone_number
        let check = await user.findOne({ where: { phone_number: phoneNumber } })
        if (!check) {
            return res.status(400).json({ message: "check the phone number" })
        }
        let password = await bcrypt.compare(req.body.password, check.password)
        if (password == true) {
            let data = {}
            data.role_id = check.role_id
            data.uuid = check.uuid
            const token = jwt.sign(data, jwtSecretKey);
            return token;
        }
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function signIn(req, res) {
    try {
        let domain = req.headers.domain
        const checkDomain = await organization.findOne({ where: { organization_name: domain } })
        if (!checkDomain) {
            return res.status(404).json({ message: "Organization not found " })
        }
        if (checkDomain.organization_name == domain) {
            let value = req.body
            let passwordValid = validation.validatePassword(value.password)
            if(pass == false){
                return res.status(400).json({ message: "minimum 8 characters in password"})
            }
            let nameValid = validation.validateUsername(value.user_name)
            if(nameValid == false){
                return res.status(400).json({message: "invalid characters"})
            }
            let password = await bcrypt.hash(passwordValid, salt)
            let users = {}
            users.user_name = value.user_name
            users.password = password
            users.phone_number = value.phone_number
            users.email = value.email
            users.address = value.address
            users.role_id = value.role_id
            users.domain = domain
            users.organization_id = checkDomain.uuid
            if (req.uuid) {
                users.created_by = req.uuid
            }
            let checkPhone = await user.findOne({ where: { phone_number: value.phone_number } })
            if (!checkPhone) {
                let checkEmail = await user.findOne({ where: { email: value.email } })
                if (!checkEmail) {
                    let data = await user.create(users)
                    return data;
                } else {
                    return res.status(400).json({ message: "Already email exists" })
                }
            } else {
                return res.status(400).json({ message: "Already phone number exists" })
            }
        } else {
            return res.status(400).json({ message: "access denied in organization " })
        }
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function logIn(req, res) {
    try {
        let domain = req.headers.domain
        const checkDomain = await organization.findOne({ where: { organization_name: domain } })
        if (!checkDomain) {
            return res.status(404).json({ message: "Organization not found " })
        }

        let phoneNumber = req.body.phone_number
        let check = await user.findOne({ where: { phone_number: phoneNumber,is_delete:false,is_active:true } })
        if (!check) {
            return res.status(400).json({ message: "check the phone number" })
        }
        if (check.organization_name == domain) {
            let password = await bcrypt.compare(req.body.password, check.password)
            if (password == true) {
                let data = {}
                data.role_id = check.role_id
                data.uuid = check.uuid
                data.organization_id = check.organization_id
                const token = jwt.sign(data, jwtSecretKey);
                return token;
            }
        } else {
            return res.status(400).json({ message: "access denied in organization " })
        }
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getUser(req, res) {
    try {
        let domain = req.headers.domain
        const id = req.params.id
        if(req.role == 'superAdmin'){
            if(domain == undefined){
                const data = await user.findOne({ where: { uuid: id } })
                if (!data) {
                    return res.status(404).json({ message: "user not found" })
                }
                return data;
            }
            const data = await user.findOne({ where: { uuid: id } })
            if (!data) {
                return res.status(404).json({ message: "user not found" })
            }
            return data;
        }
        const checkDomain = await organization.findOne({ where: { organization_name: domain } })
        if (!checkDomain) {
            return res.status(404).json({ message: "Organization not found " })
        }
        if (checkDomain.organization_name == domain) {
            const data = await user.findOne({ where: { uuid: id,domain:domain } })
            if (!data) {
                return res.status(404).json({ message: "user not found" })
            }
            if(req.role == 'customer'){
                if(data.uuid == req.uuid){
                    return res.status(200).json({ message: "get data successfully ", result: data })
                }
            }
            return data;  
        } else {
            return res.status(400).json({ message: "access denied in organization " })
        }
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getAllUser(req, res) {
    try {
        let domain = req.headers.domain
        if(req.role == 'superAdmin'){
            if(domain == undefined){
                const data = await user.findAll({ where: {domain:domain}})
                if (data.length == 0) {
                    return res.status(404).json({ message: "organization user not found" })
                }
                return data;
            }
            const data = await user.findAll({ where: {domain:domain}})
            if (data.length == 0 ) {
                return res.status(404).json({ message: "organization user not found" })
            }
            return data;
        }
        const checkDomain = await organization.findOne({ where: { organization_name: domain } })
        if (!checkDomain) {
            return res.status(404).json({ message: "Organization not found " })
        }
        if (checkDomain.organization_name == domain) {
            const data = await user.findAll({ where: {domain:domain}})
            if (!data) {
                return res.status(404).json({ message: "organization user not found" })
            }
            return data;
        } else {
            return res.status(400).json({ message: "access denied in organization " })
        }
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function updateUser(req, res) {
    try {
        let domain = req.headers.domain
        if(req.role == 'superAdmin'){
            let id = req.params.id
            const datas = await user.findOne({ where: { uuid: id } })
            if (!datas) {
                return res.status(404).json({ message: "user not found" })
            }
            let data = { uuid: id }
            let value = req.body
            let users = {}
            users.user_name = value.user_name
            users.phone_number = value.phone_number
            users.email = value.email
            users.address = value.address
            const result = await user.update(data, users)
            if (!result) {
                return res.status(404).json({ message: "user not found "})
            }
            return result;
        }
        
        const checkDomain = await organization.findOne({ where: { organization_name: domain } })
        if (!checkDomain) {
            return res.status(404).json({ message: "Organization not found " })
        }
        if (checkDomain.organization_name == domain) {
            let id = req.params.id
            if(req.role == 'customer'){
                if(id != req.uuid){
                    return res.status(400).json({ message: "Invalid account" })
                }
            }
            const datas = await user.findOne({ where: { uuid: id,domain:domain } })
            if (!datas) {
                return res.status(404).json({ message: "user not found" })
            }
            let data = { uuid: id }
            let value = req.body
            let users = { }
            users.user_name = value.user_name
            users.phone_number = value.phone_number
            users.email = value.email
            users.address = value.address
            const result = await user.update(data, users)
            if (!result) {
                return res.status(404).json({ message: "user not found "})
            }

            return result;
        }
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function deleteUser(req, res) {
    try {
        let domain = req.headers.domain
        const id = req.params.id
        if(req.role == 'superAdmin'){
            let data = { uuid: id }
            let datas = await user.findOne({ where: data })
            if(!datas){
                return res.status(404).json({ message: "user not found" })
            }
            let users = {}
            users.is_delete = 'true'
            users.is_active = 'false'
            const result = await user.update(data, users)
            return result;
        }
        const checkDomain = await organization.findOne({ where: { organization_name: domain } })
        if (!checkDomain) {
            return res.status(404).json({ message: "Organization not found " })
        }
        if (checkDomain.organization_name == domain) {
            let data = { uuid: id }
            let datas = await user.findOne({ where: data })
            if(!datas){
                return res.status(404).json({ message: "user not found" })
            }
            let users = {}
            users.is_delete = 'true'
            users.is_active = 'false'
            const result = await user.update(data, users)
            return result;
        }
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

module.exports = { superAdminSignIn, superAdminLogIn, signIn, logIn, updateUser, getAllUser, getUser, deleteUser }
