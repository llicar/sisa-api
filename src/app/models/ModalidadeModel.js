import database from '../../config/database.js';

class Modalidade {
    //Função para listar todos os jovens
    async listarModalidades() {
        const listarModalidades = await
            database('modalidade')
                .select('*')
                .orderBy('id_modalidade');
        return listarModalidades;
    }
}

export default new Modalidade;