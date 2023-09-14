const user = require('../service/userService')

async function superAdminSignIn(req, res) {
    try {
        let data = await user.superAdminSignIn(req, res)
        return res.status(200).json({ message: "create super admin successfully", result: data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function superAdminLogIn(req, res) {
    try {
        let token = await user.superAdminLogIn(req, res)
        return res.status(200).json({ message: "login successfully ", result: token })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function signIn(req, res) {
    try {
        let data = await user.signIn(req, res)
        return res.status(200).json({ message: "create successfully", result: data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function logIn(req, res) {
    try {
        let token = await user.logIn(req, res)
        return res.status(200).json({ message: "login successfully ", result: token })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getUser(req, res) {
    try {
        const data = await user.getUser(req, res)
        return res.status(200).json({ message: "get data successfully ", result: data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getAllUser(req, res) {
    try {
        const data = await user.findAll({ where: { domain: domain } })
        return res.status(200).json({ message: "get all data successfully ", result: data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function updateUser(req, res) {
    try {
        const result = await user.updateUser(req, res)
        return res.status(200).json({ message: "update data successfully ", result: result })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function deleteUser(req, res) {
    try {
        const result = await user.deleteUser(req, res)
        return res.status(200).json({ message: "delete data successfully ", result: result })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

module.exports = { superAdminSignIn, superAdminLogIn, signIn, logIn, updateUser, getAllUser, getUser, deleteUser }
