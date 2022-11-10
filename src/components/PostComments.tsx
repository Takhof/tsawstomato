import React, { ReactElement } from "react";
import { Comment } from "../API";

interface Props {
  comment: Comment;
}

export default function PostComments({ comment }: Props): ReactElement {
  console.log("comment:", comment);
  return <div>{comment.content}</div>;
}
