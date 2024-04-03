import { useState } from "react";
import { TextInput } from "../components/shared/TextInput";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
export const PlaylistModal = ({ closeModal }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");
  const handleClick = async () => {
    try {
      const response = await makeAuthenticatedPOSTRequest("/playlist/create", {
        name: playlistName,
        thumbnail: playlistThumbnail,
        songs: [],
      });
      console.log(response);
      closeModal();
    } catch (error) {
      console.log(error);
      alert("Error creating playlist");
    }
  };
  return (
    <div
      className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-zinc-800 w-1/3 rounded p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-white b-5 font-semibold text-lg">
          Create Playlist
        </div>
        <div className="space-y-4">
          <TextInput
            placeholder={"Name"}
            id={"name"}
            value={playlistName}
            setValue={setPlaylistName}
          />
          <TextInput
            placeholder={"Thumbnail"}
            id={"thumbnail"}
            value={playlistThumbnail}
            setValue={setPlaylistThumbnail}
          />
          <button
            className="text-white px-3 py-2  outline outline-solid rounded-lg"
            onClick={handleClick}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
