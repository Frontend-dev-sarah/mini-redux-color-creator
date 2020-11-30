const initialState = {
    colorList : []
}


export const reducer = (state = initialState, action) => {
   
    switch (action.type) {
        case 'addElement': 
            return {
                ...state,
                colorList: state.colorList.concat(action.payload)
            }       
        default:
            return state;
    }

}

