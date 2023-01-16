import express from 'express';
import cors from 'cors';
import { commentsController } from './controller/comments';

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use('/data', router);

router.get('/', commentsController.getComments);
router.get('/:commentId', commentsController.getComment);
router.post('/', commentsController.addComment);

app.listen(5000, () => (
  console.log('server is running')
))
