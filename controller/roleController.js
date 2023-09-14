const role = require('../service/roleService')

async function createRole(req, res) {
    try {
            let data = await role.createRole(req,res)
            return res.status(200).json({ message: "create role successfully", result: data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getRole(req,res){
    try {
        const data = await role.getRole(req,res)
        return res.status(200).json({ message:"get data successfully ",result:data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getAllRole(req,res){
    try {
        const data = await role.getAllRole(req,res)
        return res.status(200).json({ message:"get all data successfully ",result:data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function updateRole(req,res){
    try {
        const datas = await role.updateRole(req,res)
        return res.status(200).json({ message:"update data successfully ",result:datas })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function deleteRole(req,res){
    try {
        const datas = await role.deleteRole(req,res)
        return res.status(200).json({ message:"delete data successfully ",result:datas })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

module.exports = { createRole, getRole, getAllRole, updateRole, deleteRole }
