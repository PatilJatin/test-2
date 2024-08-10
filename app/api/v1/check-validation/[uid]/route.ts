import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/Firebase/firebaseClient";

// Define the GET handler for the route
export async function GET(
  req: Request,
  { params }: { params: { uid: string } }
) {
  // Extract the UID from the URL query parameters

  const { uid } = params;

  if (!uid) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Access Firestore to check if the user is validated
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().isValidated) {
      // User is validated
      return NextResponse.json({ isValidated: true });
    } else {
      // User is not validated
      return NextResponse.json({ isValidated: false });
    }
  } catch (error) {
    console.error("Error checking validation:", error);
    return NextResponse.json(
      { error: "Failed to check validation" },
      { status: 500 }
    );
  }
}
