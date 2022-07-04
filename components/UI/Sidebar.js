import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../../hooks/useSpotify";
//import { useRecoilState } from "recoil";
//import { playlistIdState } from "../../atoms/playlistIdAtom";

import PlayLists from "./PlayLists";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const [playlists, setPlayLists] = useState([]);
  //const [playlistId, setPlayListId] = useRecoilState(playlistIdState);

  const spotifyApi = useSpotify();
  
  //console.log("Your Spotify API: ", spotifyApi);
  //console.log("Session: ", session);

  useEffect(() => {
    // if have token
    if (spotifyApi.getAccessToken()) {
      console.log("we got the access token");

      spotifyApi
        .getUserPlaylists()
        .then(function (data) {
          //console.log("Retrieved playlists", data.body.items);
          setPlayLists(data.body.items);
        })
        .catch((err) => {
          console.log("Probably the token has expired");
          console.log("Something went wrong when fetching user playlist!", err);
        });
    }
  }, [spotifyApi, session]);

  /*const playlistIdHandler = (id) => {
    setPlayListId(id);
  };*/

  return (
    <div
      className="text-gray-600 p-5 text-sm lg:text-lg sm:max-w-[12rem] lg:mex-w-[20rem]
    border-gray-900 overflow-y-scroll h-screen scrollbar-hide hidden md:inline-flex pb-36"
    >
      {/* top section for the sidebar */}
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* My PlaceList */}
        {<PlayLists playlists={playlists} />}
      </div>
    </div>
  );
};

export default Sidebar;
