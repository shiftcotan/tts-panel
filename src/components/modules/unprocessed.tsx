import { ArrowRight } from "lucide-react";

interface Props {
  name: string;
  directory: string;
}

const UnprocessedFile = ({ name, directory: fullPath }: Props) => {
  function onStack(filepath: string) {
    (window.ipcRenderer as any).stackImage(filepath);
  }

  return (
    <div className="flex justify-between px-5 py-3 pr-3 text-sm border rounded-md cursor-pointer group bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20">
      <p>{name}</p>
      <button
        onClick={() => onStack(`${fullPath}/${name}`)}
        className="items-center hidden gap-2 group-hover:flex"
      >
        Stack! <ArrowRight className="size-4" />
      </button>
    </div>
  );
};

export default UnprocessedFile;
