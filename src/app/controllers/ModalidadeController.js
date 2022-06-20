import Modalidade from '../models/ModalidadeModel.js';



class ModalidadeController {

    async index(request, response) {
        try {
            const modalidades = await Modalidade.listarModalidades();
            console.log(modalidades)
            return response.status(200).json(modalidades);
        }
        catch (err) {
            console.log(err.message);
            return response.status(500).json({ message: 'Falha ao buscar' })
        }
    }
}
export default new ModalidadeController;