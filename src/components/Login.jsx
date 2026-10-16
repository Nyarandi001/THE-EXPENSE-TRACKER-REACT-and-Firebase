
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth, googleprovider, db } from "../config/firebase.js";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore";

import Loading from "./Loading.jsx";

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const nameRef = useRef(null);
  const emailRef2 = useRef(null);
  const passwordRef2 = useRef(null);
  const passwordRef2b = useRef(null);

  const [Login, setLogin] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  const usersCollectionRef = collection(db, "ExpenseTrackerUsers");
  const navigate = useNavigate();

  async function getUserByUserId(userId) {
    try {
      const q = query(
        collection(db, "ExpenseTrackerUsers"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return null;
      }

      const userDoc = querySnapshot.docs[0];

      return {
        id: userDoc.id,
        ...userDoc.data(),
      };
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Error fetching user details");
      return null;
    }
  }

  async function signUpWithEmail() {
    const name = nameRef.current?.value.trim();
    const email = emailRef2.current?.value.trim();
    const password = passwordRef2.current?.value;
    const password2 = passwordRef2b.current?.value;

    if (!name || !email || !password || !password2) {
      toast.error("Enter all the fields");
      return;
    }

    if (password !== password2) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      setShowLoader(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const dateTimeString = new Intl.DateTimeFormat("en-KE", {
        timeZone: "Africa/Nairobi",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());

      await addDoc(usersCollectionRef, {
        name,
        email,
        userId: userCredential.user.uid,
        joinedDate: dateTimeString,
        totalExpenses: 0,
        totalMoney: 0,
        totalRevenue: 0,
      });

      toast.success("Registration successful. Please log in.");

      if (nameRef.current) nameRef.current.value = "";
      if (emailRef2.current) emailRef2.current.value = "";
      if (passwordRef2.current) passwordRef2.current.value = "";
      if (passwordRef2b.current) passwordRef2b.current.value = "";

      setLogin(true);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed");
    } finally {
      setShowLoader(false);
    }
  }

  async function LoginUserWithEmail() {
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast.error("Enter all the fields");
      return;
    }

    try {
      setShowLoader(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = await getUserByUserId(userCredential.user.uid);

      if (!userData) {
        toast.error("User profile not found");
        return;
      }

      navigate(
        `/home/${encodeURIComponent(userData.userId)}/${encodeURIComponent(userData.name)}`
      );
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed");
    } finally {
      setShowLoader(false);
    }
  }

  async function signUpWithGoogle() {
    try {
      setShowLoader(true);

      const result = await signInWithPopup(auth, googleprovider);
      const user = result.user;

      const existingUser = await getUserByUserId(user.uid);

      if (!existingUser) {
        const dateTimeString = new Intl.DateTimeFormat("en-KE", {
          timeZone: "Africa/Nairobi",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date());

        await addDoc(usersCollectionRef, {
          name: user.displayName || "User",
          email: user.email || "",
          userId: user.uid,
          joinedDate: dateTimeString,
          totalExpenses: 0,
          totalMoney: 0,
          totalRevenue: 0,
        });
      }

      const userData = await getUserByUserId(user.uid);

      if (userData) {
        navigate(
          `/home/${encodeURIComponent(userData.userId)}/${encodeURIComponent(userData.name)}`
        );
      }
    } catch (error) {
      console.error("Google authentication error:", error);
      toast.error(error.message || "Google authentication failed");
    } finally {
      setShowLoader(false);
    }
  }

  const inputClass =
    "w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200";

  const buttonClass =
    "inline-flex min-h-11 items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition duration-200 hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base";

  return (
    <motion.main
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex min-h-screen min-h-[100dvh] w-full items-center justify-center overflow-x-hidden bg-slate-700 px-4 py-6 sm:px-6 sm:py-10 lg:px-8"
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <section className="relative w-full max-w-sm rounded-2xl bg-zinc-800 p-5 shadow-2xl sm:max-w-md sm:p-7 md:p-8 lg:max-w-lg lg:p-10">
        {showLoader && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-zinc-900/80 p-4">
            <Loading
              title={Login ? "Logging In..." : "Creating Account..."}
            />
          </div>
        )}

        {/* Login and sign-up tabs */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setLogin(true)}
            className={`min-h-11 rounded-lg px-3 py-2 font-bold transition ${
              Login
                ? "bg-red-600 text-white shadow-md"
                : "bg-zinc-700 text-gray-300 hover:bg-zinc-600"
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setLogin(false)}
            className={`min-h-11 rounded-lg px-3 py-2 font-bold transition ${
              !Login
                ? "bg-red-600 text-white shadow-md"
                : "bg-zinc-700 text-gray-300 hover:bg-zinc-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
            Expense Tracker
          </h1>

          <p className="mt-2 text-sm text-gray-300 sm:text-base">
            {Login
              ? "Welcome back! Log in to continue."
              : "Create an account to get started."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {Login ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.2 }}
              onSubmit={(event) => {
                event.preventDefault();
                LoginUserWithEmail();
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="login-email"
                  className="text-sm font-semibold text-gray-200"
                >
                  Email address
                </label>

                <input
                  id="login-email"
                  className={inputClass}
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  ref={emailRef}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="login-password"
                  className="text-sm font-semibold text-gray-200"
                >
                  Password
                </label>

                <input
                  id="login-password"
                  className={inputClass}
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  ref={passwordRef}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={showLoader}
                className={`${buttonClass} mt-2 w-full`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={signUpWithGoogle}
                disabled={showLoader}
                className="min-h-11 w-full rounded-lg border border-gray-500 px-4 py-3 font-semibold text-white transition hover:bg-zinc-700 disabled:opacity-60"
              >
                Continue with Google
              </button>

              <p className="text-center text-sm text-gray-300">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setLogin(false)}
                  className="font-bold text-red-400 underline underline-offset-4 hover:text-red-300"
                >
                  Sign up
                </button>
              </p>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              onSubmit={(event) => {
                event.preventDefault();
                signUpWithEmail();
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="signup-name"
                  className="text-sm font-semibold text-gray-200"
                >
                  Full name
                </label>

                <input
                  id="signup-name"
                  className={inputClass}
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  ref={nameRef}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="signup-email"
                  className="text-sm font-semibold text-gray-200"
                >
                  Email address
                </label>

                <input
                  id="signup-email"
                  className={inputClass}
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  ref={emailRef2}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="signup-password"
                  className="text-sm font-semibold text-gray-200"
                >
                  Password
                </label>

                <input
                  id="signup-password"
                  className={inputClass}
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  ref={passwordRef2}
                  required
                  minLength={6}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="signup-confirm-password"
                  className="text-sm font-semibold text-gray-200"
                >
                  Confirm password
                </label>

                <input
                  id="signup-confirm-password"
                  className={inputClass}
                  type="password"
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  ref={passwordRef2b}
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={showLoader}
                className={`${buttonClass} mt-2 w-full`}
              >
                Create Account
              </button>

              <button
                type="button"
                onClick={signUpWithGoogle}
                disabled={showLoader}
                className="min-h-11 w-full rounded-lg border border-gray-500 px-4 py-3 font-semibold text-white transition hover:bg-zinc-700 disabled:opacity-60"
              >
                Sign up with Google
              </button>

              <p className="text-center text-sm text-gray-300">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setLogin(true)}
                  className="font-bold text-red-400 underline underline-offset-4 hover:text-red-300"
                >
                  Login
                </button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    </motion.main>
  );
}

export default Login;
