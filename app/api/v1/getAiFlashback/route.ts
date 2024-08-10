import { NextResponse } from "next/server";
import { db } from "@/Firebase/firebaseClient";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "ai_flashback"));
    const querySnapshot = await getDocs(q);

    const aiFlashbackData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return NextResponse.json({ aiFlashbackData });
  } catch (error: any) {
    console.error("Error fetching ai_flashback data:", error);
    return NextResponse.json(
      { error: `Failed to fetch ai_flashback data: ${error.message}` },
      { status: 500 }
    );
  }
}
