import { spawn } from "child_process";

export function stackImage(filepath: string) {
  const newName = filepath.replace(".png", "-stacked.png");

  if (process.env.NODE_ENV === "production") {
    console.log("Start stacking");
    const cp = spawn("tts", [filepath]);
    cp.on("close", () => {
      console.log("Stacking finished");
    });
  } else {
    console.log("start copying");
    const cp = spawn("cp", [filepath, newName]);
    cp.on("close", () => {
      console.log("finished");
    });
  }
}
