import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userSchema, type signupData } from "../schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<signupData>({
    resolver: zodResolver(userSchema),
  });
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const onSubmit = async (data: signupData) => {
    try {
      await axios.post(
        "http://localhost:8080/signup",
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );
      navigate("/diary");
    } catch (error) {
      console.error("サインアップ失敗", error);
      alert("サインアップに失敗しました。");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">サインアップ</h2>
        <div>
          <label htmlFor="name" className="block mb-1 text-gray-700">
            ニックネーム
          </label>
          <input
            {...register("name")}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="たろちゃん"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

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
          <label htmlFor="password" className="block mb-1 text-gray-700">
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

        <div>
          <label htmlFor="confirmPassword" className="block mb-1 text-gray-700">
            パスワード（確認用）
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="8〜20文字のパスワード"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
          {password !== confirmPassword && (
            <p className="text-sm text-red-500">
              パスワードが一致していません。
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
        >
          サインアップ
        </button>
      </form>
    </div>
  );
}
