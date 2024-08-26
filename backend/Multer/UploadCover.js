import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'../uploads');
    },
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}-${file.orginalname}`);
    }
})


const upload = multer({storage});


export const uploadCoverImage = upload.single('coverImage')