import { Fragment, useState } from "react";
import Playlist from "./PlayList";

const PlayLists = (props) => {
  return (
    <Fragment>
      {props.playlists?.map((playlist) => {
        return (
          <Playlist key={playlist.id} name={playlist.name} id={playlist.id} />
        );
      })}
    </Fragment>
  );
};

export default PlayLists;
