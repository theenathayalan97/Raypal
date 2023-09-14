const db = require("../db/config.js");
const organization = db.organization;

async function createOrganization(req, res) {
    try {
        let value = req.body
        let createOrg = {}
        createOrg.organization_name = value.organization_name
        createOrg.created_by = req.uuid
        let getOrg = await organization.findOne({ where: { organization_name: createOrg.organization_name } })
        if (!getOrg) {
            let data = await organization.create(createOrg)
            return data ;
        } else {
            return res.status(400).json({ message: "Already exists" })
        }
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getOrganization(req, res) {
    try {
        const id = req.params.id
        const data = await organization.findOne({ where: { uuid: id } })
        if (!data) {
            return res.status(404).json({ message: "organization not found" })
        }
        return data ;
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getAllOrganization(req, res) {
    try {
        const data = await organization.find()
        if (!data) {
            return res.status(404).json({ message: "organization not found" })
        }
        return data ;
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function updateOrganization(req, res) {
    try {
        const id = req.params.id
        let data = { uuid: id }
        let value = req.body
        let organizations = {}
        organizations.organization_name = value.organization_name
        organizations.is_active = value.is_active
        organizations.is_delete = value.is_delete
        const datas = await organization.update(data, organizations)
        if (!datas) {
            return res.status(404).json({ message: "organization not found" })
        }
        return datas ;
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function deleteOrganization(req, res) {
    try {
        const id = req.params.id
        let data = { uuid: id }
        let organizations = {}
        organizations.is_delete = 'true'
        organizations.is_active = 'false'
        const datas = await organization.update(data, organizations)
        if (!datas) {
            return res.status(404).json({ message: "organization not found" })
        }
        return datas;
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

module.exports = { createOrganization, getOrganization, getAllOrganization, updateOrganization, deleteOrganization }
