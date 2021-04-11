
import database from '../../config/database.js';

class Empresas {
    
    //Função para cadastrar empresa
    async cadastrarEmpresa(data) { 

            await database('empresas').insert(data)
                     
        } 

    async buscarEmpresas() {

         const empresas =  await database('empresas').select('*');

         return empresas;

    } 
        
} 

    


export default new Empresas;