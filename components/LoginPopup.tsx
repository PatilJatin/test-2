import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth } from "@/Firebase/firebaseClient";
import { app } from "@/Firebase/firebaseClient"; // Ensure you have your Firebase initialization here

const firestore = getFirestore(app);

const LoginPopup = ({ isOpen, onClose }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const licenseValid = await checkLicense(email, licenseKey);
      if (licenseValid) {
        setSuccess("Login successful!");
        onClose(); // Close the popup on successful login
      } else {
        setError("Invalid license key or expired license.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const checkLicense = async (email: any, licenseKey: any) => {
    try {
      const q = query(
        collection(firestore, "licenses"),
        where("email", "==", email),
        where("licenseKey", "==", licenseKey)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return false;
      }

      let isValidLicense = false;
      let isNotExpired = false;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        isValidLicense = data.licenseKey === licenseKey;
        isNotExpired = new Date() < new Date(data.expirationDate);
      });

      return isValidLicense && isNotExpired;
    } catch (error) {
      console.error("Error checking license:", error);
      return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign in to your account</h2>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">{success}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="licenseKey"
              className="block text-sm font-medium text-gray-700"
            >
              License Key
            </label>
            <input
              id="licenseKey"
              name="licenseKey"
              type="text"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-400"
            >
              Sign in
            </button>
          </div>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-500 underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
