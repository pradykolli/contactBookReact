const express = require('express')
const router =  express.Router()

const Contact = require('../../models/contact')

// @route  Get api/contacts
// @desc   Get all contacts
// @access Public
router.get('/',(req,res) => {
    Contact.find()
            .sort({date: -1})
            .then(contacts => res.json(contacts))
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

module.exports = router