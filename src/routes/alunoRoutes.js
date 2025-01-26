import { Router } from 'express';
import AlunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, AlunoController.index);
router.post('/store', loginRequired, AlunoController.store);
router.post('/pesquisa', loginRequired, AlunoController.pesquisa);
router.put('/update/:id', loginRequired, AlunoController.update);
router.get('/:id', loginRequired, AlunoController.show);
router.delete('/:id', loginRequired, AlunoController.delete);

export default router;
