import { db } from "@/Firebase/firebaseClient";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "impossible_trivia"));

    // Fetch documents of type 'impossible_trivia'
    const querySnapshot = await getDocs(q);

    // Extract the data (assuming only one trivia entry exists)
    const triviaData = querySnapshot.docs.map((doc) => doc.data());

    // Return the data as JSON
    return NextResponse.json({ triviaData });
  } catch (error: any) {
    console.error("Error fetching impossible_trivia data:", error);
    return NextResponse.json(
      { error: `Failed to fetch impossible_trivia data: ${error.message}` },
      { status: 500 }
    );
  }
}
