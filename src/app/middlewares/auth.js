import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config();

async function auth(req, res, next) {

    //Verifica se tem autorização no cabeçalho
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Não autorizado.' })
    }
    //Recupera o toke do cabeçalho e retira o "Bearer"
    const [, token] = req.headers.authorization.split(' ')

    try {
        jwt.verify(token, process.env.JWT_SECRET)
        next();
    } catch (err) {
        res.status(401).json({ error: 'Acesso não autorizado!' })
    }
}

export default auth;