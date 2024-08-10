import { db } from "@/Firebase/firebaseClient";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "today_in_history"));

    // Fetch documents of type 'today_in_history'
    const querySnapshot = await getDocs(q);

    // Extract the data (assuming only one entry exists)
    const historyData = querySnapshot.docs.map((doc) => doc.data());

    // Return the data as JSON
    return NextResponse.json({ historyData });
  } catch (error: any) {
    console.error("Error fetching today_in_history data:", error);
    return NextResponse.json(
      { error: `Failed to fetch today_in_history data: ${error.message}` },
      { status: 500 }
    );
  }
}
