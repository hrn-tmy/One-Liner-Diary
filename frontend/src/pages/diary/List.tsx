import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ListType } from "../../schema/diarySchema";
import DiaryModal from "../../modal/DiaryModal";

export default function List() {
  const [lists, setLists] = useState<ListType[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchList = async () => {
      const response = await axios.get("http://localhost:8080/diary/list");
      setLists(response.data);
    };
    fetchList();
  }, []);

  const deleteDiary = async (diary_id: number) => {
    try {
      await axios.delete(`http://localhost:8080/diary/delete/${diary_id}`);
      alert("削除に成功しました。");
      setLists((prevDiaries) =>
        prevDiaries.filter((diary) => diary.diary_id !== diary_id)
      );
    } catch (error) {
      console.error("日記削除エラー", error);
      alert("日記の削除に失敗しました。");
    }
  };

  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  return (
    <div>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">日記一覧</h2>
        <div className="flex justify-end mb-4">
          <Link to="/diary/create">
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              新規作成
            </button>
          </Link>
        </div>
        <table className="w-full table-auto border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">日付</th>
              <th className="p-2 border">やったこと</th>
              <th className="p-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list) => (
              <tr key={list.diary_id} className="text-center">
                <td className="p-2 border">{formatDate(list.created_at)}</td>
                <td
                  onClick={() => {
                    setSelectedId(list.diary_id);
                    setShowModal(true);
                  }}
                  className="p-2 border text-blue-600 cursor-pointer hover:underline"
                >
                  {list.did}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => {
                      setSelectedId(list.diary_id);
                      if (
                        window.confirm("本当に削除してもよろしいでしょうか？")
                      ) {
                        deleteDiary(list.diary_id);
                      }
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && selectedId !== null && (
          <DiaryModal
            diary_id={selectedId}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}
