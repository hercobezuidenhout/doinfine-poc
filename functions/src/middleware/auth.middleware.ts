import { validateToken } from '../services/auth.service'

export const extractTokenFromHeader = (header) => header.split(' ')[1]

export default (options) => {
    return (req, res, next) => {
        const idToken = extractTokenFromHeader(req.headers.authorization)

        if (!idToken) {
            res.status(401).send()
            return
        }

        validateToken(idToken)
            .then((decodedToken) => {
                next()
            })
            .catch(error => {
                console.log(error)
                res.status(401).send()
            })
    }
}