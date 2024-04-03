import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginComponent } from "./components/LoginComponent";
import { SignUpComponent } from "./components/SignUpComponent";
import { HomeComponent } from "./components/HomeComponent";
import { useCookies } from "react-cookie";
import { LoggedInHome } from "./components/LoggedInHome";
import { UploadSong } from "./components/UploadSong";
import { SearchPage } from "./components/SearchPage";
import { MyMusic } from "./components/MyMusic";
import songContext from "./contexts/SongContext";
import { useState } from "react";
import { Library } from "./components/Library";
import { SinglePlayListView } from "./components/SinglePlayListView";
function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [songSearch, setSongSearch] = useState("");
  const [searchSongResult, setSearchSongResult] = useState([]);
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          <songContext.Provider
            value={{
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
            }}
          >
            <Routes>
              <Route path="/home" element={<LoggedInHome />} />
              <Route path="*" element={<Navigate to={"/home"} />} />
              <Route path="/uploadSong" element={<UploadSong />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<Library />} />
              <Route
                path="/playlist/:playlistId"
                element={<SinglePlayListView />}
              />
              <Route path="/mymusic" element={<MyMusic />} />
            </Routes>
          </songContext.Provider>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignUpComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
