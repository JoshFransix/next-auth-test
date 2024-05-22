"use client";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
export default function Home() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          body: JSON.stringify({
            username: userName,
            password: password,
            email: email,
          }),
        });

        const { data } = await response.json();
        const main = JSON.stringify(data);
        console.log(data);
        setUser(main);
        localStorage.setItem("user", main);
      } catch (error) {
        return error;
      }
    } else {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });

      const { data } = await response.json();
      const main = JSON.stringify(data);
      console.log(data);
      setUser(data);
        localStorage.setItem("user", main);
    }
  };

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(storedUser){
      setUser(JSON.parse(storedUser))
      console.log(user)
    }
  },[])
  return user? <div>Hello {user?.Username} <br />
  <button onClick={logout}>Logout</button>
  </div> :(
    <div className="flex flex-col justify-center items-center mx-auto h-[80vh] w-[700px]">
      <div className="flex items-center my-6 transition-all">
        <h3
          onClick={() => setIsLogin(true)}
          className={`cursor-pointer transition-all text-blue-600 px-8  rounded-md py-2 ${
            isLogin && "border border-blue-100 bg-blue-200"
          }`}
        >
          Login{" "}
        </h3>
        <h3
          onClick={() => setIsLogin(false)}
          className={`cursor-pointer transition-all text-blue-600 px-8  rounded-md py-2 ${
            !isLogin && "border border-blue-100 bg-blue-200"
          }`}
        >
          Sign Up{" "}
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        {isLogin ? (
          <div className="transition-all w-full">
            <h1 className="font-semibold text-xl text-blue-600">
              Welcome Back!!
            </h1>
            <div className="my-6 w-full">
              <label
                htmlFor="username"
                className="text-slate-600 mt-4 mb-1 text-sm"
              >
                Username
              </label>
              <input
                id="username"
                required
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                name="username"
                className="w-[500px] outline-none transition-all border rounded-md block p-2 focus:border-blue-400"
              />
            </div>
            <div className="my-6">
              <label
                htmlFor="username"
                className="text-slate-600 mt-4 mb-1 text-sm"
              >
                Password
              </label>
              <input
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                className="w-[500px] outline-none transition-all border rounded-md block p-2 focus:border-blue-400"
              />
            </div>
          </div>
        ) : (
          <div className="transition-all w-full">
            <h1 className="font-semibold text-xl text-blue-600">
              Register New Account
            </h1>
            <div className="my-6 w-full">
              <label
                htmlFor="username"
                className="text-slate-600 mt-4 mb-1 text-sm"
              >
                Username
              </label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                name="username"
                id="username"
                className="w-[500px] outline-none transition-all border rounded-md block p-2 focus:border-blue-400"
              />
            </div>
            <div className="my-6 w-full">
              <label
                htmlFor="email"
                className="text-slate-600 mt-4 mb-1 text-sm"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                className="w-[500px] outline-none transition-all border rounded-md block p-2 focus:border-blue-400"
              />
            </div>
            <div className="my-6">
              <label
                htmlFor="username"
                className="text-slate-600 mt-4 mb-1 text-sm"
              >
                Password
              </label>
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                className="w-[500px] outline-none transition-all border rounded-md block p-2 focus:border-blue-400"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full text-center bg-blue-300 rounded-md py-4"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  var user = getCookie("user", { req, res });
  if (user == undefined) {
    user = false;
  }
  return { props: { user } };
}
