import database from '../../config/database.js'
import DateRange from '../utils/dateRange.js'

class Faltas {

    //Função para listar todos os jovens
    async listarFaltas() {
        const listarFaltas = await
            database('faltas_aprendizes')
                .join('jovens', 'faltas_aprendizes.jovem_id', '=', 'jovens.id_jovem')
                .join('empresas', 'jovens.empresa_id', '=', 'empresas.id_empresa')
                .join('modalidade', 'empresas.modalidade_id', '=', 'modalidade.id_modalidade')
                .select(
                    'jovens.nome',
                    'empresas.nome_fantasia',
                    'faltas_aprendizes.jovem_id',
                    'faltas_aprendizes.id_falta',
                    'faltas_aprendizes.data_falta',
                    'faltas_aprendizes.horas_falta',
                    'faltas_aprendizes.atividade',
                    'faltas_aprendizes.status_falta',
                    'faltas_aprendizes.atestado',
                    'faltas_aprendizes.detalhes',
                    'faltas_aprendizes.periodo_falta',
                    'salario',
                    'tipo_salario',
                    'carga_horaria'
                )
                .orderBy('data_falta', 'desc')
                .returning("*")
        return listarFaltas;
    }

    //Buscar Falta por Id

    async buscarFaltaPorId(id) {
        const falta = await database('faltas_aprendizes')
            .select(
                'jovens.nome',
                'empresas.nome_fantasia',
                'faltas_aprendizes.jovem_id',
                'faltas_aprendizes.id_falta',
                'faltas_aprendizes.data_falta',
                'faltas_aprendizes.horas_falta',
                'faltas_aprendizes.atividade',
                'faltas_aprendizes.status_falta',
                'faltas_aprendizes.atestado',
                'faltas_aprendizes.detalhes',
                'faltas_aprendizes.periodo_falta',
                'usuarios.nome_usuario',
            )
            .join('jovens', 'faltas_aprendizes.jovem_id', '=', 'jovens.id_jovem')
            .join('usuarios', 'faltas_aprendizes.responsavel_falta', '=', 'usuarios.id_usuario')
            .join('empresas', 'jovens.empresa_id', '=', 'empresas.id_empresa')
            .where('id_falta', '=', id)
            .returning('*')

        return falta;
    }

    //Enviar datas e calendaio
    async atualizarFalta(data, id) {

        const { atestado, nomeAtestado, ...falta } = data;

        const atestadoHash = `${id}-${nomeAtestado}` //montando hash do nome do atestado

        const finalData = Object.assign( //inserindo o nome do atestado no objeto
            falta,
            { 'atestado': atestadoHash }
        );
        return await
            database('faltas_aprendizes')
                .where({ id_falta: id })
                .update(finalData)
                .returning("*")
    }

    //Deletar admissao
    async deletarFalta(id) {

        const deletarFalta =
            await database('faltas_aprendizes')
                .delete()
                .where({ id_falta: id })
                .returning('*')

        return deletarFalta;

    }

    //Enviar datas e calendaio
    async cadastrarFalta(data) {

        const { data_falta, atestado, nomeAtestado, data_ultima_falta, ...falta } = data;

        const atestadoHash = `${data.jovem_id}-${nomeAtestado}` //montando hash do nome do atestado

        //Verica se foi lançado falta individual ou em lote
        if (!data_ultima_falta || data_ultima_falta == 'undefined' || data_ultima_falta == null) {

            const finalData = Object.assign( //inserindo o nome do atestado no objeto
                falta,
                { 'atestado': atestadoHash, 'data_falta': data_falta }
            );

            return await
                database('faltas_aprendizes')
                    .insert(finalData)
                    .returning("*")

        }
        else {
            const diasFaltas = DateRange(data_falta, data_ultima_falta) // Retorna um array com as datas de faltas
            let batch = []

            //Percorre todas as datas e cria um array de faltas com todas as informações inserindo a data da falta
            diasFaltas.map(index => {
                batch.push(
                    {
                        'jovem_id': data.jovem_id,
                        'horas_falta': data.horas_falta,
                        'atividade': data.atividade,
                        'status_falta': data.status_falta,
                        'detalhes': data.detalhes,
                        'periodo_falta': data.periodo_falta,
                        'atestado': atestadoHash,
                        'data_falta': index,
                        'responsavel_falta': data.responsavel_falta,
                    }
                )
            })
            return await
                database('faltas_aprendizes')
                    .insert(batch)
                    .returning("*")
        }
    }
}

export default new Faltas;