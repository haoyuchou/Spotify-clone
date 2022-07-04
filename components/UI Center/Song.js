import { Fragment } from "react";

import millisToMinutesAndSeconds from "../../lib/time";
import { useRecoilState } from "recoil";
import { currentSongIdState, isPlayingState } from "../../atoms/songAtom";
import useSpotify from "../../hooks/useSpotify";

const Song = (props) => {
  const spotifyApi = useSpotify();

  const { number, song } = props;
  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSongHandler = () => {
    setCurrentSongId(song.track.id);
    setIsPlaying(true);
    console.log("Current song id: ", currentSongId);

    spotifyApi.play({
      uris: [song.track.uri],
    });
  };

  return (
    <div
      className="grid grid-cols-2 items-center p-4 hover:bg-gray-900 rounded-lg"
      onClick={playSongHandler}
    >
      <div className="flex items-center space-x-4">
        <p>{number + 1}</p>
        <img
          className="h-10 w-10"
          src={song.track.album.images[0]?.url}
          alt=""
        />

        <div>
          <p className="w-36 lg:w-64 truncate">{song.track.name}</p>
          <p className="w-40 opacity-50 truncate">
            {song.track.artists.map((name) => (
              <span>{`${name.name} `}</span>
            ))}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 opacity-50 hidden md:inline">
          {song.track.album.name}
        </p>
        <p className="opacity-50">
          {millisToMinutesAndSeconds(song.track.duration_ms)}
        </p>
      </div>
    </div>
  );
};

export default Song;
