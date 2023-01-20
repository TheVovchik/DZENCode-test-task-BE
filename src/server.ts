import express from 'express';
import cors from 'cors';
import { commentsController } from './controller/comments';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../package.json';

const options: swaggerJsdoc.Options = {
  apis: ["./src/server.ts"],
  definition: {
    info: {
      title: "REST API docs",
      version
    },
  }
};

const swaggerSpec = swaggerJsdoc(options);

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use('/v1/data', router);
app.use('/v1/static', express.static('public'));

app.get('/v1/static', (req, res) => {
  res.sendFile('/pubic/index.html')
})

app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
})

router.get('/', commentsController.getComments);
router.get('/captcha', commentsController.getCaptcha);
router.get('/:commentId', commentsController.getComment);
router.post('/', commentsController.addComment);
router.patch('/:commentId', commentsController.patchComment);

app.listen(5000, () => {
  console.log('server is running');
});
