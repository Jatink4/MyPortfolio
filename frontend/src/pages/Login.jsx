import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={login} className="text-white p-8 space-y-4 text-center mt-50">
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
        className="block bg-gray-700 p-2 rounded w-full" />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
        className="block bg-gray-700 p-2 rounded w-full" />
      <button className="bg-blue-600 px-4 py-2 rounded">Login</button>
    </form>
  );
}
