const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"content")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
});

const upload = multer({
    storage:storage,
    limits:{fileSize:10000*100},
    fileFilter:(req,file,cb)=>{
        const fileTypes = /jpg|png|gif|mp4/;
        // const mimeTypes = fileTypes.test(file.mimeType);
        // const extname = fileTypes.test(path.extname(file.originalname));
        // if (mimeTypes  && extname){
            
        // }
        return cb(null,true);
        cb("only images supported");

    }
}).single("content");

module.exports = upload ;


