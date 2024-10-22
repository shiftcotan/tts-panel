import { spawn } from "child_process";
import { Notification } from "electron";

export function localStackImage(filepath: string) {
  const cp = spawn("tts", [filepath]);
  cp.on("close", () => {
    new Notification({
      title: "Image Stacked",
      body: `${filepath} stacked successfully`,
    }).show();
  });
}
