import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

import Usuario from "../models/UsuarioModel.js"

dotenv.config();

class UsuarioController {
    async login(request, response) {
        const { usuario, senha } = request.body;

        const senhaDb = await Usuario.login(usuario)

        if (!senhaDb[0]) {
            return response.status(404).json({ erro: 'Usuário não encontrado' })
        }

        if (senhaDb[0].senha_usuario != senha) {
            return response.status(401).json({ erro: 'Senha incorreta!' })
        }

        const token = jwt.sign(usuario, process.env.JWT_SECRET)

        return response.status(200).json({
            success: 'Logado com suscesso!',
            token: token,
            user_id: senhaDb[0].id_usuario,
            user_name: senhaDb[0].nome_usuario,
        })
    }

    async buscarPermissoes(request, response) {
        const { id } = request.params;

        try {
            const permissions = await Usuario.buscarPermissoes(id)
            const permissionsJwt = jwt.sign(permissions, process.env.JWT_SECRET)
            return response.json(permissionsJwt);
        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message });
        }
    }
}

export default new UsuarioController();