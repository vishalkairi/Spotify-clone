import { TextInput } from "./shared/TextInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { makeAuthenticatedPOSTRequestForSong } from "../utils/serverHelper";
import { SideBarComponent } from "./SideBarComponent";
import { NavBarComponent } from "./NavBarComponent";

export const UploadSong = () => {
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const navigate = useNavigate();
  function handleChange(event) {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  }

  const submitSong = async () => {
    try {
      const formData = new FormData();
      formData.append("track", file);
      formData.append("name", name);
      formData.append("thumbnail", thumbnail);

      const res = await makeAuthenticatedPOSTRequestForSong(
        "/song/create",
        formData
      );
      console.log(res);

      alert("Success");
      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("Failure");
    }
  };
  return (
    <div className="w-full h-full flex bg-black ">
      {/* Sidebar  */}

      <SideBarComponent />
      {/* Main Content  */}
      <div className="h-full w-full">
        {/* Nav Content  */}
        <NavBarComponent isSearchIcon={false} />
        <div className="p-8 pt-0 overflow-auto">
          <div className="text-white font-semibold text-2xl mb-5 mt-8">
            Upload Your Music
          </div>
          <div className="flex space-x-2 w-2/3">
            <TextInput
              placeholder={"Name"}
              id={"name"}
              value={name}
              setValue={setName}
            />
            <TextInput
              placeholder={"Thumbnail"}
              id={"thumbnail"}
              value={thumbnail}
              setValue={setThumbnail}
            />
          </div>
          <div className="mt-4">
            <input
              type="file"
              accept="audio/*"
              onChange={handleChange}
              className="w-2/3 text-white outline outline-2 p-2 rounded-lg "
            />
          </div>
          <button
            type="submit"
            className="mt-4 text-white outline outline-2 p-2 rounded-lg"
            onClick={submitSong}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};
