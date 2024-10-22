import { ArrowRight } from "lucide-react";
import sshProfileAtom from "../../atoms/ssh-profile";
import { useAtom } from "jotai";
import sshModeAtom from "../../atoms/ssh-mode";

interface Props {
  name: string;
  directory: string;
}

const UnprocessedFile = ({ name, directory }: Props) => {
  const [sshMode] = useAtom(sshModeAtom);
  const [sshProfile] = useAtom(sshProfileAtom);

  function onStack() {
    if (sshMode && sshProfile) {
      const filepath = `${sshProfile.workingDirectory}${directory}/${name}`;
      const params = {
        host: sshProfile.host,
        username: sshProfile.username,
        password: sshProfile.password,
        workingDirectory: filepath,
      };

      (window.ipcRenderer as any).stackRemoteImage(params);
    } else {
      const filepath = `${directory}/${name}`;
      (window.ipcRenderer as any).stackImage(filepath);
    }
  }

  return (
    <div className="flex justify-between px-5 py-3 pr-3 text-sm border rounded-md cursor-pointer group bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20">
      <p>{name}</p>
      <button
        onClick={() => onStack()}
        className="items-center hidden gap-2 group-hover:flex"
      >
        Stack! <ArrowRight className="size-4" />
      </button>
    </div>
  );
};

export default UnprocessedFile;
