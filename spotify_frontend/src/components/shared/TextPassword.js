import { Icon } from "@iconify/react";
import { useState } from "react";
export const TextPassword = ({ placeholder, id, value, setValue }) => {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-white font-bold mt-2 mb-2">
        {placeholder}
      </label>
      <div className="w-full flex border-2 border-solid border-white rounded-md">
        <input
          type={showPwd ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          className="p-2 rounded-md bg-black text-white w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Icon
          icon="formkit:hidden"
          width="40"
          className="text-white bg-black pr-4"
          onClick={() => {
            setShowPwd(!showPwd);
          }}
        />
      </div>
    </div>
  );
};
