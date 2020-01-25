import React, { useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'reactstrap'

function AddContact() {
    // Individual contact
    const contact = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailId: ''
    }
    const [contactToBeAdded, setContact] = useState(contact)

    const addContact = (e) => {

        axios.post("/api/contacts", contactToBeAdded)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    return (
        <Row>
            <Col md="12">
                <form onSubmit={addContact}>
                    <div>
                        <label htmlFor='firstName'>First Name:</label>
                        <input type='text'
                            id="firstName"
                            value={contactToBeAdded.firstName}
                            onChange={e => setContact({ ...contactToBeAdded, firstName: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input type='text'
                            id='lastName'
                            value={contactToBeAdded.lastName}
                            onChange={e => setContact({ ...contactToBeAdded, lastName: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='phoneNumber'>Phone Number:</label>
                        <input type='text'
                            id='phoneNumber'
                            value={contactToBeAdded.phoneNumber}
                            onChange={e => setContact({ ...contactToBeAdded, phoneNumber: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor='emailId'>Email:</label>
                        <input type='text'
                            id='emailId'
                            value={contactToBeAdded.emailId}
                            onChange={e => setContact({ ...contactToBeAdded, emailId: e.target.value })} />
                    </div>
                    <div>
                        <button>Add Contact</button>
                    </div>
                </form>
            </Col>
        </Row>
    )
}

export default AddContact
