import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send({ error: 'No llego ninguna token en los headers' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'BEGEBE2009');
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).send({ error: 'Unauthorized' })
    }
}

export const verifyAdmin = async (req, res, next) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ error: 'No se encontró usuario en la request' });
    }

    if (!user.rol) {
        return res.status(403).send({ error: 'Not admin' });
    } 

    next();
}