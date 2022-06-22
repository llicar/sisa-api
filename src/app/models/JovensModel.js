import database from '../../config/database.js';
import { objToUpperCase } from '../utils/upperCase.js';
import { format, isValid } from "date-fns";
import ptBR from "date-fns/locale/pt-BR/index.js";

class Jovens {
    //Função para listar todos os jovens
    async listarJovens() {
        const listarJovens = await

            database('jovens')
                .join('empresas', 'jovens.empresa_id', '=', 'empresas.id_empresa')
                .select('*')
                .orderBy('nome');
        console.log(listarJovens)
        return listarJovens;
    }

    //Função para listar o inventário de jovens
    async inventario() {
        const inventario = await
            database('inventario_ativos')
                .select('*')
                .orderBy('nome');
        return inventario;
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

    async buscarJovensPorEmpresa(idEmpresa) {

        const jovens = await
            database('jovens')
                .select('jovens.nome', 'jovens.admissao', 'jovens.demissao')
                .where({ 'jovens.empresa_id': idEmpresa })

        return jovens;
    }

    //Função para cadastrar jovem
    async cadastrarJovem(data) {

        const upperCaseData = objToUpperCase(data);
        return await
            database('jovens')
                .insert(upperCaseData)
                .returning('*')
    }

    //Deletar admissao
    async deletarAdmissao(id) {

        const deletarAdmissao =
            await database('alteracoes')
                .delete()
                .where('jovem_id', '=', id)
                .returning('*')

        await database('jovens')
            .delete()
            .where('id_jovem', '=', id)
            .returning('*')

        return deletarAdmissao;

    }

    //Enviar datas e calendaio
    async updateJovem1(data, id) {

        const { calendario, calendarName, ...dataJovem } = data;

        const upperCaseData = objToUpperCase(dataJovem);

        const finalCalendarName = `${id}-${calendarName}`

        const calendar = {
            'calendario': finalCalendarName
        }


        const finalData = Object.assign(upperCaseData, calendar);

        return await
            database('jovens')
                .where({ id_jovem: id })
                .update(finalData)
                .returning("*")
    }

    async updateJovem2(data, id) {

        const upperCaseData = objToUpperCase(data);

        return await
            database('jovens')
                .where({ id_jovem: id })
                .update(upperCaseData)
                .returning("*")
    }

    async finalizarAdmissao(id) {

        return await
            database('jovens')
                .where({ id_jovem: id })
                .update({ finalizado: 1 })
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
                .orderBy([{ column: 'admissao', order: 'desc' }, { column: 'nome' }],)
                .where('jovens.finalizado', '=', 0)
    }

    async desligarJovem(data, id) {

        // Busca da data de demissao do aprendiz
        const demissao = await
            database('jovens')
                .where({ id_jovem: id })
                .select('demissao')

        // formata data de demissao
        const prevDesligamento = format(demissao[0].demissao, 'yyyy-MM-dd', { locale: ptBR });

        data = { ...data, prev_desligamento: prevDesligamento, status: 'inativo' };

        await database('jovens')
            .where({ id_jovem: id })
            .update(data)
            .returning("*")
    }
}

export default new Jovens;