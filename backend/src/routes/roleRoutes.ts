import { Router } from 'express';
import { getAllRoles, addRole, updateRole, deleteRole } from '../controllers/roleController';

const router = Router();

router.get('/', getAllRoles);
router.post('/', addRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

export default router;
