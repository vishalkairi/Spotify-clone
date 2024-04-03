import { useContext, useLayoutEffect, useState, useRef } from "react";

import { SideBarComponent } from "../components/SideBarComponent";
import { NavBarComponent } from "../components/NavBarComponent";
import { Howl } from "howler";
import { Icon } from "@iconify/react";
import songContext from "../contexts/SongContext";
import { PlaylistModal } from "../modals/PlaylistModal";
import { AddToPlaylistModal } from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
export const LoggedInContainer = ({ children, activeScreen, isSearchIcon }) => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addPlaylistModalOpen, setAddPlaylistModalOpen] = useState(false);
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);
  // console.log(currentSong);
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) return;
    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);
  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    setIsPaused(false);
    sound.play();
  };

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;
    try {
      const response = await makeAuthenticatedPOSTRequest(
        "/playlist/song/add",
        { songId, playlistId: playlistId }
      );
      console.log(response);
      setAddPlaylistModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const playSound = () => {
    if (!soundPlayed) return;
    soundPlayed.play();
  };

  const pauseSong = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound(currentSong.track);
      setIsPaused(false);
    } else {
      pauseSong();
      setIsPaused(true);
    }
  };

  return (
    <div className="w-full h-full bg-black">
      {createPlaylistModalOpen && (
        <PlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}

      <div
        className={`${
          currentSong != null ? `h-9/10` : `h-full`
        } w-full flex overflow-auto  bg-black`}
      >
        {/* Sidebar  */}

        <SideBarComponent
          activeScreen={activeScreen}
          setCreatePlaylistModalOpen={setCreatePlaylistModalOpen}
        />
        {/* Main Content  */}
        <div className=" w-full">
          {/* Nav Content  */}
          <NavBarComponent isSearchIcon={isSearchIcon} />
          <div className=" p-8 pt-0 overflow-auto">{children}</div>
        </div>
      </div>
      {currentSong && (
        <div className="h-1/10 w-full text-white flex items-center bg-zinc-900 p-4">
          <div className="w-1/4 flex items-center">
            <img
              src={currentSong.thumbnail}
              alt=""
              className="w-14 h-14 rounded "
            />
            <div className="pl-4">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs hover:underline cursor-pointer text-gray-500">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist?.lastName}
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-center items-center">
            <div className="flex items-center justify-center space-x-2">
              <Icon
                icon="ph:shuffle-fill"
                width={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="mdi:skip-previous-outline"
                width={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon={isPaused ? "zondicons:pause-solid" : "carbon:play-filled"}
                width={30}
                className="cursor-pointer text-gray-500 hover:text-white"
                onClick={togglePlayPause}
              />
              <Icon
                icon="mdi:skip-next-outline"
                width={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="ic:twotone-repeat"
                width={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
            </div>
            <div>Hello</div>
          </div>
          <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
            <Icon
              icon="ic:round-playlist-add"
              width="30"
              onClick={() => setAddPlaylistModalOpen(true)}
            />
            <Icon icon="ph:heart-bold" width="30" />
          </div>
        </div>
      )}
    </div>
  );
};
