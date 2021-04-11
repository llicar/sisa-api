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
}
export default new EmpresasController;