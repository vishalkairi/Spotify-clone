import { Link } from "react-router-dom";
import { NavBarComponent } from "./NavBarComponent";
import { SideBarComponent } from "./SideBarComponent";
import { useContext, useEffect, useState } from "react";
import { LoggedInContainer } from "../containers/LoggedInContainer";
import songContext from "../contexts/SongContext";
import { SingleSongCard } from "./shared/SingleSongCard";

export const SearchPage = () => {
  const { searchSongResult, setSearchSongResult } = useContext(songContext);
  // return (
  //   <div className="w-full flex  bg-black ">
  //     <SideBarComponent />
  //     <div className="w-full overflow-auto">
  //       <NavBarComponent isSearchIcon={true} />
  //       <div>
  //         <div className="text-white font-semibold text-2xl mb-5 mt-8">
  //           Browse All
  //         </div>
  //         <div className=" w-full p-4 overflow-auto ">
  //           <View />
  //           <View />
  //           <View />
  //           <View />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  useEffect(() => {
    console.log(searchSongResult);
  }, [searchSongResult]);
  return (
    <LoggedInContainer activeScreen={"search"} isSearchIcon={true}>
      <div className=" w-full p-4 overflow-scroll ">
        {searchSongResult.length > 0 && (
          <div>
            <h2 className="text-white text-2xl pb-4">Search Results</h2>
            {searchSongResult.map((song) => {
              return <SingleSongCard info={song} key={song._id} />;
            })}
          </div>
        )}
        <div className="text-white font-semibold text-2xl mb-5 mt-8">
          Browse All
        </div>
        <View />
        <View />
        <View />
        <View />
      </div>
    </LoggedInContainer>
  );
};
const View = () => {
  return (
    <div className=" flex justify-between space-x-10 mt-8">
      <Card title={"Music"} />
      <Card title={"Podcasts"} />
      <Card title={"Live Events"} />
      <Card title={"Made For You"} />
    </div>
  );
};
const Card = ({ title }) => {
  return (
    <Link className=" w-full">
      <div className="relative w-full overflow-hidden  rounded-xl text-white text-2xl font-semibold bg-green-900 h-full z-10">
        <h2 className="ml-2 pb-36 px-2 pt-2">{title}</h2>
        <img
          src="https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb"
          alt="Song Cover"
          className="absolute h-20 w-20 text-right overflow-hidden shadow-lg object-center  rotate-[25deg] right-0 bottom-0"
        />
      </div>
    </Link>
  );
};
