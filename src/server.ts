import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { commentsController } from './controller/comments';

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/data', router);

router.get('/', commentsController.getComments);
router.get('/captcha', commentsController.getCaptcha);
router.get('/:commentId', commentsController.getComment);
router.post('/', commentsController.addComment);

app.listen(5000, () => (
  console.log('server is running')
))
