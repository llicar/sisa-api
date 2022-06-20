import Empresas from '../models/EmpresasModel.js';



class EmpresasController {


    async create(request, response) {
        try {
            await Empresas.cadastrarEmpresa(request.body);
            console.log('Inserido com suscesso');
            return response.status(201).json({ message: 'Suscesso' });
        }
        catch (err) {
            console.log(err.message);
            return response.status(500).json({ message: 'Falha ao inserir' });
        }
    }

    async index(request, response) {
        try {
            const empresas = await Empresas.buscarEmpresas();
            return response.status(200).json(empresas);
        }
        catch (err) {
            console.log(err.message);
            return response.status(500).json({ message: 'Falha ao buscar' })
        }
    }

    async InvEmpresas(request, response) {
        try {
            const invEmpresas = await Empresas.buscarInvEmpresas();
            return response.status(200).json(invEmpresas);
        }
        catch (err) {
            console.log(err.message);
            return response.status(500).json({ message: 'Falha ao buscar' })
        }
    }

    async alterarEmpresaPorId(request, response) {

        const { id } = request.params;

        try {
            await Empresas.alterarEmpresaPorId(request.body, id)
            console.log('Atualizado com suscesso!')
            return response.status(201).json({ message: 'Suscesso' });
        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message });
        }
    }

    async BuscarEmpresaPorId(request, response) {

        const { id } = request.params;
        try {
            const empresa = await Empresas.buscarEmpresaPorId(id);
            return response.status(200).json(empresa);
        }
        catch (err) {
            console.log(err.message);
            return response.status(500).json({ message: 'Falha ao buscar' })
        }
    }
}
export default new EmpresasController;