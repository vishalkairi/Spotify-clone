import { useContext } from "react";
import songContext from "../../contexts/SongContext";

const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_KEY,
  region: "ap-south-1",
  signatureVersion: "v4",
});
export const SingleSongCard = ({ info }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);
  const s3 = new AWS.S3();
  let url;
  // const regex = /+/g;

  // const key = info.track.split("/").slice(-2).join("/").replace("+", " ");
  // console.log(`key ${key}`);
  url = s3.getSignedUrl("getObject", {
    Bucket: "spotify-song-bucket",
    Key: "6603dcfc962ab5c1336d7f94/O Mahi O Mahi(PagalWorld.com.cm).mp3",
  });
  console.log(url);

  return (
    <div
      className="flex hover:bg-gray-400 hover:bg-opacity-20 rounded-lg p-2"
      onClick={() => {
        info = { ...info, track: url };
        console.log(info);
        setCurrentSong(info);
      }}
    >
      <div
        className="w-12 h-12 bg-white bg-cover bg-center"
        style={{
          backgroundImage: `url(${info.thumbnail})`,
        }}
      ></div>
      <div className="flex w-full justify-center items-center">
        <div className=" text-white flex  flex-col justify-center items-start pl-4 w-5/6">
          <div className="hover:underline">{info.name}</div>
          <div className="text-sm text-gray-400 hover:underline hover:text-white">
            {info.artist.firstName + " " + info.artist?.lastName}
          </div>
        </div>
        <div className="flex justify-center items-center w-1/6 text-gray-500 text-sm">
          <div>03:44</div>
          {/* <div className="text-white pl-2 flex justify-center items-center">
            ...
          </div> */}
        </div>
      </div>
    </div>
  );
};
