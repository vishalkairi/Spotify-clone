import { Icon } from "@iconify/react";
import { useState } from "react";
import { TextInput } from "./shared/TextInput";
import { TextPassword } from "./shared/TextPassword";
import { Link } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const login = async (e) => {
    const data = { email, password };
    try {
      const res = await makeUnauthenticatedPOSTRequest("/auth/login", data);
      console.log(res);
      if (res && !res.error) {
        const token = res.data.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        console.log(date);
        setCookie("token", token, { path: "/", expires: date });
        navigate("/home");
      } else {
        alert("Failure");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center bg-gradient-to-b from-zinc-800 to-black">
      <Link to={"/home"} className="w-full">
        <div className="logo p-6  w-full bg-black ">
          <Icon icon="logos:spotify" width="160" className="text-white" />
        </div>
      </Link>
      <div className="flex flex-col mt-11 rounded-lg px-40 py-20 bg-gradient-to-b from-black to-zinc-800 text-white">
        <h1 className="text-5xl font-bold">Log in to Spotify</h1>
        <div className=" py-5 w-full flex flex-col justify-center items-center">
          <TextInput
            placeholder={"Email"}
            id={"email"}
            value={email}
            setValue={setEmail}
          />
          <TextPassword
            placeholder={"Password"}
            id={"password"}
            value={password}
            setValue={setPassword}
          />
          <div className=" w-full flex items-center justify-start mt-2">
            <input type="checkbox" className="border-0" />
            <span>&nbsp;Remember Me</span>
          </div>
          <button
            className="p-4 text-black bg-green-500 rounded-full hover:bg-green-400 hover:scale-105  w-full mt-4 font-bold"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            Log In
          </button>
          <p className="underline underline-offset-1 mt-4 mb-4">
            Forgot your password?
          </p>
          <div className="pt-6 border-t-2 border-solid ">
            <span className="inline-block text-zinc-500">
              Don't have an account?&nbsp;
            </span>
            <span className=" inline-block underline underline-offset-1">
              <Link to={"/signup"}>Sign up for Spotify</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
