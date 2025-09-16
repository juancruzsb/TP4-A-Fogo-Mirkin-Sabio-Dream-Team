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