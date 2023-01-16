import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { commentsController } from './controller/comments';

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

app.use('/.netlify/functions/server/comments', router);

app.get('/.netlify/functions/server', (req, res) => {
  res.send("server is running");
});

router.get('/:phoneId', commentsController.getComment);
router.get('/', commentsController.getComments);
router.post('/', commentsController.addComment);

export const handler = serverless(app);