export interface Comment {
  postId: number,
  prevId: number | null,
  userName: string,
  email: string,
  homepage: string | null,
  text: string,
  nextId: number[] | null,
}

export interface CommentDB extends Comment {
  id?: number,
  createdAt?: Date;
  updatedAt?: Date;
}
