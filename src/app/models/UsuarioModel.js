import database from '../../config/database.js';

class Usuario {
    //Login
    async login(login) {

        const senhaUsuario = await
            database('usuarios')
                .select('senha_usuario', 'id_usuario', 'nome_usuario')
                .where('login_usuario', '=', login)
                .returning('*')
        console.log(senhaUsuario);
        return senhaUsuario;
    }

    //Buscar as permissoes do usuario 
    async buscarPermissoes(id) {

        const permissoes = await
            database('usuarios')
                .select('permissoes_usuario')
                .where('id_usuario', '=', id)
        console.log('MODEELL AQUI' + permissoes[0].permissoes_usuario)

        return permissoes[0].permissoes_usuario;
    }
}

export default new Usuario
