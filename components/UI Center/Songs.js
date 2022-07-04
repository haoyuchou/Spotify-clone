import { useRecoilValue } from "recoil";
import { playlistState } from "../../atoms/playlistIdAtom";
import Song from "./Song";

const Songs = () => {
  const currentPlayList = useRecoilValue(playlistState);
  //console.log("Songs: ", currentPlayList);

  return (
    <div className="text-white px-8 space-y-2 flex flex-col">
      {currentPlayList?.tracks.items.map((song, idx) => {
        //console.log(song.track.id);
        return <Song key={song.track.id} song={song} number={idx} />;
      })}
    </div>
  );
};

export default Songs;
