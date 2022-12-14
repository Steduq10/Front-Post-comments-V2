export type Post = {
  id:string,
  author: string,
  title: string,
  comments: CommentType[]
}

export type CommentType = {
  id:string,
  postId: string,
  author: string,
  content: string
}

export type CreatePostCommand = {
  postId: string,
  title: string,
  author: string
}

export type AddCommentCommand = {
  postId: string,
  commentId: string,
  author: string,
  content: string
}

export type Token = {
  token: string
}
