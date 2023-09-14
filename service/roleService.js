const db = require("../db/config.js");
const jwt = require('jsonwebtoken')
const role = db.role;

async function createRole(req, res) {
    try {
        let value = req.body
        let roles = {}
        roles.role_name = value.role_name
        let getData = await role.findOne({ where: { role_name: roles.role_name } })
        if (!getData) {
            let data = await role.create(roles)
            return data ;
        }else{
            return res.status(400).json({ message: "Already exists" }) 
        }
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getRole(req,res){
    try {
        const id = req.params.id
        const data = await role.findOne({ where: { uuid: id ,is_delete:false,is_active:true }})
        if(!data){
            return res.status(404).json({ message: "role not found" })
        }
        return data ;
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getAllRole(req,res){
    try {
        const data = await role.findAll()
        if(data.length == 0){
            return res.status(404).json({ message: "role not found" })
        }
        return data; 
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function updateRole(req,res){
    try {
        const id = req.params.id
        let data = {uuid:id}
        let value = req.body
        let roles = {}
        roles.role_name = value.role_name
        roles.is_active = value.is_active
        roles.is_delete = value.is_delete
        const datas = await role.update(data,roles)
        if(!datas){
            return res.status(404).json({ message: "role not found" })
        }
        return datas
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function deleteRole(req,res){
    try {
        const id = req.params.id
        let data = {uuid:id}
        let roles = {}
        roles.is_delete = 'true'
        roles.is_active = 'false'
        const datas = await role.update(data,roles)
        if(!datas){
            return res.status(404).json({ message: "role not found" })
        }
        return datas;
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

module.exports = { createRole, getRole, getAllRole, updateRole, deleteRole }
