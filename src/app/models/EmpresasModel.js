
import database from '../../config/database.js';

class Empresas {

    //Função para cadastrar empresa
    async cadastrarEmpresa(data) {
        await database('empresas').insert(data)

    }

    async buscarEmpresas() {
        const empresas = await database('empresas').select('*');

        return empresas;
    }

    async buscarEmpresaPorId(id) {
        const empresa = await database('empresas')
            .select('*')
            .join('modalidade', 'empresas.modalidade_id', '=', 'modalidade.id_modalidade')
            .where('id_empresa', '=', id);

        return empresa;
    }

}




export default new Empresas;