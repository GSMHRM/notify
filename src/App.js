import axios from "axios";    

function App() {
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;

    axios
      .post(`http://ec2-3-35-231-181.ap-northeast-2.compute.amazonaws.com:9020/auth/signup`, { email, name, password }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        alert("성공");
      })
      .catch((err) => {
        console.log(err);
        alert("실패");
      });
  };
  return (
    <div className="App">
      <form onSubmit={onSubmitHandler}>
        <input name="email" type="email" placeholder="이메일" />
        <input name="name" placeholder="이름" />
        <input name="password" placeholder="비밀번호" />
        <input type="submit" value="제출" />
      </form>
    </div>
  );
}

export default App;
