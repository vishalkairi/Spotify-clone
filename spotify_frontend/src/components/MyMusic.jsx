import { useEffect, useState } from "react";

import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import { SideBarComponent } from "./SideBarComponent";
import { NavBarComponent } from "./NavBarComponent";
import { SingleSongCard } from "./shared/SingleSongCard";
import { Howl, Howler } from "howler";
import { LoggedInContainer } from "../containers/LoggedInContainer";
export const MyMusic = () => {
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    try {
      const getSongData = async () => {
        const res = await makeAuthenticatedGETRequest("/song/get/mysongs");
        console.log(res);
        setSongData(res.data.data);
      };
      getSongData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <LoggedInContainer activeScreen={"mymusic"} isSearchIcon={false}>
      <div className="w-full h-full p-8">
        <div className="text-white text-4xl font-semibold pb-4">Songs</div>
        <div className="space-y-3 overflow-auto">
          {songData.map((song) => {
            return (
              <SingleSongCard key={song._id} info={song} playSound={() => {}} />
            );
          })}
        </div>
      </div>
    </LoggedInContainer>
  );
};
