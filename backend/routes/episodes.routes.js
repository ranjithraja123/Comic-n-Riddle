import express from 'express'
import upload from '../Multer/multerConfig.js'
import { deleteEntireData, getAllComicPage, getPageById, imgdeletePageById, pdfdeletePageById, updateComicPage, uploadComicPage } from '../controllers/page.controllers.js'
import { authorize, protect } from '../middlewares/auth.js'
// import { addComic } from '../controllers/comic.controllers.js';
// import upload from '../Multer/multerConfig.js';
// import { login, logout, register } from '../controllers/auth.controllers.js'



const router = express.Router()

// router.post('/register',register)

// router.post('/upload',upload.single('coverImage'),addComic);

router.post('/upload/:comicBookId',protect,authorize('admin'), upload.fields([{name:'pdfFiles',maxCount:1},{ name: 'images', maxCount: 10 }]),uploadComicPage)
router.get('/',getAllComicPage)
router.get('/:id',getPageById)
router.put('/:comicBookId',protect,authorize('admin'),upload.fields([{ name: 'pdfFiles', maxCount: 10 }, { name: 'images', maxCount: 10 }]),updateComicPage)
router.delete('/:comicBookId/images/:imageId',protect,authorize('admin'), imgdeletePageById);
router.delete('/:comicBookId/pdfs/:pdfId',protect,authorize('admin'), pdfdeletePageById);
router.delete('/:id',protect,authorize('admin'), deleteEntireData);






export default router