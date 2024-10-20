import {
  Check,
  Folder,
  MonitorCogIcon,
  Settings,
  SquareArrowOutUpRight,
} from "lucide-react";
import "./App.css";
import { useEffect, useState } from "react";
import UnprocessedFile from "./components/modules/unprocessed";
import SshDialog from "./components/modules/ssh-dialog";

function App() {
  const [rootFolder, setRootFolder] = useState("");
  const [filenames, setFilenames] = useState<string[]>([]);

  useEffect(() => {
    window.ipcRenderer.on("filenames", (_, content) => {
      setFilenames(content);
    });
    window.ipcRenderer.on("root-folder", (_, path: string) => {
      setRootFolder(path);
    });

    return () => {
      window.ipcRenderer.removeAllListeners("filenames");
      window.ipcRenderer.removeAllListeners("root-folder");
    };
  }, []);

  function chooseRootFolder() {
    (window.ipcRenderer as any).showOpenDialog();
  }

  function isStacked(filename: string) {
    return filenames.includes(`${filename.replace(".wav", "")}.jpeg`);
  }

  function isEdited(filename: string) {
    return filenames.includes(`${filename.replace(".wav", "")}-e.jpeg`);
  }

  return (
    <main className="flex flex-col min-h-screen gap-6 p-6 text-white max-w-screen bg-background">
      <header className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">TTS Panel</h1>
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
              Choose root folder
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
      <div className="flex flex-col gap-1">
        <section className="grid grid-cols-3 gap-1 mb-2">
          <h2>Captures</h2>
          <h2>Stacked</h2>
          <h2>Edited</h2>
        </section>
        {filenames
          // .filter((file) => file.includes(".wav"))
          .map((file) => (
            <div className="grid grid-cols-3 gap-1">
              <UnprocessedFile name={file} directory={rootFolder} />
              {isStacked(file) ? (
                <StackedFile name={file.replace(".wav", "") + ".jpeg"} />
              ) : (
                <div></div>
              )}
              {isEdited(file) ? <EditedFile /> : <div></div>}
            </div>
          ))}
      </div>
    </main>
  );
}

const StackedFile = ({ name = "sample.jpeg" }: { name?: string }) => {
  return (
    <div className="flex justify-between px-5 py-3 pr-3 text-sm border rounded-md cursor-pointer group bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20">
      <p>{name}</p>
      <button className="items-center hidden gap-2 group-hover:flex">
        Open in GIMP <SquareArrowOutUpRight className="size-4" />
      </button>
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
