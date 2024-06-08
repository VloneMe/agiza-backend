
export const OriginReducer = (state, action) => {
    switch(action.type){
        case "ADD_ORIGIN":
            return {
                ...state,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                address: action.payload.address,
                name: action.payload.name
            }
        default:
            return state
    }
}

export const DestinationReducer = (state, action) => {
    switch(action.type){
        case "ADD_DESTINATION":
            return {
                ...state,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                address: action.payload.address,
                name: action.payload.name
            }
        default:
            return state
    }
}