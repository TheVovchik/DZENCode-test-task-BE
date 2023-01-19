import express from 'express';
import cors from 'cors';
import { commentsController } from './controller/comments';

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use('/data', router);

app.get('/v1', (req, res) => {
  res.sendFile('/pubic/index.html')
})
router.get('/', commentsController.getComments);
router.get('/captcha', commentsController.getCaptcha);
router.get('/:commentId', commentsController.getComment);
router.post('/', commentsController.addComment);
router.patch('/:commentId', commentsController.patchComment);

app.listen(5000, () => (
  console.log('server is running')
))
