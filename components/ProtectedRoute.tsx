"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/firebaseClient";
import Link from "next/link";

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isValidated, setIsValidated] = useState<boolean | null>(null);
  const router = useRouter();

  const searchParam = useSearchParams();

  useEffect(() => {
    let isProtected = searchParam.get("forPdf");
    console.log(isProtected);

    let Check = isProtected === "true" || isProtected === null ? true : false;
    console.log(Check);

    if (Check) {
      const checkValidation = async (uid: string) => {
        try {
          const response = await fetch(`/api/v1/check-validation/${uid}`);
          const data = await response.json();
          console.log(data);

          setIsValidated(data.isValidated);
        } catch (error) {
          console.error("Error checking validation:", error);
          setIsValidated(false);
        }
      };

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          checkValidation(user.uid);
        } else {
          setIsValidated(false);
        }
      });

      return () => unsubscribe();
    } else {
      setIsValidated(true);
    }
  }, [router]);

  if (isValidated === null) {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (isValidated === false) {
    return (
      <div className="w-screen h-screen flex flex-col gap-3 justify-center items-center">
        <p className="">You do not have access to this page.</p>
        <Link href={"/"} className="bg-white p-3 text-black rounded-md block">
          Back to Home
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
