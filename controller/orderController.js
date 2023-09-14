const order = require('../service/orderService')

async function orderCreate(req, res) {
    try {
        const data = await order.orderCreate(req, res)
        return res.status(201).json({ message: "order create successfully ", result: data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getOrder(req, res) {
    try {
        const data = await order.getOrder(req, res)
        return res.status(200).json({ message: "get order data successfully ", result: data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getAllOrder(req, res) {
    try {
        const data = await order.getAllOrder(req, res)
        return res.status(200).json({ message: "get all order data successfully ", result: data })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

// app.get('/success', (req, res) => {
async function orderSuccess(req, res) {
    try {
        let data = await order.orderSuccess(req,res)
        return res.status(200).json({ message: "payment sent successfully ", result: result });
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

module.exports = { orderCreate, getOrder, getAllOrder, orderSuccess, }
