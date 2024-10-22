import { Check, Folder } from "lucide-react";
import "./App.css";
import { useEffect, useState } from "react";
import UnprocessedFile from "./components/modules/unprocessed";
import SshDialog from "./components/modules/ssh-dialog";
import { useAtom } from "jotai";
import sshModeAtom from "./atoms/ssh-mode";
import consoleParser from "./utils/console-parser";
import sshProfileAtom from "./atoms/ssh-profile";
import dayjs from "dayjs";
import NoWorkspace from "./components/modules/no-workspace";
import TTSPLogo from "./assets/tts-panel.png";
import NoSupportedFile from "./components/modules/no-supported-file";

function App() {
  const [sshMode, setSshMode] = useAtom(sshModeAtom);
  const [sshProfile] = useAtom(sshProfileAtom);
  const [lastSshSync, setLastSshSync] = useState<Date>();
  const [rootFolder, setRootFolder] = useState("");
  const [filenames, setFilenames] = useState<string[]>([]);

  useEffect(() => {
    window.ipcRenderer.on("filenames", (_, content) => {
      setFilenames(content);
    });
    window.ipcRenderer.on("root-folder", (_, path: string) => {
      setRootFolder(path);
    });

    (window.ipcRenderer as any).on("ssh-data", (_: any, content: string) => {
      if (content === "") return;

      setSshMode(true);
      setFilenames(consoleParser(content, "UNIX"));
    });

    return () => {
      window.ipcRenderer.removeAllListeners("filenames");
      window.ipcRenderer.removeAllListeners("root-folder");
      window.ipcRenderer.removeAllListeners("ssh-data");
    };
  }, []);

  useEffect(() => {
    if (!sshMode || !sshProfile) return;
    const interval = setInterval(() => {
      (window.ipcRenderer as any).listRemoteFiles(sshProfile);

      setLastSshSync(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, [sshMode, sshProfile]);

  function chooseRootFolder() {
    (window.ipcRenderer as any).showOpenDialog();
  }

  function isStacked(filename: string) {
    return filenames.includes(`${filename.replace(".avi", "")}.jpg`);
  }

  function isEdited(filename: string) {
    return filenames.includes(`${filename.replace(".avi", "")}-e.jpeg`);
  }

  return (
    <main className="flex flex-col min-h-screen gap-6 p-6 text-white max-w-screen bg-background">
      <header className="flex justify-between w-full">
        <div className="flex items-center gap-2">
          <img src={TTSPLogo} alt="TTS Panel" className="w-10" />
          <h1 className="text-2xl font-bold">TTS Panel</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex">
            <div className="px-4 py-2 text-sm rounded-l-md bg-white/10">
              {rootFolder === "" ? "Not selected yet." : rootFolder}
            </div>
            <button
              onClick={chooseRootFolder}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 rounded-r-md hover:bg-blue-600"
            >
              <Folder className="size-4" />
              Choose local workspace
            </button>
          </div>
          or
          <SshDialog />
        </div>
      </header>
      {/* <section className="grid grid-cols-5 w-full h-full min-h-[500px]">
        <div className="col-span-4 bg-[#131322] rounded-lg"></div>
        <div className="bg-[#141535ff] py-3 px-4">
        </div>
      </section> */}
      {lastSshSync && (
        <p className="fixed px-3 py-1 text-xs rounded-md bottom-3 left-3 bg-white/10">
          {`Last sync: ${dayjs(lastSshSync).format("DD MMM YYYY HH:mm:ss")}`}
        </p>
      )}
      {(filenames.length !== 0 || sshMode) &&
        filenames.filter((file) => file.includes(".avi"))[0] && (
          <div className="flex flex-col gap-1">
            <section className="grid grid-cols-3 gap-1 mb-2">
              <h2>Captures</h2>
              <h2>Stacked</h2>
              <h2>Edited</h2>
            </section>
            {filenames
              .filter((file) => file.includes(".avi"))
              .map((file) => (
                <div className="grid grid-cols-3 gap-1">
                  <UnprocessedFile name={file} directory={rootFolder} />
                  {isStacked(file) ? (
                    <StackedFile name={file.replace(".avi", "") + ".jpg"} />
                  ) : (
                    <div></div>
                  )}
                  {isEdited(file) ? <EditedFile /> : <div></div>}
                </div>
              ))}
          </div>
        )}

      {filenames.length === 0 && !sshMode && <NoWorkspace />}
      {filenames.filter((file) => file.includes(".avi")).length === 0 && (
        <NoSupportedFile />
      )}
    </main>
  );
}

const StackedFile = ({ name = "sample.jpeg" }: { name?: string }) => {
  return (
    <div className="flex justify-between px-5 py-3 pr-3 text-sm border rounded-md cursor-pointer group bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20">
      <p>{name}</p>
      {/* <button className="items-center hidden gap-2 group-hover:flex">
        Open in GIMP <SquareArrowOutUpRight className="size-4" />
      </button> */}
    </div>
  );
};

const EditedFile = () => {
  return (
    <div className="flex justify-between px-5 py-3 pr-3 text-sm border rounded-md cursor-pointer bg-white/10 border-white/10 hover:bg-white/15">
      <p>image.jpg</p>
      <div className="flex items-center gap-1">
        <Check className="text-green-400 size-5" />
      </div>
    </div>
  );
};

export default App;
