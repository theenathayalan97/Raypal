const db = require('../db/config')
const paypal = require('paypal-rest-sdk');
const product = db.product_company
const organization = db.organization

async function productCreate(req, res) {
    try {
        const data = req.body
        let domain = req.headers.domain
        let check = await product.findAll({ where: { product_company_name: domain } })
        for (let i = 0; i < check.length; i++) {
            if (check[i].product_name == data.product_name) {
                return res.status(400).json({ message: "Already product name created" })
            }
        }
        const products = {}
        products.product_company_id = req.organization_id
        products.product_company_name = domain
        products.product_name = data.product_name
        products.product_prize = data.product_prize
        products.product_quantity = data.product_quantity
        products.product_created_by = req.uuid
        const result = await product.create(products)
        return result ;
    } catch (error) {
        return res.status(400).json({ message: "something went wrong ", result: error.message })
    }
}

async function getProduct(req, res) {
    try {
        const id = req.params.id
        const data = await product.findOne({ where: { uuid: id } })
        if (!data) {
            return res.status(404).json({ message: "product not found" })
        }
        return data ;
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getAllProduct(req, res) {
    try {
        const data = await product.findAll()
        if (!data) {
            return res.status(404).json({ message: "product not found" })
        }
        return data ;
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function updateProduct(req, res) {
    try {
        const id = req.params.id
        let data = { uuid: id }
        let value = req.body
        let products = {}
        products.product_name = value.product_name
        products.product_prize = value.product_prize
        products.product_quantity = value.product_quantity
        products.product_created_by = value.uuid
        products.is_active = value.is_active
        products.is_delete = value.is_delete
        const result = await product.update(data, products)
        if (!result) {
            return res.status(404).json({ message: "product not found" })
        }
        return result ;
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function deleteProduct(req, res) {
    try {
        const id = req.params.id
        let data = { uuid: id }
        let products = {}
        products.is_delete = 'true'
        products.is_active = 'false'
        const result = await product.update(data, products)
        if (!result) {
            return res.status(404).json({ message: "product not found" })
        }
        return result ;
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}


module.exports = { productCreate, getProduct, getAllProduct, updateProduct, deleteProduct }