const express = require('express');
const { Account } = require('../db/schema');
const authMiddleware = require('../middlewares/middleware');
const router = express.Router()
const mongoose = require('mongoose')

router.get('/balance', authMiddleware, async function(req, res){

    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })

})

router.post('/transfer', authMiddleware, async function(req, res){

    const { to, amount } = req.body

    if(amount<=0){
        return res.status(403).json({
            msg: "invalid amount"
        })
    }

    const fromAccount = await Account.findOne({
        userId: req.userId
    })

    if(fromAccount.balance < amount){
        return res.status(403).json({
            msg: "insufficient balance"
        })
    }
    
    const toAccount = await Account.findOne({
        userId: to
    })

    if(!toAccount){
        return res.status(403).json({
            msg: "user not found"
        })
    }

    try{
        await Account.updateOne({
            userId: req.userId
        },{
            $inc: { balance: -amount }
        })
        
        await Account.updateOne({
            userId: to
        },{
            $inc: {balance: amount}
        })
        return res.status(200).json({
            msg: "transfer successful"
        })
    } catch(error){
        return res.status(500).json({
            msg: "transfer failed"
        })
    }
})

module.exports = router;
