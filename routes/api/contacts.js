const express = require('express')
const router =  express.Router()

const Contact = require('../../models/contact')

// @route  Get api/contacts
// @desc   Get all contacts
// @access Public
router.get('/',(req,res) => {
    Contact.find()
            .sort({date: -1})
            .then(
                    contacts => {
                        console.log("Getting Requests")
                        res.json(contacts)
                    }
                )
    // console.log("Hey atleast I am working")
})

// @route  POST api/contacts
// @desc   POST a contact
// @access Public
router.post('/', (req,res) => {
    const newContact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        emailId: req.body.emailId
    })
    
    newContact.save()
              .then(contact => res.json(contact))
              .catch(err => console.log(err))
})
// Async Call
// router.post('/', async (req,res) => {
//     const newContact = new Contact({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         phoneNumber: req.body.phoneNumber,
//         emailId: req.body.emailId
//     })
//     try{
//         const savedContact = await newContact.save()
//         res.json(savedContact)
//     }
//     catch(err){
//         res.json({message: err})
//     }
              
// })

// @route  DELETE api/contacts/:id
// @desc   DELETE a contact
// @access Public
router.delete('/:id',(req,res) => {
    Contact.findById(req.params.id)
    .then(contact => contact.remove()
                            .then(res => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}))
})

// @route  UPDATE api/contacts/:id
// @desc   UPDATE a contact
// @access Public
router.patch('/:id',async (req,res) => {
   try{
    const contact = await Contact.updateOne({_id: req.params.id},{$set:{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        emailId: req.body.emailId
    }})
   }catch(err){
    res.json({message:err})
   }
})
module.exports = router