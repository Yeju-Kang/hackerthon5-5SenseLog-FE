import React, { useState, useEffect } from "react";
import DiaryItem from "./DiaryItem";
import EmotionFilter from "./EmotionFilter";

const DiaryList = ({ diaries = [], hasNextPage, onLoadMore }) => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sorted = [...diaries].sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    );

    if (selectedTag) {
      setFiltered(sorted.filter((d) => d.tag?.includes(selectedTag)));
    } else {
      setFiltered(sorted);
    }
  }, [diaries, selectedTag]);

  const handleLoadMore = async () => {
    setLoading(true);
    await onLoadMore();
    setLoading(false);
  };

  // 삭제 시 해당 항목 제거
  const handleDiaryDeleted = (id) => {
    setFiltered((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="diary-list-wrapper">
      <EmotionFilter selectedTag={selectedTag} onSelect={setSelectedTag} />

      {filtered.length === 0 && !loading ? (
        <p className="has-text-grey">작성된 일기가 없습니다.</p>
      ) : (
        <>
          <ul className="diary-list">
            {filtered.map((diary) => (
              <li key={diary.id}>
                <DiaryItem diary={diary} onDeleted={handleDiaryDeleted} />
              </li>
            ))}
          </ul>

          {loading && (
            <div className="has-text-centered mt-4">
              <p className="has-text-grey-light">로딩 중...</p>
            </div>
          )}

          {!loading && hasNextPage && (
            <div className="has-text-centered mt-5">
              <button
                className="button is-link is-light is-rounded"
                onClick={handleLoadMore}
              >
                ⬇️ 더 보기
              </button>
            </div>
          )}

          {!loading && !hasNextPage && filtered.length > 0 && (
            <div className="has-text-centered mt-5">
              <p className="has-text-grey-light">더 이상 일기가 없습니다.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DiaryList;
