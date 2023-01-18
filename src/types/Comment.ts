export interface Comment {
  postId: number,
  prevId: number | null,
  rating: number,
  userName: string,
  email: string,
  homepage: string | null,
  text: string,
  nextId: number[] | null,
  voted: string[],
}

export interface CommentDB extends Comment {
  id?: number,
  createdAt?: Date;
  updatedAt?: Date;
}
