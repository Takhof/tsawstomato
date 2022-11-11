import React, { ReactElement, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { API, withSSRContext } from "aws-amplify";
import { listPosts, getPost } from "../../graphql/queries";
import { GetPostQuery, ListPostsQuery, Post } from "../../API";
import PostPreview from "../../components/PostPreview";
import { Container } from "@mui/material";
import PostComments from "../../components/PostComments";

interface Props {
  post: Post;
}

export default function Posts({ post }: Props): ReactElement {
  const [comments, setComments] = useState<Comment[]>(post.comments?.items);
  return (
    <Container maxWidth="md">
      <>
        <PostPreview post={post}></PostPreview>
        {post.comments.items.map((comment) => (
          <PostComments key={comment.postID} comment={comment} />
        ))}
      </>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postsQuery = (await API.graphql({
    query: getPost,
    variables: {
      id: params?.id,
    },
  })) as { data: GetPostQuery };
  return {
    props: {
      post: postsQuery.data.getPost as Post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = (await API.graphql({ query: listPosts })) as {
    data: ListPostsQuery;
    errors: any[];
  };

  const paths = response.data.listPosts?.items.map((post) => ({
    params: { id: post?.id },
  }));

  return { paths, fallback: "blocking" };
};
