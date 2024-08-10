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

type EntertainmentHeadlineItem = {
  headline: string;
  bodytext: string;
};

export async function POST(req: NextRequest) {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "entertainment_headlines"));

    // Fetch existing documents of type 'entertainment_headlines'
    const querySnapshot = await getDocs(q);

    // Delete existing documents
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    console.log("Existing entertainment_headlines data deleted.");

    // Parse the request body
    const reqBody = await req.json();
    const { newData }: { newData: EntertainmentHeadlineItem[] } = reqBody;
    console.log(newData);

    // Store new data in Firestore
    const addPromises = newData.map((item, index) => {
      const docRef = doc(itemsRef, `entertainment_headline_${index}`);
      const data = {
        type: "entertainment_headlines",
        headline: item.headline,
        bodytext: item.bodytext,
        date: new Date().toISOString().split("T")[0],
      };
      console.log(`Saving document with ID: ${docRef.id}`);
      return setDoc(docRef, data);
    });

    await Promise.all(addPromises);

    console.log("New entertainment_headlines data saved successfully.");
    return NextResponse.json({
      message: "entertainment_headlines data updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating entertainment_headlines data:", error);
    return NextResponse.json(
      {
        error: `Failed to update entertainment_headlines data: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "entertainment_headlines"));

    // Fetch documents of type 'entertainment_headlines'
    const querySnapshot = await getDocs(q);
    const headlines = querySnapshot.docs.map((doc) => doc.data());

    console.log("Fetched entertainment_headlines:", headlines);

    return NextResponse.json({ headlines });
  } catch (error: any) {
    console.error("Error fetching entertainment_headlines:", error);
    return NextResponse.json(
      { error: `Failed to fetch entertainment_headlines: ${error.message}` },
      { status: 500 }
    );
  }
}
