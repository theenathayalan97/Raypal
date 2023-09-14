const db = require('../db/config')
const paypal = require('paypal-rest-sdk');
const product = db.product_company
const order = db.order

async function orderCreate(req, res) {
    try {
        let id = req.params.id
        let domain = req.headers.domain
        let data = await product.findOne({ where: { uuid: id } })
        if (!data) {
            return res.status(400).json({ message: " product not found " })
        }

        paypal.configure({
            'mode': 'sandbox', //sandbox or live
            'client_id': 'AV1FCqdKMwtBe-tI5SxFOKg9kSl9wJbMNv4qSh9o2m68fuV2dCa9-tJTdT1xky7mVoCeeA_kQ4LibCi6',
            'client_secret': 'EAay0bbBo8r8lM0HJJSuV4hxR3auWTS_tfxkF33oxRTdwh3h2ulJ8EaNiEYl5vtDiofsNGnDTCPev4Y4'
        });

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/success",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": `${data.product_name}`,
                        "sku": "001",
                        "price": `${data.product_prize}`,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": `${data.product_prize}`
                },
                "description": "Washing Bar soap"
            }]
        };

        let value = paypal.payment.create(create_payment_json, async function (error, payment) {

            if (error) {
                return res.status(400).json({ message: error })
            } else {

                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        let paymentDetail = {}
                        paymentDetail.product_id = data.uuid
                        paymentDetail.customer_id = req.uuid
                        paymentDetail.payment_id = payment.id
                        paymentDetail.payment_method = payment.payer.payment_method
                        paymentDetail.transactions_status = payment.transactions
                        paymentDetail.links = payment.links[i]
                        paymentDetail.domain = domain
                        paymentDetail.prize = data.product_prize
                        const result = await order.create(paymentDetail)
                       return result ;
                    }
                }
            }
        });
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getOrder(req, res) {
    try {
        const id = req.params.id
        const data = await order.findOne({ where: { uuid: id } })
        if (!data) {
            return res.status(404).json({ message: "order not found" })
        }
        return data ;
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

async function getAllOrder(req, res) {
    try {
        const data = await order.findAll()
        if (!data) {
            return res.status(404).json({ message: "order not found" })
        }
        return data ;
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

// app.get('/success', (req, res) => {
async function orderSuccess(req, res) {
    try {
        let id = req.params.id
        let orderId = { uuid: id }
        let data = await order.findOne({ where: orderId })
        if (!data) {
            return res.status(400).json({ message: " product not found " })
        }
        const payerId = req.query.PayerID;
        const paymentId = data.payment_id;

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": `${data.prize}`
                }
            }]
        };
        paypal.payment.execute(paymentId, execute_payment_json,async function (error, payment) {
            if (error) {
                throw error;
            } else {
                data.status = payment
                const result = await order.update(id,data)
                return result;
            }
        });
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", result: error.message })
    }
}

module.exports = { orderCreate, getOrder, getAllOrder, orderSuccess, }
