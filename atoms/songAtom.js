import { atom } from "recoil";

export const currentSongIdState = atom({
  key: "currentSongIdState",
  default: null,
  //set the defaul song we are playing
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
