import multer  from "multer";

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`)
    }
});

export const FileUpload = multer({ storage: fileStorage }).single('file');