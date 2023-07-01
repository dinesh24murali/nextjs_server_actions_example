"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { likeCat } from "./actions";

export default function LikeOptimistic({ id, record }) {
  let [optimisticLikes, addOptimisticLikes] = useOptimistic(
    { likeCount: record?.like, sending: false },
    (state, newLikeCount) => ({
      ...state,
      likeCount: newLikeCount,
      sending: true,
    })
  );

  return (
    <div>
      <div>
        OptimisticLikes: <h3>{optimisticLikes.likeCount}</h3>
        {optimisticLikes.sending ? "sending..." : ""}
      </div>
      <button
        type="button"
        onClick={async () => {
          addOptimisticLikes(optimisticLikes.likeCount + 1);
          await likeCat(id, record?.like);
        }}
      >
        Like
      </button>
    </div>
  );
}
