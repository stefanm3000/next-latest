import { getComments } from "../actions";
import { CommentForm } from "./comment-form";
import { UpvoteButton } from "./upvote-button";
import { ViewTransition } from "react";

export async function BlogComments({ postId }: { postId: string }) {
  const comments = await getComments(postId);

  return (
    <div className="flex flex-col gap-4 relative border border-white/10 rounded-md p-2">
      <div className="flex justify-between">
        {comments?.length ? (
          <p>Top comments</p>
        ) : (
          <p className="text-center mx-auto">
            No comments here yet, be the first one!
          </p>
        )}
      </div>

      <ViewTransition>
        <div className="flex flex-col gap-2">
          {comments?.map((comment) => (
            <ViewTransition key={comment._id} name={comment._id}>
              <div className="flex flex-col border border-white/10 rounded-md p-2 bg-white/5">
                <div className="flex justify-between">
                  <div className="text-xs text-gray-400">
                    {new Date(comment._creationTime).toLocaleDateString()}
                  </div>

                  <UpvoteButton
                    commentId={comment._id}
                    postId={postId}
                    likes={comment.likes}
                  />
                </div>
                <p>{comment.text}</p>
              </div>
            </ViewTransition>
          ))}
        </div>
      </ViewTransition>

      <CommentForm postId={postId} />
    </div>
  );
}
