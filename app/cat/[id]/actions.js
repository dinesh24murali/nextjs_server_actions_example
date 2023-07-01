"use server";

import { revalidatePath } from "next/cache";

import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

pb.admins.authWithPassword("samfuller3477@gmail.com", "smallerThan12");

export async function likeCat(id, currentCount) {
  await pb.collection("Cats").update(id, {
    like: parseInt(currentCount) + 1,
  });
  revalidatePath(`/cat/${id}`);
}
