import { Comments } from "src/model/comments";
import { Comment } from "src/types/Comment";

class CommentsService {
  async createComment(data: Comment) {
    const comment = await Comments.create({ ...data });

    if (comment.id) {
      await this.appendComment(comment.prevId, comment.id);
    }

    return comment;
  }

  async appendComment(thisId: number, nextId: number) {
    const previous = await this.getOne(thisId);

    if (previous) {
      let newNext = [nextId];

      if (previous.nextId) {
        newNext = previous.nextId;
        newNext.push(nextId);
      }
      

      await Comments.update({ nextId: newNext }, {
        where: {
          id: thisId,
        },
      })
    }
  }

  async getOne(commentId: number) {
    const comment = await Comments.findByPk(commentId);

    return comment;
  }

  async getAll() {
    const comments = await Comments.findAll();

    return comments;
  }
}

export const commentsService = new CommentsService();
