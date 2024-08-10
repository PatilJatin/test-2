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

type TopSongItem = {
  Position: string;
  Title: string;
  Artist: string;
};

export async function POST(req: NextRequest) {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "top_songs"));

    // Fetch existing documents of type 'top_songs'
    const querySnapshot = await getDocs(q);

    // Delete existing documents
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    console.log("Existing top_songs data deleted.");

    // Parse the request body
    const reqBody = await req.json();
    const { newData }: { newData: TopSongItem[] } = reqBody;
    console.log(newData);

    // Store new data in Firestore
    const addPromises = newData.map((item, index) => {
      const docRef = doc(itemsRef, `top_songs_${index}`);
      const data = {
        type: "top_songs",
        title: item.Title,
        artist: item.Artist,
        position: item.Position,
        date: new Date().toISOString().split("T")[0],
      };
      console.log(`Saving document with ID: ${docRef.id}`);
      return setDoc(docRef, data);
    });

    await Promise.all(addPromises);

    console.log("New top_songs data saved successfully.");
    return NextResponse.json({
      message: "top_songs data updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating top_songs data:", error);
    return NextResponse.json(
      { error: `Failed to update top_songs data: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "top_songs"));

    // Fetch documents of type 'top_songs'
    const querySnapshot = await getDocs(q);

    // Extract the data
    const topSongs = querySnapshot.docs.map((doc) => doc.data());

    // Return the data as JSON
    return NextResponse.json({ topSongs });
  } catch (error: any) {
    console.error("Error fetching top_songs data:", error);
    return NextResponse.json(
      { error: `Failed to fetch top_songs data: ${error.message}` },
      { status: 500 }
    );
  }
}
