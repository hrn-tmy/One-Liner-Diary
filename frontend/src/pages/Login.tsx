import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginSchema, type loginData } from "../schema/userSchema";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: loginData) => {
    try {
      await axios.post("http://localhost:8080/login", data, {
        withCredentials: true,
      });
      navigate("/diary");
    } catch (error) {
      console.error("ログイン失敗", error);
      alert("ログインに失敗しました。");
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
          onClick={() => navigate(-1)}
          className="w-full text-sm text-gray-500 hover:text-gray-700 underline mt-2"
        >
          ← 戻る
        </button>
      </form>
    </div>
  );
}
