import { useSession } from "next-auth/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import useSpotify from "../../hooks/useSpotify";

import { useRecoilState } from "recoil";
import { currentSongIdState, isPlayingState } from "../../atoms/songAtom";
import useSongInfo from "../../hooks/useSongInfo";
import {
  FastForwardIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/outline";

import { PlayIcon, PauseIcon, VolumeUpIcon } from "@heroicons/react/solid";
import { debounce } from "lodash";

const Player = () => {
  const spotifyApi = useSpotify();

  const { data: session, status } = useSession();

  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  console.log("Song information: ", songInfo);

  const playPauseHandler = () => {
    spotifyApi
      .getMyCurrentPlaybackState()
      .then((data) => {
        if (data?.body?.is_playing) {
          spotifyApi.pause();
          setIsPlaying(false);
        } else {
          spotifyApi.play();
          setIsPlaying(true);
        }
      })
      .catch((err) => console("error: ", err));
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentSongId) {
      // fetch the song
      console.log("There is no current song information");
      console.log(currentSongId);

      if (!songInfo) {
        spotifyApi
          .getMyCurrentPlayingTrack()
          .then((data) => {
            //  If there is already a song playing, else play la la land

            const currentId = data.body?.item?.id
              ? data.body?.item?.id
              : "39ncDMVidHOeQgeC5anYZM";

            console.log("Now Playing: ", currentId);

            setCurrentSongId(currentId);

            spotifyApi.getMyCurrentPlaybackState().then((data) => {
              const currentIsPlaying = data.body?.is_playing
                ? data.body?.is_playing
                : false;

              console.log("It is currently playing:", currentIsPlaying);
              setIsPlaying(currentIsPlaying);
            });
          })
          .catch((err) => console.log("Error: ", err));
      }

      setVolume(50);
    }
  }, [spotifyApi, session, currentSongId]);

  const debounceVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch(err => {});
    }, 500),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100){
        debounceVolume(volume);
    }
  }, [volume])

  return (
    <Fragment>
      <div className="text-white h-24 bg-gradient-to-b from-black to-gray-900 text-xs md:text-base px-2 md:px-8 grid grid-cols-3">
        {/* col 1 */}
        <div className="flex items-center space-x-3">
          <img
            className="hidden md:inline h-10 w-10"
            src={songInfo?.album.images?.[0].url}
            alt=""
          />
          <div>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists?.[0]?.name}</p>
          </div>
        </div>

        {/* col 2 */}
        <div className="flex items-center justify-evenly">
          <SwitchHorizontalIcon className="button" />
          <RewindIcon className="button" />
          {isPlaying ? (
            <PauseIcon
              className="button w-10 h-10"
              onClick={playPauseHandler}
            />
          ) : (
            <PlayIcon className="button w-10 h-10" onClick={playPauseHandler} />
          )}
          <FastForwardIcon className="button" />
          <ReplyIcon className="button" />
        </div>

        {/* col 3 */}
        <div className="flex items-center justify-end space-x-3 md:space-x-4 pr-4">
          <VolumeUpIcon className="button" />
          <input
            type="range"
            value={volume}
            min={0}
            max={100}
            className="w-14 md:w-28"
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Player;
