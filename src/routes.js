
import Router from 'express';
import JovensController from './app/controllers/JovensController.js';
import EmpresasController from './app/controllers/EmpresasController.js';
import UsuarioController from './app/controllers/UsuarioController.js';
import ModalidadeController from './app/controllers/ModalidadeController.js';
import FaltasController from './app/controllers/FaltasController.js';

import multer from 'multer';

import auth from './app/middlewares/auth.js'
import { multerConfigCalendario, multerConfigAtestado } from './config/upload.js';

const routes = Router();
const uploadCalendario = multer(multerConfigCalendario);
const uploadAtestado = multer(multerConfigAtestado);

//Rota de login
routes.post('/login', UsuarioController.login);

//Rotas da entidade Jovem
routes.get('/jovens', auth, JovensController.index); //Buscar todos os jovems
routes.get('/inventario', auth, JovensController.inventario); // Buscar Inventário de jovens
routes.get('/jovem/:id', auth, JovensController.show); // Buscar jovem por id
routes.post('/jovens', auth, JovensController.create); // Cadastrar jovem
routes.get('/jovensEmProcesso', auth, JovensController.buscarJovensEmProcesso); // Buscar jovens em precesso
routes.get('/jovensPorEmpresa/:idEmpresa', auth, JovensController.buscarJovensPorEmpresa); // Buscar jovens por empresa


routes.get('/anotacoes/:id', auth, JovensController.showNotes);
routes.post('/update1/:id', auth, uploadCalendario.single('calendario'), JovensController.update1);
routes.post('/update2/:id', auth, JovensController.update2);

routes.post('/anotacoes/:id', auth, JovensController.createNote);
routes.post('/finalizarAdmissao/:id', auth, JovensController.finalizarAdmissao);

routes.get('/empresas', auth, EmpresasController.index);
routes.get('/empresas/:id', auth, EmpresasController.BuscarEmpresaPorId);
routes.post('/empresas', auth, EmpresasController.create);
routes.post('/empresas/:id', auth, EmpresasController.alterarEmpresaPorId);
routes.get('/invEmpresas', auth, EmpresasController.InvEmpresas);

routes.post('/deletarAdmissao/:id', auth, JovensController.deletarAdmissao);
routes.post('/desligarJovem/:id', auth, JovensController.desligarJovem);

routes.post('/faltas/:id', auth, uploadAtestado.single('atestado'), FaltasController.create);
routes.post('/deletarFalta/:id', auth, FaltasController.deletarFalta);
routes.post('/atualizarFalta/:id', auth, uploadAtestado.single('atestado'), FaltasController.atualizarFalta);

routes.get('/faltas', auth, FaltasController.index);
routes.get('/faltas/:id', auth, FaltasController.buscarFaltaPorId);

routes.get('/modalidade', auth, ModalidadeController.index);

routes.get('/permissoes/:id', UsuarioController.buscarPermissoes);





export default routes;