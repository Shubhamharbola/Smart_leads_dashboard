import { Router } from 'express'
import { createLead, getLeads, getLead, updateLead, deleteLead } from '../controllers/lead.controller'
import { protect } from '../middleware/auth.middleware'
import { authorizeRoles } from '../middleware/role.middleware'
const router = Router()

router.use(protect)

router.post('/', authorizeRoles('admin', 'sales'), createLead)
router.get('/', authorizeRoles('admin', 'sales'), getLeads)
router.get('/:id', authorizeRoles('admin', 'sales'), getLead)
router.put('/:id', authorizeRoles('admin', 'sales'), updateLead)
router.delete('/:id', authorizeRoles('admin'), deleteLead)
export default router