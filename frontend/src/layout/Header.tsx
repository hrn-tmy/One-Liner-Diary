import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/logout", null, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("ログアウト失敗", error);
      toast.error("ログアウトに失敗しました。");
    }
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold"> One Liner Diary</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
      >
        ログアウト
      </button>
    </header>
  );
}
