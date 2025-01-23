import { Router } from 'express';
import AlunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', AlunoController.index);
router.post('/store', loginRequired, AlunoController.store);
router.put('/update/:id', loginRequired, AlunoController.update);
router.get('/:id', loginRequired, AlunoController.show);
router.delete('/:id', loginRequired, AlunoController.delete);

export default router;
