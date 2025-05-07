import { useParams, useNavigate } from "react-router-dom";

// 💡 테스트용 더미 데이터
const mockDiary = {
  id: 1,
  content: "오늘 하루 너무 지쳤어요. 그냥 잠들고 싶다.",
  tag: "우울",
  comfortMessage: "오늘도 잘 버텨줘서 고마워요 💙",
  createdAt: "2025-05-10",
  author: "나",
};

function DiaryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const diary = mockDiary;

  const tagColor =
    diary.tag === "기쁨"
      ? "is-success"
      : diary.tag === "감사"
      ? "is-warning"
      : diary.tag === "우울" || diary.tag === "불안"
      ? "is-danger"
      : "is-info";

  // 삭제 버튼 클릭 시
  const handleDelete = () => {
    const confirm = window.confirm("정말 이 일기를 삭제하시겠습니까?");
    if (confirm) {
      // 실제 API 연결: await fetch(`/api/diaries/${id}`, { method: "DELETE" })
      alert("일기가 삭제되었습니다.");
      navigate("/diary"); // 삭제 후 목록으로 이동
    }
  };

  // 수정 버튼 클릭 시
  const handleEdit = () => {
    navigate(`/diary/edit/${id}`);
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "700px" }}>
        <h1 className="title has-text-centered has-text-link-dark">
          일기 상세 보기
        </h1>

        <div className="box">
          <p className="has-text-grey mb-1">
            <strong>작성자:</strong> {diary.author} &nbsp; | &nbsp;
            <strong>작성일:</strong> {diary.createdAt}
          </p>

          <article className="content">
            <blockquote className="is-size-5 has-text-weight-medium has-text-dark">
              "{diary.content}"
            </blockquote>
          </article>

          <div className="mt-4">
            <span className={`tag is-medium ${tagColor}`}>{diary.tag}</span>
          </div>

          <hr />

          <div className="has-text-centered">
            <p className="is-size-6 has-text-grey">AI 위로 문장</p>
            <p className="is-size-5 has-text-weight-semibold mt-2">
              "{diary.comfortMessage}"
            </p>
          </div>

          <hr />

          <div className="buttons is-centered mt-4">
            <button className="button is-warning" onClick={handleEdit}>
              수정하기
            </button>
            <button className="button is-danger" onClick={handleDelete}>
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiaryDetailPage;
