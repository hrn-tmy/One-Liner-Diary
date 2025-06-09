import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  diaryUpdateSchema,
  type DiaryDetailType,
  type UpdateDiaryType,
} from "../schema/diarySchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function DiaryModal({
  diary_id,
  onClose,
}: {
  diary_id: number;
  onClose: (message?: string) => void;
}) {
  const [detail, setDetail] = useState<DiaryDetailType | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateDiaryType>({
    resolver: zodResolver(diaryUpdateSchema),
  });

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await axios.get(
        `http://localhost:8080/diary/${diary_id}`
      );
      setDetail(response.data);
      reset(response.data);
    };
    fetchDetail();
  }, [diary_id, reset]);

  const onSubmit = async (data: UpdateDiaryType) => {
    try {
      await axios.put(`http://localhost:8080/diary/update/${diary_id}`, data, {
        withCredentials: true,
      });
      onClose("日記の更新に成功しました！");
    } catch (error) {
      console.error("日記更新失敗:", error);
      toast.error("日記の更新に失敗しました。");
    }
  };

  if (!detail) return null;

  return (
    <div
      onClick={() => onClose()}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl max-h-[90vh] p-8"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-lg w-full h-full overflow-auto p-8 relative space-y-6"
        >
          <button
            onClick={() => onClose()}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-3xl leading-none"
            aria-label="閉じる"
          >
            &times;
          </button>
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            日記詳細
          </h2>
          <div className="space-y-6 text-gray-700 text-base">
            <div>
              <label
                htmlFor="did"
                className="block mb-2 font-medium text-gray-700"
              >
                タイトル
              </label>
              <input
                {...register("title")}
                className="w-full border border-gray-300 p-3 rounded-md text-lg"
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="did"
                className="block mb-2 font-medium text-gray-700"
              >
                やったこと
              </label>
              <input
                {...register("did")}
                className="w-full border border-gray-300 p-3 rounded-md text-lg"
              />
              {errors.did && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.did.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md text-lg"
          >
            更新
          </button>
          <button
            type="button"
            onClick={() => onClose()}
            className="w-full text-base text-gray-600 hover:text-gray-800 underline mt-3"
          >
            閉じる
          </button>
        </div>
      </form>
    </div>
  );
}
