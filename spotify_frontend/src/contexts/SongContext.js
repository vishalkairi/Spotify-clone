import { createContext } from "react";

const songContext = createContext({
  currentSong: null,
  setCurrentSong: (currentSong) => {},
  soundPlayed: null,
  setSoundPlayed: () => {},
  isPaused: null,
  setIsPaused: () => {},
  songSearch: null,
  setSongSearch: () => {},
  searchSongResult: [],
  setSearchSongResult: () => {},
});

export default songContext;
