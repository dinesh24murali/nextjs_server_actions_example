import { redirect } from "next/navigation";
import PocketBase from "pocketbase";
import Like from "./Like";
import LikeOptimistic from "./LikeOptimistic";

const pb = new PocketBase("http://127.0.0.1:8090");

pb.admins.authWithPassword("samfuller3477@gmail.com", "smallerThan12");

export default async function Edit({ params }) {
  const record = await pb.collection("Cats").getOne(params.id);

  async function editCat(data) {
    "use server";

    await pb.collection("Cats").update(params.id, data);
    redirect("/cat");
  }

  return (
    <div className="container">
      <div className="cat-container">
        <h2 className="cat-title">Edit cat:</h2>
        <form action={editCat} className="cat-form">
          <input type="text" name="name" defaultValue={record?.name} />
          <input type="text" name="breed" defaultValue={record?.breed} />
          <button type="submit">Update</button>
          <Like id={params.id} record={record} />
          <LikeOptimistic id={params.id} record={record} />
        </form>
      </div>
    </div>
  );
}
