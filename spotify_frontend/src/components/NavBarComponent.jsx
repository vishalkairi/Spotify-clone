import { Icon } from "@iconify/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import songContext from "../contexts/SongContext";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import { useState } from "react";
export const NavBarComponent = ({ isSearchIcon }) => {
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
    songSearch,
    setSongSearch,
    searchSongResult,
    setSearchSongResult,
  } = useContext(songContext);

  const searchSong = async (e) => {
    try {
      const response = await makeAuthenticatedGETRequest(
        `/song/get/name/${songSearch}`
      );
      // console.log(response);
      setSearchSongResult(response.data.data);
      console.log(searchSongResult);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <nav className="bg-zinc-900 flex justify-between items-center">
        <div className="flex items-center w-3/5">
          <div className="flex justify-center items-center">
            <button className="my-4 ml-8 mr-4">
              <Icon
                icon="mingcute:left-line"
                className="text-zinc-400 bg-black rounded-full"
                width="30"
                height="30"
              />
            </button>
            <button className="my-4">
              <Icon
                icon="mingcute:right-line"
                className="text-zinc-400 bg-black rounded-full"
                width="30"
                height="30"
              />
            </button>
          </div>
          {isSearchIcon && (
            <div className="ml-2 p-2 w-1/2 bg-zinc-800 flex justify-center items-center hover:outline hover:outline-white  hover:bg-zinc-700 rounded-full">
              <Icon
                icon="mingcute:search-line"
                className="text-zinc-400 rounded-full"
                width="30"
                height="30"
              />
              <input
                type="text"
                className="p-2 ml-2 rounded-lg bg-zinc-800 placeholder:text-zinc-500  w-full font-light text-sm hover:bg-zinc-700 outline-none"
                placeholder="What do you want to play?"
                value={songSearch}
                onChange={(e) => setSongSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchSong();
                  }
                }}
              />
            </div>
          )}
        </div>
        <div>
          <button className="text-zinc-400 font-bold hover:text-white">
            <Link to={"/uploadSong"}>Upload Song</Link>
          </button>
          <button className="my-2 mx-8 px-8 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 hover:bg-slate-50">
            <Link to={"/login"}>VK</Link>
          </button>
        </div>
      </nav>
    </div>
  );
};
