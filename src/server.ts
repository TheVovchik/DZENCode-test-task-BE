import express from 'express';
import cors from 'cors';
// import swaggerUi from 'swagger-ui-express';
import { commentsController } from './controller/comments';

// const swaggerDocument = require('./swagger.json');
const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use('/v1/data', router);
app.use('/v1/static', express.static('public'));
// app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/v1/static', (req, res) => {
  res.sendFile('/pubic/index.html')
})

router.get('/', commentsController.getComments);
router.get('/captcha', commentsController.getCaptcha);
router.get('/:commentId', commentsController.getComment);
router.post('/', commentsController.addComment);
router.patch('/:commentId', commentsController.patchComment);

app.listen(5000, () => (
  console.log('server is running')
));
