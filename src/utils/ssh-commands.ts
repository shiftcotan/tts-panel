export function listFilenames(directory: string, osType: "UNIX" | "WINDOWS") {
  if (osType === "UNIX") {
    return `cd ${directory} && ls -a`;
  } else {
    return `cd ${directory} && dir /b`;
  }
}

export function stackImage(filepath: string) {
  return `tts ${filepath}`;
}
