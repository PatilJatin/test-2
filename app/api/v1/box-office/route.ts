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

type WeeklyBoxOfficeItem = {
  Position: number;
  Title: string;
  "Weekend Gross": string;
  "Total Gross": string;
  "Weeks Released": number;
};

export async function POST(req: NextRequest) {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "weekly_box_office"));

    // Fetch existing documents of type 'weekly_box_office'
    const querySnapshot = await getDocs(q);

    // Delete existing documents
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    console.log("Existing weekly_box_office data deleted.");

    // Parse the request body
    const reqBody = await req.json();
    const { newData }: { newData: WeeklyBoxOfficeItem[] } = reqBody;
    console.log(newData);

    // Store new data in Firestore
    const addPromises = newData.map((item, index) => {
      const docRef = doc(itemsRef, `weekly_box_office_${index}`);
      const data = {
        type: "weekly_box_office",
        position: item.Position,
        title: item.Title,
        weekendGross: item["Weekend Gross"],
        totalGross: item["Total Gross"],
        weeksReleased: item["Weeks Released"],
        date: new Date().toISOString().split("T")[0],
      };
      console.log(`Saving document with ID: ${docRef.id}`);
      return setDoc(docRef, data);
    });

    await Promise.all(addPromises);

    console.log("New weekly_box_office data saved successfully.");
    return NextResponse.json({
      message: "weekly_box_office data updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating weekly_box_office data:", error);
    return NextResponse.json(
      { error: `Failed to update weekly_box_office data: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("type", "==", "weekly_box_office"));
    const querySnapshot = await getDocs(q);

    const weeklyBoxOfficeData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return NextResponse.json({ weeklyBoxOfficeData });
  } catch (error: any) {
    console.error("Error fetching weekly_box_office data:", error);
    return NextResponse.json(
      { error: `Failed to fetch weekly_box_office data: ${error.message}` },
      { status: 500 }
    );
  }
}
