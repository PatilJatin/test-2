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

type WeirdNewsItem = {
  headline: string;
  bodytext: string;
};

export async function POST(req: NextRequest) {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "weird_news"));

    // Fetch existing documents of type 'weird_news'
    const querySnapshot = await getDocs(q);

    // Delete existing documents
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    console.log("Existing weird_news data deleted.");

    // Parse the request body
    const reqBody = await req.json();
    const { newData }: { newData: WeirdNewsItem[] } = reqBody;
    console.log(newData);

    // Store new data in Firestore
    const addPromises = newData.map((item, index) => {
      const docRef = doc(itemsRef, `weird_news_${index}`);
      const data = {
        type: "weird_news",
        headline: item.headline,
        bodytext: item.bodytext,
        date: new Date().toISOString().split("T")[0],
      };
      console.log(`Saving document with ID: ${docRef.id}`);
      return setDoc(docRef, data);
    });

    await Promise.all(addPromises);

    console.log("New weird_news data saved successfully.");
    return NextResponse.json({
      message: "weird_news data updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating weird_news data:", error);
    return NextResponse.json(
      {
        error: `Failed to update weird_news data: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "weird_news"));

    // Fetch documents of type 'weird_news'
    const querySnapshot = await getDocs(q);
    const news = querySnapshot.docs.map((doc) => doc.data());

    console.log("Fetched weird_news:", news);

    return NextResponse.json({ news });
  } catch (error: any) {
    console.error("Error fetching weird_news:", error);
    return NextResponse.json(
      { error: `Failed to fetch weird_news: ${error.message}` },
      { status: 500 }
    );
  }
}
