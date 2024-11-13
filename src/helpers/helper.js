import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {

    try {

        const token = request.cookies.get('token')?.value
        
        if (!token) {
            throw new Error("JWT must be provided")
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

        return decodedToken.id

    } catch (error) {

        console.error("Error verifying JWT:", error)

        if (error.name === 'TokenExpiredError') {
            throw new Error("JWT token has expired. Please log in again.")
        }

    }

}