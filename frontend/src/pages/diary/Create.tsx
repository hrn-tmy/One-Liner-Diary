import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  diaryCreateSchema,
  type CreateDiaryType,
} from "../../schema/diarySchema";

export default function Create() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDiaryType>({
    resolver: zodResolver(diaryCreateSchema),
  });

  const onSubmit = async (data: CreateDiaryType) => {
    try {
      await axios.post("http://localhost:8080/diary/create", data, {
        withCredentials: true,
      });
      navigate("/diary", {
        state: { message: "日記を作成しました！" },
      });
    } catch (error) {
      console.error("日記作成失敗:", error);
      alert("日記の作成に失敗しました。");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">日記作成</h2>
        <div>
          <label htmlFor="title" className="block mb-1 text-gray-700">
            タイトル
          </label>
          <input
            {...register("title")}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="did" className="block mb-1 text-gray-700">
            やったこと
          </label>
          <input
            {...register("did")}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.did && (
            <p className="text-sm text-red-500">{errors.did.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
        >
          送信
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
