// @ts-ignore
import { Client } from "electron-ssh2";
import { BrowserWindow } from "electron";
import { listFilenames } from "../../src/utils/ssh-commands";

interface connectSshParams {
  browserWindow: BrowserWindow;
  host: string;
  username: string;
  password: string;
  workingDirectory: string;
}

export function listRemoteFiles(params: connectSshParams) {
  const { host, username, password, workingDirectory, browserWindow } = params;

  let conn = new Client();

  try {
    conn
      .on("ready", function () {
        console.log("Client :: ready");
        conn.exec(
          listFilenames(workingDirectory, "UNIX"),
          function (err: any, stream: any) {
            if (err) throw err;
            stream
              .on("close", function (code: number, signal: string) {
                console.log(
                  "Stream :: close :: code: " + code + ", signal: " + signal
                );
                conn.end();
              })
              .on("data", function (data: Buffer) {
                console.log("STDOUT: " + data);
                browserWindow.webContents.send(
                  "ssh-data",
                  Buffer.from(data).toString()
                );
              })
              .stderr.on("data", function (data: any) {
                console.log("STDERR: " + data);
                browserWindow.webContents.send("ssh-error", data);
              });
          }
        );
      })
      .connect({
        host,
        port: 22,
        username,
        password,
      });
  } catch (err) {
    console.log("Client :: error : " + err);
    browserWindow.webContents.send("ssh-error", err);
  }
}
