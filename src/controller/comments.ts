import { Request, Response } from "express";
import { commentsService } from "../service/comments";
import formidable from 'formidable';
import svgCaptcha from 'svg-captcha';

class CommentsController {
  async addComment(req: Request, res: Response) {
    const form = formidable({ });

    form.parse(req, async (err, fields, _files) => {
      if (err) {
        return;
      }
      const comment = await commentsService.createComment(fields);

      res.statusCode = 200;
      res.json(comment);
    });
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

    res.status(200).send(captcha);
  }
}

export const commentsController = new CommentsController();
