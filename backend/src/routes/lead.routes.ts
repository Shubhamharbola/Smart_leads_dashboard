import { Router } from 'express'
import { createLead, getLeads, getLead, updateLead, deleteLead } from '../controllers/lead.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

router.use(protect)

router.post('/', createLead)
router.get('/', getLeads)
router.get('/:id', getLead)
router.put('/:id', updateLead)
router.delete('/:id', deleteLead)

export default router