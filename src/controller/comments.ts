import { Request, Response } from "express";
import { commentsService } from "../service/comments";
import svgCaptcha from 'svg-captcha';

class CommentsController {
  captcha: string;

  constructor(captcha: string) {
    this.captcha = captcha;
  }

  async addComment(req: Request, res: Response) {
    const comment = await commentsService.createComment(req.body);
    
    res.statusCode = 200;
    res.json(comment);
  };

  async getComment(req: Request, res: Response) {
    const { commentId } = req.params;

    const comment = await commentsService.getOne(+commentId);

    if (!comment) {
      res.statusCode = 404;

      return;
    }

    res.statusCode = 200;
    res.json(comment);
  }

  async getComments(req: Request, res: Response) {
    const comment = await commentsService.getAll();

    if (!comment) {
      res.statusCode = 404;

      return;
    }

    res.statusCode = 200;
    res.json(comment);
  }

  getCaptcha(req: Request, res: Response) {
    const options = {
      size: 6,
      noise: 10,
    }
    const captcha = svgCaptcha.create(options);
    this.captcha = captcha.text;

    res.status(200).send({ data: captcha.data });
  }

  checkCaptcha(req: Request, res: Response) {
    const { value } = req.query;

    if (value === this.captcha) {
      res.json(true);
    }

    res.json(false);
  }
}

export const commentsController = new CommentsController('');
