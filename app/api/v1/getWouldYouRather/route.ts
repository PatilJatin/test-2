import { db } from "@/Firebase/firebaseClient";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "would_you_rather"));

    // Fetch documents of type 'impossible_trivia'
    const querySnapshot = await getDocs(q);

    // Extract the data (assuming only one trivia entry exists)
    const would_you_rather = querySnapshot.docs.map((doc) => doc.data());

    // Return the data as JSON
    return NextResponse.json({ would_you_rather });
  } catch (error: any) {
    console.error("Error fetching would_you_rather data:", error);
    return NextResponse.json(
      { error: `Failed to fetch would_you_rather data: ${error.message}` },
      { status: 500 }
    );
  }
}
