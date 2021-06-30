import Jovens from '../models/JovensModel.js';



class JovensController {
    async index(request, response) {

        try {
            const listaJovens = await Jovens.listarJovens();
            return response.json(listaJovens);
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    async show(request, response) {

        const { id } = request.params;

        try {
            const jovem = await Jovens.buscarJovemPorId(id)
            return response.json(jovem);
        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message });
        }
    }

    async buscarJovensEmProcesso(request, response) {

        try {
            const jovensEmProcesso = await Jovens.buscarJovensEmProcesso()
            return response.status(200).json(jovensEmProcesso)
        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message })
        }
    }

    async create(request, response) {


        try {
            await Jovens.cadastrarJovem(request.body);
            console.log('Inserido com suscesso')
            return response.status(201).json({ message: 'Suscesso' });

        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message });
        }
    }

    async deletarAdmissao(request, response) {
        const { id } = request.params;
        try {
            await Jovens.deletarAdmissao(id);
            console.log('Deletado com suscesso')
            return response.status(201).json({ message: 'Suscesso' });

        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message });
        }
    }

    async update1(request, response) {

        const { id } = request.params;

        try {
            await Jovens.updateJovem1(request.body, id)
            console.log('Atualizado com suscesso!')
            return response.status(201).json({ message: 'Suscesso' });
        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message });
        }


    }

    async update2(request, response) {

        const { id } = request.params;

        try {
            await Jovens.updateJovem2(request.body, id)
            console.log('Atualizado com suscesso!')
            return response.status(201).json({ message: 'Suscesso' });
        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message });
        }
    }

    async showNotes(request, response) {
        const { id } = request.params;

        try {
            const Anotacoes = await Jovens.listarAnotacoes(id);
            return response.json(Anotacoes);
        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message });
        }
    }

    async finalizarAdmissao(request, response) {
        const { id } = request.params;

        try {
            await Jovens.finalizarAdmissao(id)
            console.log('Atualizado com suscesso!')
            return response.status(201).json({ message: 'Suscesso' });
        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message });
        }
    }

    async createNote(request, response) {

        const { id } = request.params;

        try {
            await Jovens.CriarAnotacao(request.body, id)
            console.log('Anotacao Inserida!', id)
            return response.status(200).json({ message: 'Suscesso' });
        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: error.message })
        }
    }
}

export default new JovensController;