import { IAlbum } from "./albums";
import { IUser } from "./users";

export interface IComment {
  id: number;
  text: string;
  user: {
    name: string;
  };
  createdAt: number;
}

export interface ITrack {
  id: number;
  name: string;
  text: string;
  artist: string;
  listen: number;
  picture?: string;
  audio: string;
  album?: IAlbum;
  comments?: IComment[];
  user: IUser;
  createdAt: number;
}

export interface TrackState {
  tracks: ITrack[];
  error: string | null;
}
