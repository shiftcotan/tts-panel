import {
  ArrowRight,
  Check,
  Folder,
  Settings,
  SquareArrowOutUpRight,
} from "lucide-react";
import "./App.css";

function App() {
  return (
    <main className="max-w-screen min-h-screen bg-[#141535ff] text-white p-6 flex flex-col gap-6">
      <header className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">TTS Panel</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 rounded-md hover:bg-blue-600">
            <Folder className="size-4" />
            Choose root folder
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-orange-500 rounded-md hover:bg-orange-600">
            <Settings className="size-4" />
            Settings
          </button>
        </div>
      </header>
      {/* <section className="w-full h-full bg-[#131322] min-h-[800px]">
      </section> */}
      <div className="flex flex-col gap-1">
        <section className="grid grid-cols-3 gap-1 mb-2">
          <h2>Unprocessed</h2>
          <h2>Stacked</h2>
          <h2>Edited</h2>
        </section>
        <div className="grid grid-cols-3 gap-1">
          <UnprocessedFile />
          <StackedFile />
          <EditedFile />
        </div>
        <div className="grid grid-cols-3 gap-1">
          <UnprocessedFile />
          <StackedFile />
        </div>
        <div className="grid grid-cols-3 gap-1">
          <UnprocessedFile />
        </div>
      </div>
    </main>
  );
}

const UnprocessedFile = () => {
  return (
    <div className="flex justify-between px-5 py-3 pr-3 text-sm border rounded-md cursor-pointer group bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20">
      <p>image.wav</p>
      <button className="items-center hidden gap-2 group-hover:flex">
        Stack! <ArrowRight className="size-4" />
      </button>
    </div>
  );
};

const StackedFile = () => {
  return (
    <div className="flex justify-between px-5 py-3 pr-3 text-sm border rounded-md cursor-pointer group bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20">
      <p>image.jpg</p>
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
