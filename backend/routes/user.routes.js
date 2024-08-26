import express from 'express'
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/user.controller.js'
import { authorize, protect } from '../middlewares/auth.js'



const router = express.Router()

router.post('/createUser',protect,authorize('admin'),createUser)
router.get('/',protect,authorize('admin'),getAllUsers)
router.get('/:id',getUserById)
router.put('/update/:id',protect,authorize('admin'),updateUserById)
router.delete('/delete/:id',protect,authorize('admin'),deleteUserById)


export default router