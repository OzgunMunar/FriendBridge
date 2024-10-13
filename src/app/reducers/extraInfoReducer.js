export const INITIAL_STATE = {
    image: false,
    friend: false,
    location: false
}

export const extraInfoReducer = (state, action) => {

    switch (action.type) {
        case "OpenImageSection":
            return {
                ...state,
                image: !state.image,
                friend: false,
                location: false
            }

        case "OpenFriendSection":
            return {
                ...state,
                image: false,
                friend: !state.friend,
                location: false
            }

        case "OpenLocationSection":
            return {
                ...state,
                image: false,
                friend: false,
                location: !state.location
            }
        
        case "DefaultValues":
            return {
                image: false,
                friend: false,
                location: false
            }
    
        default:
            return state;
    }

}