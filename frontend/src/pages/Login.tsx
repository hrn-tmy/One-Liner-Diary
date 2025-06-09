import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSchema, type loginData } from "../schema/userSchema";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (message) {
      toast.success(message);
      navigate(location.pathname, { replace: true });
    }
  }, [message, location.pathname, navigate]);

  const onSubmit = async (data: loginData) => {
    try {
      await axios.post("http://localhost:8080/login", data, {
        withCredentials: true,
      });
      navigate("/diary", { state: { message: "ログインに成功しました！" } });
    } catch (error) {
      console.error("ログイン失敗", error);
      toast.error("ログインに失敗しました。");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">ログイン</h2>
        <div>
          <label htmlFor="email" className="block mb-1 text-gray-700">
            メールアドレス
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="example@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor=" password" className="block mb-1 text-gray-700">
            パスワード
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="8〜20文字のパスワード"
          />
          <p className="text-sm text-gray-500 mt-1">
            英大文字・小文字・数字・記号（!@#$%^&*）のうち2種類以上を含めてください。
          </p>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
        >
          ログイン
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full text-sm text-gray-500 hover:text-gray-700 underline mt-2"
        >
          ← 戻る
        </button>
      </form>
    </div>
  );
}
