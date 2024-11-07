export const INITIAL_STATE = {
    posts: true,
    followingPeople: false,
    followedPeople: false
}

export const profileTabsReducer = (state, action) => {

    switch (action.type) {

        case "onPosts":

            return {

                posts: true,
                followingPeople: false,
                followedPeople: false
            }

        case "onFollowingPeople":

            return {

                posts: false,
                followingPeople: true,
                followedPeople: false
            }
        
        case "onFollowedPeople":

            return {

                posts: false,
                followingPeople: false,
                followedPeople: true
            }
            
    
        default:
            return state;
    }

}