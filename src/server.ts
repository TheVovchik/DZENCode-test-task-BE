import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { commentsController } from './controller/comments';

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use('/.netlify/functions/server/data', router);

router.get('/', commentsController.getComments);
router.get('/:commentId', commentsController.getComment);
router.post('/', commentsController.addComment);

export const handler = serverless(app);