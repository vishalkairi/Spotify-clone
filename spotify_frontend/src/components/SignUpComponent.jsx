import { Icon } from "@iconify/react";
import { useState } from "react";
import { TextInput } from "./shared/TextInput";
import { TextPassword } from "./shared/TextPassword";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
import { useCookies } from "react-cookie";
export const SignUpComponent = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signup = async () => {
    if (email !== confirmEmail) {
      alert("Email and confirm email fields must match. Please check again");
      return;
    }
    try {
      const data = {
        email,
        password,
        username,
        firstName,
        lastName,
      };
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/register",
        data
      );
      console.log(response);
      if (response && !response.error) {
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, { path: "/", expires: date });
        alert("Success");
        navigate("/home");
      } else {
        alert("Failure");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  return (
    <div className="w-full  flex flex-col items-center bg-gradient-to-b from-zinc-800 to-black">
      <Link to={"/home"} className="w-full">
        <div className="logo p-6  w-full bg-black ">
          <Icon icon="logos:spotify" width="160" />
        </div>
      </Link>
      <div className="flex flex-col mt-11 rounded-lg px-40 py-8 w-6/12 text-white">
        <h1 className="text-5xl font-bold">Sign up to start listening</h1>
        <div className=" py-5 w-full flex flex-col justify-center items-center space-y-3">
          <TextInput
            placeholder={"Enter your email"}
            id={"email"}
            value={email}
            setValue={setEmail}
          />
          <TextInput
            placeholder={"Confirm your email"}
            id={"email"}
            value={confirmEmail}
            setValue={setConfirmEmail}
          />
          <TextInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            setValue={setUsername}
          />
          <TextPassword
            placeholder={"Create a password"}
            id={"password"}
            value={password}
            setValue={setPassword}
          />
          <TextInput
            placeholder={"Enter a first name"}
            id={"fmail"}
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            placeholder={"Enter a last name"}
            id={"lname"}
            value={lastName}
            setValue={setLastName}
          />
        </div>
        <button
          className="p-4 text-black bg-green-500 rounded-full hover:bg-green-400 hover:scale-105  w-full  font-bold"
          onClick={(e) => {
            e.preventDefault();
            signup();
          }}
        >
          Sign Up
        </button>
      </div>
      <div className="py-6 border-t-2 border-solid ">
        <span className="inline-block text-zinc-500">
          Already have an account?&nbsp;
        </span>
        <span className=" inline-block underline underline-offset-1 text-white">
          <Link to={"/login"}>Log In</Link>
        </span>
      </div>
    </div>
  );
};
