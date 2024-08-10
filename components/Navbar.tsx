"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase/firebaseClient";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  return (
    <nav className="bg-gray-900 p-4 relative z-[10000]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/airprep-1ba82.appspot.com/o/showpreplogo.svg?alt=media&token=fef12ede-1cda-47d9-b234-e90ea9fe8178"
            alt="AI ShowPrep Logo"
            className="h-auto w-auto"
            style={{ width: "200px", height: "100px" }} // Adjust size as needed
          />
        </Link>
        <div className="flex space-x-4">
          {!user ? (
            <>
              <Link href="/register" className="text-white hover:text-gray-400">
                Register
              </Link>
              <Link href="/login" className="text-white hover:text-gray-400">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link href="/showprep" className="text-white hover:text-gray-400">
                Show prep
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
