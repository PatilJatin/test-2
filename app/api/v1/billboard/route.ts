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

type BillboardItem = {
  Position: string;
  Title: string;
  Artist: string;
};

export async function POST(req: NextRequest) {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "billboard"));

    // Fetch existing documents of type 'billboard'
    const querySnapshot = await getDocs(q);

    // Delete existing documents
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    console.log("Existing billboard data deleted.");

    // Parse the request body
    const reqBody = await req.json();
    const { newData }: { newData: BillboardItem[] } = reqBody;
    console.log(newData);

    // Store new data in Firestore
    const addPromises = newData.map((item, index) => {
      const docRef = doc(itemsRef, `billboard_${index}`);
      const data = {
        type: "billboard",
        title: item.Title,
        artist: item.Artist,
        position: item.Position,
        date: new Date().toISOString().split("T")[0],
      };
      console.log(`Saving document with ID: ${docRef.id}`);
      return setDoc(docRef, data);
    });

    await Promise.all(addPromises);

    console.log("New billboard data saved successfully.");
    return NextResponse.json({
      message: "billboard data updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating billboard data:", error);
    return NextResponse.json(
      { error: `Failed to update billboard data: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "billboard"));

    // Fetch documents of type 'billboard'
    const querySnapshot = await getDocs(q);

    // Extract the data
    const topSongs = querySnapshot.docs.map((doc) => doc.data());

    // Return the data as JSON
    return NextResponse.json({ topSongs });
  } catch (error: any) {
    console.error("Error fetching billboard data:", error);
    return NextResponse.json(
      { error: `Failed to fetch billboard data: ${error.message}` },
      { status: 500 }
    );
  }
}
