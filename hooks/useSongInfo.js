import useSpotify from "./useSpotify";

import { useRecoilState } from "recoil";
import { currentSongIdState } from "../atoms/songAtom";
import { useEffect, useState } from "react";

const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const [currentSongInfo, setCurrentSongInfo] = useState(null);
  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);

  useEffect(() => {
    // If there is a song currently playing
    console.log(`https://api.spotify.com/v1/tracks/${currentSongId}`);

    const fetchSongInfo = async () => {
      if (currentSongId) {
        const songInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentSongId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => {
          console.log(res);
          return res.json();
        });

        setCurrentSongInfo(songInfo);
        console.log(songInfo);
      }
    };

    fetchSongInfo();
  }, [spotifyApi, currentSongId]);

  return currentSongInfo;
};

export default useSongInfo;
