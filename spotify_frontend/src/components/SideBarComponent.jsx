import { IconComponent } from "./shared/IconComponent";
import logo from "../assets/images/spotify_logo_white.svg";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
export const SideBarComponent = ({
  activeScreen,
  setCreatePlaylistModalOpen,
}) => {
  return (
    <div className="h-full w-4/12 bg-black flex flex-col space-y-4">
      <Link to={"/home"}>
        <div className="my-4 ml-6">
          <img src={logo} alt="" className="w-1/3" />
        </div>
      </Link>
      <Link to={"/home"}>
        <IconComponent
          icon={"material-symbols:home"}
          text={"Home"}
          active={activeScreen === "home" ? true : false}
        />
      </Link>
      <Link to={"/search"}>
        <IconComponent
          icon={"mingcute:search-line"}
          text={"Search"}
          active={activeScreen === "search" ? true : false}
        />
      </Link>
      <div>
        <Link to={"/library"} className="flex justify-between">
          <IconComponent
            icon={"ion:library"}
            text={"Your Library"}
            active={activeScreen === "library" ? true : false}
          />
          <IconComponent
            icon={"ic:outline-plus"}
            text={""}
            active={activeScreen === "library" ? true : false}
          />
        </Link>
      </div>
      <Link to={"/mymusic"}>
        <IconComponent
          icon={"mdi:music-box-multiple"}
          text={"My Music"}
          active={activeScreen === "mymusic" ? true : false}
        />
      </Link>
      <div className="text-white bg-zinc-800 p-4 mx-2 rounded-md">
        <h4 className="pb-5">Create your first playlist</h4>
        <p className="text-sm">It's easy, we'll help you</p>
        <button
          className="mt-4 mb-2 px-4 py-2 bg-white text-black font-semibold rounded-full hover:scale-105 hover:bg-slate-50"
          onClick={() => {
            setCreatePlaylistModalOpen(true);
          }}
        >
          Create Playlist
          {/* <Link to={"/create"}>Create Playlist</Link> */}
        </button>
      </div>
      <div className="text-white bg-zinc-800 p-4 mx-2 rounded-md">
        <h4 className="pb-5">Let's find some podcast to follow</h4>
        <p className="text-sm">We'll keep you updated on new episodes</p>
        <button className="mt-4 mb-2 px-4 py-2 bg-white text-black font-semibold rounded-full hover:scale-105 hover:bg-slate-50">
          <Link to={"/create"}>Browse Podcast</Link>
        </button>
      </div>
      <div className="">
        <button className="flex items-center text-white bg-black outline m-4 outline-solid rounded-full px-4 py-2">
          <Icon icon="material-symbols:language" className="text-white mr-1" />
          English
        </button>
      </div>
    </div>
  );
};
