import React,{useReducer, useEffect} from 'react'
import axios from 'axios'

// Type constants of actions 
const FETCH_FAILURE = 'FETCH_FAILURE'
const FETCH_SUCESS = 'FETCH_SUCESS'

// Initial State 
const initialState = {
    contacts: [],
    loading: true,
    error: '',
    numberOfContacts: 0
}
// Reducer function from the 
const reducer = (state,action) => {
    switch(action.type){
        case FETCH_SUCESS: return {
            loading: false,
            error:'',
            contacts: action.payload,
            numberOfContacts: action.payload.length
        }
        case FETCH_FAILURE: return {
            loading: false,
            error: action.payload,
            contacts: [],
            numberOfContacts: action.payload.length
        }
        default: return state
    }
}
function ContactBook() {
    const [state,dispatch] = useReducer(reducer,initialState)
    useEffect(() => {
        axios.get('/api/contacts')
             .then(res => { 
                 console.log("fetched Results")
                 dispatch({type: FETCH_SUCESS, payload: res.data})
                })
             .catch(err => dispatch({type: FETCH_FAILURE, payload: err}))
    },[state.numberOfContacts])
    return (
        <div>
            {state.contacts.map(contact => (<div key={contact._id}>{contact.firstName},{contact.lastName},{contact.phoneNumber},{contact.emailId}</div>))}
        </div>
    )
}

export default ContactBook
