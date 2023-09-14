const db = require('../db/config')
const jwt = require("jsonwebtoken"); 
const role = db.role
const organization = db.organization

async function tokenValidation(req, res, next) {
    try {
        let getToken = req.headers.authorization
        let split = getToken.split(' ')
        let token = split[1]
        const decoded = jwt.decode(token)
        // console.log("decode : ",decoded)
        const userId = await role.findOne({ where: { uuid: decoded.role_id } })
        if (userId.role_name == 'superAdmin') {
            req.uuid = decoded.uuid
            req.role_id = userId.uuid
            req.role = userId.role_name
            next()
        }
        if (!userId) {
            return res.status(400).json({ message: "Access denied " })
        } else {
            const domain = req.headers.domain
            const value = await organization.findOne({ where: { uuid: decoded.organization_id } })
            // console.log("the value is : ",value);
            if (!value) {
                return res.status(400).json({ message: "organization not found " })
            }
            if (value.organization_name == domain) {
                req.uuid = decoded.uuid
                req.role_id = userId.uuid
                req.role = userId.role_name
                req.organization_id = decoded.organization_id
                next()
            } else {
                return res.status(400).json({ message: "access denied in organization " })
            }
        }
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

function accessValidation(permission) {

    return async function (req, res, next) {
        let count = 0;
        for (let i = 0; i < permission.length; i++) {
            if (req.role == permission[i]) {
                count = count + 1
            }
        }
        if (count == 0) {
            res.status(403).json({ message: "access denied" });
        } else {
            next()
        }
    }

}

module.exports = { tokenValidation, accessValidation, }