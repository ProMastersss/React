import { ITrack } from "./tracks";

export default interface PlayerState {
  activeTrack: ITrack | null;
  volume: number;
  duration: number;
  currentTime: number;
  isPause: boolean;
}
