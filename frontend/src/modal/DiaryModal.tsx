import axios from "axios";
import { useEffect, useState } from "react";
import type { ListDetailProps, ListDetailType } from "../schema/diarySchema";

export default function DiaryModal({ diary_id, onClose }: ListDetailProps) {
  const [detail, setDetail] = useState<ListDetailType | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await axios.get(
        `http://localhost:8080/diary/${diary_id}`
      );
      setDetail(response.data);
    };
    fetchDetail();
  }, [diary_id]);

  if (!detail) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="閉じる"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center text-gray-800">
          日記詳細
        </h2>

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="text-sm font-medium text-gray-500">やったこと</h3>
            <p className="text-base">{detail.did}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">
              自分にとっての意味
            </h3>
            <p className="text-base">{detail.meaning}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">気づき</h3>
            <p className="text-base">{detail.awareness}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">アクション</h3>
            <p className="text-base">{detail.next_action}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
