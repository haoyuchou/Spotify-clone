import { useRecoilState } from "recoil";
import { playlistIdState } from "../../atoms/playlistIdAtom";

const Playlist = (props) => {
  const { id } = props;

  const [playlistId, setPlayListId] = useRecoilState(playlistIdState);

  const playlistIdHandler = () => {
    console.log("you pick playlist ID: ", id);
    setPlayListId(id);
  };

  return (
    <p className="cursor-pointer hover:text-white" onClick={playlistIdHandler}>
      {props.name}
    </p>
  );
};

export default Playlist;
