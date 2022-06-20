import Faltas from '../models/FaltasModel.js';



class FaltasController {
    async index(request, response) {

        try {
            const listaFaltas = await Faltas.listarFaltas();
            return response.json(listaFaltas);
        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message });
        }
    }

    async create(request, response) {
        try {
            await Faltas.cadastrarFalta(request.body);
            console.log('Inserido com suscesso')
            return response.status(201).json({ message: 'Suscesso' });

        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message });
        }
    }


    async deletarFalta(request, response) {
        const { id } = request.params;
        try {
            await Faltas.deletarFalta(id);
            console.log('Falta deletada com suscesso!')
            return response.status(201).json({ message: 'Suscesso' });

        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message });
        }
    }

    async atualizarFalta(request, response) {
        const { id } = request.params;
        try {
            await Faltas.atualizarFalta(request.body, id);
            console.log('Atualizado com suscesso')
            return response.status(201).json({ message: 'Suscesso' });

        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message });
        }
    }

    async buscarFaltaPorId(request, response) {

        const { id } = request.params;

        try {
            const falta = await Faltas.buscarFaltaPorId(id)
            console.log(falta)
            return response.json(falta);
        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message });
        }
    }


}

export default new FaltasController;