
import Router from 'express';
import JovensController from './app/controllers/JovensController.js';
import EmpresasController from './app/controllers/EmpresasController.js';
import multer from 'multer';

import multerConfig from './config/upload.js';

const routes = Router();
const upload = multer(multerConfig);

routes.get('/jovens', JovensController.index);
routes.get('/jovem/:id', JovensController.show);
routes.get('/anotacoes/:id', JovensController.showNotes);
routes.get('/jovensEmProcesso', JovensController.buscarJovensEmProcesso);

routes.post('/jovens', JovensController.create);
routes.post('/update1/:id', upload.single('calendario'), JovensController.update1);
routes.post('/update2/:id', JovensController.update2);

routes.post('/anotacoes/:id', JovensController.createNote);
routes.post('/updateEtapa/:id', JovensController.updateEtapa);



routes.get('/empresas', EmpresasController.index);
routes.post('/empresas', EmpresasController.create);

export default routes;