import Link from "next/link";
import PocketBase from "pocketbase";

import { addCat } from "./actions";

const pb = new PocketBase("http://127.0.0.1:8090");

pb.admins.authWithPassword("samfuller3477@gmail.com", "smallerThan12");

export default async function Home() {
  const records = await pb.collection("Cats").getFullList();

  return (
    <div className="container">
      <div className="cat-container">
        <h2 className="cat-title">Add cat:</h2>
        <form action={addCat} className="cat-form">
          <input type="text" name="name" />
          <input type="text" name="breed" />
          <button type="submit">submit</button>
        </form>
      </div>
      <table className="cat-container cat-table">
        {records && records.length > 0 && (
          <tr>
            <th>Name</th>
            <th>Breed</th>
            <th>like</th>
            <th></th>
          </tr>
        )}
        {records && records.length > 0 ? (
          <>
            {records.map((cat, index) => {
              return (
                <tr key={`cat-${index}`}>
                  <td>{cat.name}</td>
                  <td>{cat.breed}</td>
                  <td>{cat.like}</td>
                  <td>
                    <Link href={`cat/${cat.id}`} className="cat-link">
                      edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </>
        ) : (
          <tr>
            <td className="cat-empty">No cats in the bag</td>
          </tr>
        )}
      </table>
    </div>
  );
}
