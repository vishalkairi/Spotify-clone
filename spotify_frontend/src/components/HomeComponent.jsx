import { SideBarComponent } from "./SideBarComponent";
import { NavBarComponent } from "./NavBarComponent";

const spotifyPlaylistsCardData = [
  {
    title: "This is one",
    description: "Relax and indulge with beautiful piano pieces",
    imgUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    imgUrl:
      "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft study music in the background.",
    imgUrl:
      "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  },
  {
    title: "Focus Flow",
    description: "Up tempo instrumental hip hop beats",
    imgUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
];

const focusCardsData = [
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful piano pieces",
    imgUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    imgUrl:
      "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft study music in the background.",
    imgUrl:
      "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  },
  {
    title: "Focus Flow",
    description: "Up tempo instrumental hip hop beats",
    imgUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
];

export const HomeComponent = () => {
  return (
    <div className="w-full  flex bg-black ">
      {/* Sidebar  */}
      {/* <div className="h-full w-4/12 bg-black flex flex-col space-y-4">
        <div className="my-4 ml-6">
          <img src={logo} alt="" className="w-1/3" />
        </div>
        <IconComponent
          icon={"material-symbols:home"}
          text={"Home"}
          highlight={true}
        />
        <IconComponent
          icon={"mingcute:search-line"}
          text={"Search"}
          highlight={false}
        />
        <div className="flex justify-between">
          <IconComponent
            icon={"ion:library"}
            text={"Your Library"}
            highlight={false}
          />
          <IconComponent icon={"ic:outline-plus"} text={""} highlight={false} />
        </div>
        <div className="text-white bg-zinc-800 p-4 mx-2 rounded-md">
          <h4 className="pb-5">Create your first playlist</h4>
          <p className="text-sm">It's easy, we'll help you</p>
          <button className="mt-4 mb-2 px-4 py-2 bg-white text-black font-semibold rounded-full hover:scale-105 hover:bg-slate-50">
            <Link to={"/create"}>Create Playlist</Link>
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
            <Icon
              icon="material-symbols:language"
              className="text-white mr-1"
            />
            English
          </button>
        </div>
      </div> */}
      <SideBarComponent />
      {/* Main Content  */}
      <div className="h-full w-full">
        {/* Nav Content  */}
        {/* <div>
          <nav className="bg-zinc-900 flex justify-between items-center">
            <div>
              <button className="my-4 ml-8 mr-4">
                <Icon
                  icon="mingcute:left-line"
                  className="text-zinc-400 bg-black rounded-full"
                  width="30"
                  height="30"
                />
              </button>
              <button className="my-4">
                {" "}
                <Icon
                  icon="mingcute:right-line"
                  className="text-zinc-400 bg-black rounded-full"
                  width="30"
                  height="30"
                />
              </button>
            </div>
            <div>
              <button className="text-zinc-400 font-bold hover:text-white">
                <Link to={"/signup"}>Sign Up</Link>
              </button>
              <button className="my-2 mx-8 px-8 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 hover:bg-slate-50">
                <Link to={"/login"}>Log In</Link>
              </button>
            </div>
          </nav>
        </div> */}
        <NavBarComponent isSearchIcon={false} />
        <div className=" p-8 pt-0 overflow-auto">
          <PlaylistView titleText="Focus" cardsData={focusCardsData} />
          <PlaylistView
            titleText="Spotify Playlists"
            cardsData={spotifyPlaylistsCardData}
          />
          <PlaylistView titleText="Sound of India" cardsData={focusCardsData} />
        </div>
      </div>
    </div>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white mt-8">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-4">
        {
          // cardsData will be an array
          cardsData.map((item) => {
            return (
              <Card
                title={item.title}
                description={item.description}
                imgUrl={item.imgUrl}
              />
            );
          })
        }
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md" src={imgUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};
