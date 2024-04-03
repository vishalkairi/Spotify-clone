import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";

export const AddToPlaylistModal = ({ closeModal, addSongToPlaylist }) => {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    async function getPlaylistData() {
      try {
        let response = await makeAuthenticatedGETRequest("/playlist/get/me");
        response = response.data;
        console.log(response);
        setPlaylists(response);
      } catch (error) {
        console.log(error);
      }
    }
    getPlaylistData();
  }, []);
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
          Select Playlist
        </div>
        <div className="space-y-4 flex flex-col justify-center items-center">
          {playlists.length > 0 &&
            playlists.map((playlist) => {
              console.log(playlist);
              return (
                <PlaylistListComponent
                  info={playlist}
                  addSongToPlaylist={addSongToPlaylist}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

const PlaylistListComponent = ({ info, addSongToPlaylist }) => {
  return (
    <div
      className="bg-app-black w-full flex items-center space-x-4 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer p-3"
      onClick={() => {
        addSongToPlaylist(info._id);
      }}
    >
      <div>
        <img
          src={info.thumbnail}
          className="w-10 h-10 rounded"
          alt="thumbnail"
        />
      </div>
      <div className="text-white font-semibold text-sm">{info.name}</div>
    </div>
  );
};
