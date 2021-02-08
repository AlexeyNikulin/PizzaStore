const initialState = {
    items: [],
    isLoaded: false
}

const pizzas = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_LOADED':
            return {
                ...state,
                isLoaded: action.payload,
                
            }
        case 'SET_PIZZAS':
            return {
                isLoaded: true,
                items: action.payload,
                
            }
        default: 
            return state;    
    }
}


export default pizzas;