const organization = require('../service/organizationService')

async function createOrganization(req, res) {
    try {
            let data = await organization.createOrganization(req,res)
            return res.status(200).json({ message: "create successfully", result: data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getOrganization(req, res) {
    try {
        const data = await organization.getOrganization(req,res)
        return res.status(200).json({ message: "get data successfully ", result: data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getAllOrganization(req, res) {
    try {
        const data = await organization.getAllOrganization
        return res.status(200).json({ message: "get all data successfully ", result: data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function updateOrganization(req, res) {
    try {
        const data = await organization.updateOrganization(req,res)
        return res.status(200).json({ message: "update data successfully ", result: data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function deleteOrganization(req, res) {
    try {
        const datas = await organization.deleteOrganization(req,res)
        return res.status(200).json({ message: "delete data successfully ", result: datas })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

module.exports = { createOrganization, getOrganization, getAllOrganization, updateOrganization, deleteOrganization }
