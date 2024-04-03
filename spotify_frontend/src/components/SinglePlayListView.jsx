import { useParams } from "react-router-dom";
import { LoggedInContainer } from "../containers/LoggedInContainer";
import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import { SingleSongCard } from "./shared/SingleSongCard";

export const SinglePlayListView = () => {
  const { playlistId } = useParams();
  const [playlistDetails, setPlaylistDetails] = useState([]);
  useEffect(() => {
    try {
      const getPlaylistData = async () => {
        const res = await makeAuthenticatedGETRequest(
          `/playlist/get/playlist/${playlistId}`
        );
        console.log(res.data);
        setPlaylistDetails(res.data);
      };
      getPlaylistData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <LoggedInContainer activeScreen={"library"} isSearchIcon={false}>
      <div className=" w-full p-4 overflow-scroll ">
        {playlistDetails._id && (
          <div>
            <div className="text-white">{playlistDetails.name}</div>
            <div>
              {playlistDetails.songs.map((song) => {
                return <SingleSongCard info={song} key={song._id} />;
              })}
            </div>
          </div>
        )}
      </div>
    </LoggedInContainer>
  );
};
