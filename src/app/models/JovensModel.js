import database from '../../config/database.js';
import md5 from 'md5';

class Jovens {

    //Função para listar todos os jovens
    async listarJovens() {
        const listarJovens = await

            database('jovens')
                .join('empresas', 'jovens.empresa_id', '=', 'empresas.id_empresa')
                .select('*')
                .orderBy('admissao', 'desc');
        console.log(listarJovens)
        return listarJovens;
    }

    //Função para buscar jovem por ID
    async buscarJovemPorId(id) {

        const jovem = await

            // Busca todas as informações das 3 tabelas com a clausula JOIN
            database('jovens')
                .join('empresas', 'jovens.empresa_id', '=', 'empresas.id_empresa')
                .join('modalidade', 'empresas.modalidade_id', '=', 'modalidade.id_modalidade')
                .select('*')
                .where({ 'jovens.id_jovem': id });

        return jovem;
    }

    //Função para cadastrar jovem
    async cadastrarJovem(data) {

        return await
            database('jovens')
                .insert(data)
                .returning('*')
    }

    //Deletar admissao
    async deletarAdmissao(id) {

        console.log(id)

        return await
            database('jovens')
                .delete()
                .where('id_jovem', '=', id)
                .returning('*')
    }

    //Enviar datas e calendaio
    async updateJovem1(data, id) {

        const { calendario, calendarName, ...dataJovem } = data;

        const finalCalendarName = `${id}-${calendarName}`

        const calendar = {
            'calendario': finalCalendarName
        }
        const finalData = Object.assign(dataJovem, calendar);

        return await
            database('jovens')
                .where({ id_jovem: id })
                .update(finalData)
                .returning("*")
    }

    async updateJovem2(data, id) {

        return await
            database('jovens')
                .where({ id_jovem: id })
                .update(data)
                .returning("*")
    }

    async updateEtapa(id) {

        return await
            database('jovens')
                .where({ id_jovem: id })
                .update({ etapa: 4 })
                .returning("*")
    }

    async listarAnotacoes(id) {

        return await
            database('alteracoes')
                .select("*")
                .where({ jovem_id: id })
                .returning("*")
    }

    async CriarAnotacao(data, id) {

        const dadosAdicionais = {
            data: new Date(),
            jovem_id: id,
        }

        const finalData = Object.assign(data, dadosAdicionais)

        return await
            database('alteracoes')
                .insert(finalData)
    }

    async buscarJovensEmProcesso() {
        return await
            database('jovens')
                .join('empresas', 'jovens.empresa_id', '=', 'empresas.id_empresa')
                .select(
                    'jovens.id_jovem',
                    'jovens.nome',
                    'jovens.admissao',
                    'jovens.status',
                    'empresas.nome_fantasia',
                    'inclusao_calendario',
                    'inclusao_pessoais',
                    'inclusao',
                    'finalizado'
                )
                .orderBy('admissao', 'desc')
                .where('jovens.finalizado', '=', 0)
    }
}

export default new Jovens;