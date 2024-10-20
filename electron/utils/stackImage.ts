import { spawn } from "child_process";
import { Notification } from "electron";

export function stackImage(filepath: string) {
  const newName = filepath.replace(".png", "-stacked.png");

  if (process.env.NODE_ENV === "production") {
    new Notification({
      title: "Image Stacked",
      body: `${filepath} stacked successfully`,
    }).show();

    const cp = spawn("tts", [filepath]);
    cp.on("close", () => {
      new Notification({
        title: "Image Stacked",
        body: `${filepath} stacked successfully`,
      }).show();
    });
  } else {
    new Notification({
      title: "Image Stacked",
      body: `${filepath} stacked successfully`,
    }).show();

    const cp = spawn("cp", [filepath, newName]);
    cp.on("close", () => {
      new Notification({
        title: "Image Stacked",
        body: `${filepath} stacked successfully`,
      }).show();
    });
  }
}
