import { useState, useEffect } from "react";
import { LoggedInContainer } from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import { SingleSongCard } from "./shared/SingleSongCard";
import { useNavigate } from "react-router-dom";

export const Library = () => {
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
    <LoggedInContainer activeScreen={"library"} isSearchIcon={false}>
      <div className="text-white text-xl py-8 font-semibold">My Playlist</div>
      <div className="grid grid-cols-5 gap-4">
        {playlists.length > 0 &&
          playlists.map((playlist) => {
            playlist = { ...playlist, artist: playlist.owner };
            console.log(playlist);
            return (
              <Card
                title={playlist.name}
                description={""}
                imgUrl={playlist.thumbnail}
                playlistId={playlist._id}
              />
            );
          })}
      </div>
    </LoggedInContainer>
  );
};

const Card = ({ title, description, imgUrl, playlistId }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-zinc-800 bg-opacity-40 p-4 rounded-lg w-full"
      onClick={() => {
        navigate(`/playlist/${playlistId}`);
      }}
    >
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md" src={imgUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};
