import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

class LoginConcroller {
    async login(request, response) {
        const { usuario, senha } = request.body;

        //Verifica se usuário e senha está correto
        if (usuario != process.env.LOGIN_USER || senha != process.env.LOGIN_PASSWORD) {
            return response.status(401).json({ erro: 'Login ou senha incorreto!' })
        }

        const token = jwt.sign(usuario, process.env.JWT_SECRET)

        return response.status(200).json({
            success: 'Logado com suscesso!',
            token: token
        })
    }
}

export default new LoginConcroller();