import { atom } from "jotai";

interface Profile {
  host: string;
  username: string;
  password: string;
  workingDirectory: string;
}

const sshProfileAtom = atom<Profile>();

export default sshProfileAtom;
