const product = require('../service/productCompanyService')

async function productCreate(req, res) {
    try {
        const result = await product.productCreate(req,res)
        return res.status(201).json({ message: "product create successfully ", result: result })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong ", result: error.message })
    }
}

async function getProduct(req, res) {
    try {
        const data = await product.getProduct(req,res)
        return res.status(200).json({ message: "get data successfully ", result: data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getAllProduct(req, res) {
    try {
        const data = await product.getAllProduct(req,res)
        return res.status(200).json({ message: "get all data successfully ", result: data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function updateProduct(req, res) {
    try {
        const result = await product.updateProduct(req,res)
        return res.status(200).json({ message: "update data successfully ", result: result })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function deleteProduct(req, res) {
    try {
        const result = await product.deleteProduct(req,res)
        return res.status(200).json({ message: "delete data successfully ", result: result })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}


module.exports = { productCreate, getProduct, getAllProduct, updateProduct, deleteProduct }