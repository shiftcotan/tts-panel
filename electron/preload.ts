import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args)
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },
  removeAllListeners(
    ...args: Parameters<typeof ipcRenderer.removeAllListeners>
  ) {
    const [channel, ...omit] = args;
    return ipcRenderer.removeAllListeners(channel, ...omit);
  },

  showOpenDialog: () => {
    ipcRenderer.send("show-open-dialog");
  },

  stackImage: (filepath: string) => {
    ipcRenderer.send("stack-image", filepath);
  },

  stackRemoteImage: ({
    host,
    username,
    password,
    workingDirectory,
  }: {
    host: string;
    username: string;
    password: string;
    workingDirectory: string;
  }) => {
    ipcRenderer.send("stack-remote-image", {
      host,
      username,
      password,
      workingDirectory,
    });
  },

  listRemoteFiles: ({
    host,
    username,
    password,
    workingDirectory,
  }: {
    host: string;
    username: string;
    password: string;
    workingDirectory: string;
  }) => {
    ipcRenderer.send("list-remote-files", {
      host,
      username,
      password,
      workingDirectory,
    });
  },
});
