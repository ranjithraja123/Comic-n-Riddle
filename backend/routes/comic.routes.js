import express from 'express'
import { addComic, deleteById, getComic, getComicById, updateComicById } from '../controllers/comic.controllers.js';
import upload from '../Multer/multerConfig.js';
import { authorize, protect } from '../middlewares/auth.js';
// import { login, logout, register } from '../controllers/auth.controllers.js'



const router = express.Router()

// router.post('/register',register)

router.post('/upload',protect,authorize('admin'),upload.single('coverImage'),addComic);
router.get('/',getComic);
router.get('/:id',getComicById);
router.put('/:id',protect,authorize('admin'),upload.single('coverImage'),updateComicById);
router.delete('/:id',protect,authorize('admin'),deleteById)






export default router