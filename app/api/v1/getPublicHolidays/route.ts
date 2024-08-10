import { db } from "@/Firebase/firebaseClient";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "public_holidays"));

    // Fetch documents of type 'impossible_trivia'
    const querySnapshot = await getDocs(q);

    // Extract the data (assuming only one trivia entry exists)
    const public_holidays = querySnapshot.docs.map((doc) => doc.data());

    // Return the data as JSON
    return NextResponse.json({ public_holidays });
  } catch (error: any) {
    console.error("Error fetching public_holidays data:", error);
    return NextResponse.json(
      { error: `Failed to fetch public_holidays data: ${error.message}` },
      { status: 500 }
    );
  }
}
