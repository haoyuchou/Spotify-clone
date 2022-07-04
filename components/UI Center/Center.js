import { useSession, signOut } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";

import useSpotify from "../../hooks/useSpotify";
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../../atoms/playlistIdAtom";
import { shuffle } from "lodash";

import Songs from "./Songs";

const colors = [
  "from-red-500",
  "from-orange-500",
  "from-amber-500",
  "from-yellow-500",
  "from-lime-500",
  "from-green-500",
  "from-emerald-500",
  "from-teal-500",
  "from-cyan-500",
  "from-sky-500",
  "from-blue-500",
  "from-indigo-500",
  "from-violet-500",
  "from-purple-500",
  "from-fuchsia-500",
  "from-pink-500",
  "from-rose-500",
];

const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);

  // the detail of the current playlist (global state)
  const [playlist, setPlayList] = useRecoilState(playlistState);

  const spotifyApi = useSpotify();

  // get the current id (global state)
  const currentPlayListId = useRecoilValue(playlistIdState);

  // randomly select background color
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [currentPlayListId]);

  // Everytime we click different playlist
  useEffect(() => {
    spotifyApi
      .getPlaylist(currentPlayListId)
      .then((data) => {
        console.log(data.body);
        setPlayList(data.body);
      })
      .catch((err) => {
        console.log(
          "somthing went wrong when fetching the playlist you clicked!"
        );
      });
  }, [currentPlayListId, spotifyApi]);

  return (
    <Fragment>
      <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
        {/* Use grow to allow a flex item to grow to fill any available space: */}
        {/* Absolute takes the object out of the html flow */}
        <header className="absolute top-5 right-5">
          <div
            className="flex items-center space-x-2 opacity-90 hover:opacity-70 cursor-pointer bg-black rounded-full p-2 text-white"
            onClick={() => {
              signOut();
            }}
          >
            <img
              className="rounded-full w-10 h-10"
              src={session?.user?.image}
              alt="user image"
            />
            <h2>{session?.user?.name}</h2>
            <ChevronDownIcon className="w-5 h-5" />
          </div>
        </header>
        <section
          className={`flex items-end bg-gradient-to-b ${color} to-black h-80 text-white p-8`}
        >
          <img
            className="h-44 w-44 shadow-2xl"
            src={playlist?.images?.[0]?.url}
            alt=""
          />
          <div className="ml-5">
            <p>PUBLIC PLAYLIST</p>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
              {playlist?.name}
            </h1>
          </div>
        </section>

        <div>
          <Songs />
        </div>
      </div>
    </Fragment>
  );
};

export default Center;
