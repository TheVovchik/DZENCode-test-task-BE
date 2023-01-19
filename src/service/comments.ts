import { Rating } from "src/types/Rating";
import { Comments } from "../model/comments";

class CommentsService {
  async createComment(data: any) {
    const comment = await Comments.create({ ...data });

    if (comment.id && comment.prevId) {
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

  async patchOne(commentId: number, data: Rating) {
    const thisComment = await this.getOne(commentId);
    let thisVoted: string[] = [];

    if (thisComment) {
      thisVoted = thisComment.voted;
      thisVoted.push(data.ip);
    }

    const comment = await Comments.update({ rating: data.rating, voted: thisVoted}, {
      where: {
        id: commentId,
      },
    })

    return comment;
  }
}

export const commentsService = new CommentsService();
