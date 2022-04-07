const jwt = require('jsonwebtoken');
const JWT_SECRET="thisisasecret";

const fetchUser = (req, res, next) => {
    // Get the user from JWT token and add the ID to request object.
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token."});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (err) {
        return res.status(401).send({ error: "Please authenticate using a valid token."});
    }
}
module.exports = fetchUser;