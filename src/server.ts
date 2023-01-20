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
    openapi: "3.0.0",
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

/**
 * @openapi
 * /captcha:
 *   get:
 *      tag:
 *        - Captcha
 *        summary: generate captcha object
 *        description: generate captcha object with two fields: text of captcha and svg picture
 *        responses:
 *          200:
 *            description: Success
 *            content: 
 *              application/json:
 *                 schema:
 *                    CaptchaResponse: 
 *                      type: object
 *                      properties:
 *                        text: string
 *                        data: string
 *  
*/
router.get('/captcha', commentsController.getCaptcha);

router.get('/', commentsController.getComments);
router.get('/:commentId', commentsController.getComment);
router.post('/', commentsController.addComment);

/**
 * @openapi
 * /:commentId:
 *   patch:
 *      tag:
 *        - comment
 *        summary: update rating and voted list
 *        description: update rating and voted list by comment ID
 *        requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                 schema:
 *                    RatingUpdate: 
 *                      type: object
 *                      properties:
 *                        rating: number
 *                        newVoted: array of strings
 *        responses:
 *          200:
 *            description: Success
 *            content: 
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/types/CreateComment'
 *          404:
 *            description: Entity doesn't exist
 *  
*/
router.patch('/:commentId', commentsController.patchComment);

app.listen(5000, () => {
  console.log('server is running');
});
