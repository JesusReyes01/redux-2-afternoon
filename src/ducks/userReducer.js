import axios from 'axios'

const initialState = {
    email:null,
    firstName: null,
    lastName: null
};
//action creator
const REQUEST_USER_DATA = 'REQUEST_USER_DATA'
//action creator function
export const requestUserData = () => {
    let data = axios.get('/auth/user-data').then(res=>res.data)
    return{
        type: REQUEST_USER_DATA,
        payload: data
    }
}
//reducer function
export default function reducer (state = initialState, action){
    // const {type, payload} = action;
    //type or action.type ^ deconstructed.
    switch (action.type){
        case REQUEST_USER_DATA + '_PENDING':
            return 'pending';
        case REQUEST_USER_DATA + '_FULFILLED':
            const {email, firstName, lastName } = action.payload.user 
            return {email, firstName, lastName};
        // case REQUEST_USER_DATA + '_FULFILLED':
        //     const {email, firstName, lastName } = payload.user 
        //     return {email, firstName, lastName};
        //MAYBE
        // case REQUEST_USER_DATA + '_FULFILLED':
        //     return payload.user;
        default:
            return state;
    }
}