import { db } from "@/Firebase/firebaseClient";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "our_study_says"));

    const querySnapshot = await getDocs(q);
    const studySaysData = querySnapshot.docs.map((doc) => doc.data());

    return NextResponse.json({ studySaysData });
  } catch (error: any) {
    console.error("Error fetching 'our_study_says' data:", error);
    return NextResponse.json(
      { error: `Failed to fetch 'our_study_says' data: ${error.message}` },
      { status: 500 }
    );
  }
}
