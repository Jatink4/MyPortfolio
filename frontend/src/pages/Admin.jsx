import { uploadProject } from "../api/project";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [form, setForm] = useState({
    title: "", description: "", tech: "", liveUrl: "", githubUrl: ""
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(form).some(val => val.trim() === "") || !image;
    if (isEmpty) {
      setMessage("❌ All fields and image are mandatory.");
      return;
    }

    try {
      setLoading(true); // ✅ start loading
      const fd = new FormData();
      for (let key in form) fd.append(key, form[key]);
      fd.append("image", image);

      await uploadProject(fd);
      setMessage("✅ Project uploaded successfully!");
      setForm({ title: "", description: "", tech: "", liveUrl: "", githubUrl: "" });
      setImage(null);
    } catch (err) {
      setMessage("❌ Upload failed. Try again.");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
      else setAllowed(true);
    });
  }, []);

  


  return allowed ? (
    <form onSubmit={handleSubmit} className="text-white space-y-4 p-8 mt-20 max-w-xl mx-auto">
      {["title", "description", "tech", "liveUrl", "githubUrl"].map(field => (
        <input
          key={field}
          placeholder={field}
          value={form[field]}
          onChange={e => setForm({ ...form, [field]: e.target.value })}
          className="block w-full p-2 bg-gray-800 rounded"
        />
      ))}

      <input
        type="file"
        onChange={e => setImage(e.target.files[0])}
        className="text-white"
      />

      <button
        type="submit"
        disabled={loading} // ✅ disable during upload
        className={`px-4 py-2 rounded transition ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Uploading..." : "Upload"} {/* ✅ change button text */}
      </button>

      {message && (
        <div className="mt-4 text-sm font-medium">
          {message.startsWith("✅") ? (
            <p className="text-green-400">{message}</p>
          ) : (
            <p className="text-red-400">{message}</p>
          )}
        </div>
      )}
    </form>
  ):null;
}
