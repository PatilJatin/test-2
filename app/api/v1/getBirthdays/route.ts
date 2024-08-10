import { db } from "@/Firebase/firebaseClient";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "birthdays"));

    // Fetch documents of type 'birthdays'
    const querySnapshot = await getDocs(q);

    // Extract the data (assuming only one entry exists)
    const birthdayData = querySnapshot.docs.map((doc) => doc.data());

    // Return the data as JSON
    return NextResponse.json({ birthdayData });
  } catch (error: any) {
    console.error("Error fetching birthdays data:", error);
    return NextResponse.json(
      { error: `Failed to fetch birthdays data: ${error.message}` },
      { status: 500 }
    );
  }
}
