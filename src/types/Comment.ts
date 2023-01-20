/**
 * @openapi
 * components:
 *  schemas:
 *    CreateComment:
 *      type: object
 *      required:
 *        - postId
 *        - prevId
 *        - rating
 *        - userName
 *        - email
 *        - text
 *        - votes
 *      properties:
 *        postId:
 *          type: number
 *          default: 1
 *        prevId:
 *          type: number | null
 *          default: null
 *        rating:
 *          type: number
 *          default: 0
 *        userName:
 *          type: string
 *          default: JohnDoe
 *        email
 *          type: string
 *          default: john_doe@gmail.com
 *        text
 *          type: string
 *          default: some new text
 *        votes
 *          type: array of string
 *          default: []
 */


export interface Comment {
  postId: number,
  prevId: number | null,
  rating: number,
  userName: string,
  email: string,
  homepage: string | null,
  text: string,
  nextIds: number[] | null,
  votes: string[],
}

export interface CommentDB extends Comment {
  id?: number,
  createdAt?: Date;
  updatedAt?: Date;
}
