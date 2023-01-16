import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

const app = express();
const router = express.Router();
const tabletsRouter = express.Router();

app.use(cors());
app.use(express.json());

app.use('/.netlify/functions/server/comments', router);

app.get('/.netlify/functions/server', (req, res) => {
  res.send("server is running");
});

// router.get('/:phoneId', phonesDescriptionController.getDescription);
// router.get('/', phonesController.getPhones);

app.use('/.netlify/functions/server/tablets', tabletsRouter)

// tabletsRouter.get('/', tabletsController.getTablets);

export const handler = serverless(app);