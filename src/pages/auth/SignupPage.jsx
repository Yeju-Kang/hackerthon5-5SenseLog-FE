import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth"; // 회원가입 API 함수

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await signup({ email, password, nickname });
      alert("회원가입 성공! 로그인 해주세요.");
      navigate("/"); // ✅ 회원가입 성공 시 로그인 페이지로 이동
    } catch (err) {
      if (err.response?.status === 400) {
        setErrorMsg("이미 등록된 이메일입니다.");
      } else {
        setErrorMsg("서버 오류가 발생했습니다.");
      }
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "400px" }}>
        <h1 className="title has-text-centered">회원가입</h1>

        <form onSubmit={handleSignUp}>
          <div className="field">
            <label className="label">이메일</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label className="label">비밀번호</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label className="label">닉네임</label>
            <input
              className="input"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>

          {errorMsg && (
            <p className="has-text-danger has-text-centered mb-3">{errorMsg}</p>
          )}

          <button className="button is-link is-fullwidth" type="submit">
            회원가입
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignUpPage;
