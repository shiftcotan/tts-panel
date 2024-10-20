import FolderIcon from "../../assets/folder.svg";

const NoWorkspace = () => {
  return (
    <div className="flex flex-col gap-12 items-center justify-center w-full h-full min-h-[640px]">
      <img src={FolderIcon} alt="" className="w-[240px]" />
      <div className="flex flex-col gap-2">
        <p className="text-3xl font-semibold text-center text-white">Ready to stack?</p>
        <p className="text-sm text-center text-slate-400">
          Pick a workspace from local files <br /> or connect to other computer with SSH
        </p>
      </div>
    </div>
  );
};

export default NoWorkspace;
