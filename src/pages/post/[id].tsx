import React, { ReactElement, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { PostAddSharp, QueryBuilderSharp } from "@material-ui/icons";
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
  console.log("POSTS", post);
  const [comments, setComments] = useState<Comment[]>(
    post.comments.items as Comment[]
  );

  console.log("COMMENTS", comments);
  return (
    <Container maxWidth="md">
      <>
        <PostPreview post={post}></PostPreview>
        <>{comments}</>
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

  console.log("THIS IS QUERY", postsQuery.data.getPost.comments);

  return {
    props: {
      post: postsQuery.data.getPost as Post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext();

  const response = (await SSR.API.graphql({ query: listPosts })) as {
    data: ListPostsQuery;
    errors: any[];
  };

  const paths = response.data.listPosts?.items.map((post) => ({
    params: { id: post?.id },
  }));

  return { paths, fallback: "blocking" };
};
