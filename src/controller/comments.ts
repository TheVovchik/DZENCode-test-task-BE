import { Request, Response } from "express";
import { commentsService } from "src/service/comments";

class CommentsController {
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
}

export const commentsController = new CommentsController();
