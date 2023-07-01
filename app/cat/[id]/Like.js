"use client";

import { useTransition } from "react";
import { likeCat } from "./actions";

export default function Like({ id, record }) {
  let [isPending, startTransition] = useTransition();

  return (
    <button formAction={() => startTransition(() => likeCat(id, record?.like))}>
      {record?.like}&nbsp;Like
    </button>
  );
}
