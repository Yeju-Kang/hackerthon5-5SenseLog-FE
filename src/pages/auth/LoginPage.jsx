import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 세션 쿠키 유지
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate("/diary"); // 로그인 성공 시 다이어리 페이지로 이동
      } else {
        setErrorMsg("이메일 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (err) {
      setErrorMsg("서버 오류가 발생했습니다.");
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "400px" }}>
        <h1 className="title has-text-centered">로그인</h1>

        <form onSubmit={handleLogin}>
          <div className="field">
            <label className="label">이메일</label>
            <div className="control">
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">비밀번호</label>
            <div className="control">
              <input
                className="input"
                P
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {errorMsg && (
            <p className="has-text-danger has-text-centered mb-3">{errorMsg}</p>
          )}

          <div className="control">
            <button className="button is-link is-fullwidth" type="submit">
              로그인
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
