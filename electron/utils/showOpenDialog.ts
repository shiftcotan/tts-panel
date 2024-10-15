import { BrowserWindow, dialog } from "electron";
import fs from "node:fs";
import chokidar from "chokidar";

export async function showOpenDialog(browserWindow: BrowserWindow) {
  const result = await dialog.showOpenDialog(browserWindow, {
    properties: ["openDirectory"],
  });

  if (result.canceled) return;

  function syncFilenames() {
    const [filePath] = result.filePaths;
    const contents = fs.readdirSync(filePath);
    listFilenames(browserWindow, filePath, contents);
    console.info("Something changed");
  }

  let watcher = chokidar.watch(result.filePaths, {
    persistent: true,
    ignoreInitial: true,
  });

  watcher
    .on("add", syncFilenames)
    .on("change", syncFilenames)
    .on("unlink", syncFilenames) //TODO: watcher not listen on file removal
    .on("error", console.error)
    .on("ready", () => {
      console.info("Ready");
      syncFilenames();
    });
}

async function listFilenames(
  browserWindow: BrowserWindow,
  filePath: string,
  contents: string[]
) {
  browserWindow.webContents.send("root-folder", filePath);
  browserWindow.webContents.send("filenames", contents);
}
