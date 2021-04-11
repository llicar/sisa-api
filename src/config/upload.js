import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import md5 from 'md5';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storageTypes ={
    
    local: multer.diskStorage({
        destination: path.join(__dirname,'..','..','uploads'),
        filename:(request,file,cb) =>{

                const {id} = request.params;
                const type = file.originalname.split(".");
                const md5Name = md5(file.originalname);
                file.key = `${id}-${md5Name}.${type[1]}`;
                cb(null,file.key);
        }
    }),

    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'scja/calendarios',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl:'public-read',
        key: (request,file,cb) =>{
                const {id} = request.params;
                const type = file.originalname.split(".");
                const md5Name = md5(file.originalname);
                const filename = `${id}-${md5Name}.${type[1]}`;
                cb(null,filename);
        }
    })
}

const multerConfig = {
    storage: storageTypes["s3"]
}


export default multerConfig;