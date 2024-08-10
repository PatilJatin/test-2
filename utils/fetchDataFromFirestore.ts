// src/utils/fetchDataFromFirestore.ts
import { db } from "@/Firebase/firebaseClient";
import { collection, getDocs, query, where } from "firebase/firestore";

export const fetchDataFromFirestore = async (
  type: string,
  headline?: string
) => {
  const itemsRef = collection(db, "items");
  let q;

  // Function to strip numeric prefix
  const stripPrefix = (headline: string) => {
    return headline.replace(/^\d+\.\s*/, "").trim();
  };

  if (headline) {
    q = query(
      itemsRef,
      where("type", "==", type),
      where("headline", "==", stripPrefix(headline)) // Strip prefix before querying
    );
  } else {
    q = query(itemsRef, where("type", "==", type));
  }

  const querySnapshot = await getDocs(q);

  const data: any[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
};
