import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/Firebase/firebaseClient"; // Adjust the import based on your project structure

export async function GET(req: NextRequest) {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "guess_the_movie_quote"));

    const querySnapshot = await getDocs(q);
    const quotes = querySnapshot.docs.map((doc) => doc.data());

    return NextResponse.json({
      guessTheMovieQuote: quotes,
    });
  } catch (error: any) {
    console.error("Error fetching guess_the_movie_quote:", error);
    return NextResponse.json(
      { error: `Failed to fetch guess_the_movie_quote: ${error.message}` },
      { status: 500 }
    );
  }
}
