import { db } from "@/Firebase/firebaseClient";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

type NewMusicItem = {
  Position: string;
  Title: string;
  Artist: string;
};

export async function POST(req: NextRequest) {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "new_music"));

    // Fetch existing documents of type 'new_music'
    const querySnapshot = await getDocs(q);

    // Delete existing documents
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    console.log("Existing new_music data deleted.");

    // Parse the request body
    const reqBody = await req.json();
    const { newData }: { newData: NewMusicItem[] } = reqBody;
    console.log(newData);

    // Store new data in Firestore
    const addPromises = newData.map((item, index) => {
      const docRef = doc(itemsRef, `new_music_${index}`);
      const data = {
        type: "new_music",
        title: item.Title,
        artist: item.Artist,
        position: item.Position,
        date: new Date().toISOString().split("T")[0],
      };
      console.log(`Saving document with ID: ${docRef.id}`);
      return setDoc(docRef, data);
    });

    await Promise.all(addPromises);

    console.log("New new_music data saved successfully.");
    return NextResponse.json({
      message: "new_music data updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating new_music data:", error);
    return NextResponse.json(
      { error: `Failed to update new_music data: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "new_music"));

    // Fetch documents of type 'top_songs'
    const querySnapshot = await getDocs(q);

    // Extract the data
    const new_music = querySnapshot.docs.map((doc) => doc.data());

    // Return the data as JSON
    return NextResponse.json({ new_music });
  } catch (error: any) {
    console.error("Error fetching new_music data:", error);
    return NextResponse.json(
      { error: `Failed to fetch new_music data: ${error.message}` },
      { status: 500 }
    );
  }
}
