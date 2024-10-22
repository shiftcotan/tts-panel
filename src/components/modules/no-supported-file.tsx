import NoSupportedFileIcon from "../../assets/no-supported-file.svg";

const NoSupportedFile = () => {
  return (
    <div className="flex flex-col gap-12 items-center justify-center w-full h-full min-h-[640px]">
      <img src={NoSupportedFileIcon} alt="" className="h-[240px]" />
      <div className="flex flex-col gap-2">
        <p className="text-3xl font-semibold text-center text-white">
          No compatible files found!
        </p>
        <p className="text-sm text-center text-slate-400">
          TapToStack only works with .avi files
          <br />
          Please select a workspace containing supported format
        </p>
      </div>
    </div>
  );
};

export default NoSupportedFile;
