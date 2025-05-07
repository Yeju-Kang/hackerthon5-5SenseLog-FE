import { Link } from "react-router-dom";

// 💡 더미 데이터
const myDiaries = [
  {
    id: 1,
    content: "오늘은 햇살이 기분 좋았다.",
    tag: "기쁨",
    date: "2025-05-09",
  },
  {
    id: 2,
    content: "다들 바빠 보여서 외로웠어.",
    tag: "우울",
    date: "2025-05-08",
  },
];

const myGroups = [
  {
    id: 1,
    name: "하루 한 문장",
    description: "매일 한 문장으로 감정을 나눠요.",
  },
  {
    id: 2,
    name: "감정 공유방",
    description: "우울할 땐 함께 털어놓기.",
  },
];

function MyPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "800px" }}>
        <h1 className="title">마이페이지</h1>
        <p className="subtitle is-6">
          나의 감정 기록과 활동 내역을 볼 수 있어요.
        </p>

        <hr />

        <div className="box">
          <h2 className="subtitle is-5">📘 내가 쓴 일기</h2>
          {myDiaries.length === 0 ? (
            <p className="has-text-grey">아직 작성한 일기가 없어요.</p>
          ) : (
            myDiaries.map((diary) => (
              <Link to={`/diary/${diary.id}`} key={diary.id}>
                <div className="box is-clickable mb-3">
                  <p className="mb-1">{diary.content}</p>
                  <div className="is-flex is-justify-content-space-between is-align-items-center">
                    <span
                      className={`tag is-small ${
                        diary.tag === "기쁨"
                          ? "is-success"
                          : diary.tag === "감사"
                          ? "is-warning"
                          : diary.tag === "우울"
                          ? "is-danger"
                          : "is-info"
                      }`}
                    >
                      {diary.tag}
                    </span>
                    <small className="has-text-grey">{diary.date}</small>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="box mt-5">
          <h2 className="subtitle is-5">👥 내가 속한 그룹</h2>
          {myGroups.length === 0 ? (
            <p className="has-text-grey">아직 참여한 그룹이 없어요.</p>
          ) : (
            myGroups.map((group) => (
              <Link to={`/groups/${group.id}`} key={group.id}>
                <div className="box is-clickable mb-3">
                  <p className="has-text-weight-semibold">{group.name}</p>
                  <p className="is-size-7 has-text-grey">{group.description}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default MyPage;
