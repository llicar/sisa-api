
import database from '../../config/database.js';
import { objToUpperCase } from '../utils/upperCase.js'

class Empresas {

    //Função para cadastrar empresa
    async cadastrarEmpresa(data) {
        await database('empresas').insert(data)

    }

    async buscarEmpresas() {
        const empresas = await database('empresas')
            .select('*')
            .join('modalidade', 'empresas.modalidade_id', '=', 'modalidade.id_modalidade')
            .orderBy('empresas.razaosocial');

        return empresas;
    }

    async buscarInvEmpresas() {
        const invEmpresas = await database('inventario_empresas')
            .select('*')
            .orderBy('inventario_empresas.NOME');

        return invEmpresas;
    }

    async alterarEmpresaPorId(data, id) {

        const upperCaseData = objToUpperCase(data);

        return await
            database('empresas')
                .where({ id_empresa: id })
                .update(upperCaseData)
                .returning("*")
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