const { Account, User } = require('../db/schema')
const { usernameSchema, passwordSchema, firstNameSchema, lastNameSchema, updateBody } = require('../zod-schema/zodSchema')
const { JWT_SECRET } = require("../config")
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/middleware')
const express = require('express')

const router = express.Router()

router.post('/signup', async function(req, res){
    const username = req.body.username
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const password = req.body.password

    const usernameResult = usernameSchema.safeParse(username);
    const passwordResult = passwordSchema.safeParse(password);
    const firstNameResult = firstNameSchema.safeParse(firstName);
    const lastNameResult = lastNameSchema.safeParse(lastName);

    if (!usernameResult.success) {
        return res.status(400).json({ error: 'Invalid username' });
    }
    if (!passwordResult.success) {
        return res.status(400).json({ error: 'Invalid password' });
    }
    if (!firstNameResult.success) {
        return res.status(400).json({ error: 'Invalid first name' });
    }
    if (!lastNameResult.success) {
        return res.status(400).json({ error: 'Invalid last name' });
    }

    const usernameValue = usernameResult.data;
    const passwordValue = passwordResult.data;
    const firstNameValue = firstNameResult.data;
    const lastNameValue = lastNameResult.data;

    try {
        
    const existingUser = await User.findOne({ username: usernameValue });
        
    if (existingUser) {
        return res.status(411).json({ 
            msg: 'Username already taken' 
        });
    }

    else{
        const user = await User.create({
            username: usernameValue,
            password: passwordValue,
            firstName: firstNameValue,
            lastName: lastNameValue
        });

        const userId = user._id;
        const token = jwt.sign({ userId }, JWT_SECRET);

        await Account.create({
            userId,
            firstName,
            balance: Math.floor(Math.random() * 10000) + 1
        });

        res.json({ msg: 'User created successfully', token });
    } 
    }
    catch (error){
        console.error(error)
        res.status(500).json({
            error: "internal server error"
        })
    }
})

router.post('/signin', async function(req, res){
    const username = req.body.username
    const password = req.body.password

    try{
        const user = await User.findOne({
            username,
            password
        })
        
        if(!user){
            res.status(411).json({
                msg: "incorrect credentials, login failed"
            })
        }

        else {
            const userId = user._id
            const token = jwt.sign({
                userId
            }, JWT_SECRET)

            res.status(200).json({
                msg: 'log in successful',
                token: token
            })
        }


    } catch(error){
        res.status(411).json({
            msg: "incorrect credentials, login failed"
        })
    }
})

router.put('/update', authMiddleware, async function(req, res){
    const { success } = updateBody.safeParse(req.body)
    if(!success){
        return res.status(403).json({
            msg: 'error while updating information'
        })
    }
    await User.updateOne({
            _id: req.userId
        }, req.body
    )
    res.json({
        msg: 'details updated successfully'
    })
})

router.get('/bulk', authMiddleware, async function(req, res){
    const filter = req.query.filter || ""

    const filteredUsers = await User.find({
        $or: [{
            firstName: {
                "$regex" : filter,
                "$options" : "i"
            }
        },{
            lastName: {
                "$regex": filter,
                "$options" : "i"
            }
        }
    ]
    })
    if(!filteredUsers || filteredUsers.length == 0){
        res.json({
            msg: 'no users found'
        })
    }
    else{
        res.json({
            user: filteredUsers.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    }
})

module.exports = router;
