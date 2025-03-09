"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email: "test@itportal.com",
      password: "123456",
    };

    if (email === user.email && password === user.password) {
      setError("");
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      router.push("/dashboard");
    } else {
      setError("E-posta veya şifre hatalı!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-5">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Giriş Yap
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}{" "}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-600 font-medium">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="E-posta adresinizi girin"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Şifrenizi girin"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Giriş Yap
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Hesabınız yok mu?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Kayıt Ol
            </a>
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-64"
        >
          <Lottie
            animationData={require("../../public/login-animation.json")}
            loop={true}
          />
        </motion.div>
      </div>
    </div>
  );
}
