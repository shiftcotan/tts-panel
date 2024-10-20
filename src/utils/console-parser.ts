function consoleParser(output: string, mode: "UNIX" | "WINDOWS") {
  if (mode === "UNIX") {
    return output.split("\n").slice(2, -1);
  }

  return output
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.trim());
}

export default consoleParser;
