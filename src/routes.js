
import Router from 'express';
import JovensController from './app/controllers/JovensController.js';
import EmpresasController from './app/controllers/EmpresasController.js';
import LoginController from './app/controllers/LoginController.js';
import multer from 'multer';

import auth from './app/middlewares/auth.js'
import multerConfig from './config/upload.js';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/login', LoginController.login);

routes.get('/jovens', auth, JovensController.index);
routes.get('/jovem/:id', auth, JovensController.show);
routes.get('/anotacoes/:id', auth, JovensController.showNotes);
routes.get('/jovensEmProcesso', auth, JovensController.buscarJovensEmProcesso);

routes.post('/jovens', auth, JovensController.create);
routes.post('/update1/:id', auth, upload.single('calendario'), JovensController.update1);
routes.post('/update2/:id', auth, JovensController.update2);

routes.post('/anotacoes/:id', auth, JovensController.createNote);
routes.post('/finalizarAdmissao/:id', auth, JovensController.finalizarAdmissao);

routes.get('/empresas', auth, EmpresasController.index);
routes.post('/empresas', auth, EmpresasController.create);

routes.post('/deletarAdmissao/:id', auth, JovensController.deletarAdmissao);

export default routes;