import axios from 'axios'

//initial state
const initialState = {
    purchases: [],
    budgetLimit: null,
    loading:false
}
//action creator
const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
const ADD_PURCHASE = 'ADD_PURCHASE'
const REMOVE_PURCHASE = 'REMOVE_PURCHASE'

//ACTION CREATOR FUNCTION
export const requestBudgetData = () => {
    let data = axios.get('/api/budget-data').then(res=> res.data)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}

//another action creator

//action creator function
export const addPurchase = (price, description, category) => {
    let data = axios
        .post('/api/budget-data/purchase', {
        description, 
        price, 
        category})
        .then(res=>res.data)
    return {
        type: ADD_PURCHASE,
        payload: data
    }
}

//delete action creator
export const removePurchase = (id) => {
    let data = axios
        .delete(`/api/budget-data/purchase/${id}`)
        .then(res=>res.data)
    return {
        type: REMOVE_PURCHASE,
        payload: data
    }
}



export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case REQUEST_BUDGET_DATA + '_PENDING':
            return {...state, loading:true};
        case REQUEST_BUDGET_DATA + '_FULFILLED':
            return {...state,...payload, loading: false}
        case ADD_PURCHASE + '_PENDING':
            return { ...state, loading: true }
        case ADD_PURCHASE + '_FULFILLED':
            return { ...state, purchases: payload, loading: false }
        case REMOVE_PURCHASE + '_PENDING':
            return { ...state, loading: true };
        case REMOVE_PURCHASE + '_FULFILLED':
            return { ...state, loading: false, purchases: payload }
        default:
            return state;
    }
}