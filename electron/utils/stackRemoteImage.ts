// @ts-ignore
import { Client } from "electron-ssh2";
import { BrowserWindow } from "electron";
import { stackImage } from "../../src/utils/ssh-commands";
import { Notification } from "electron";

interface connectSshParams {
  browserWindow: BrowserWindow;
  host: string;
  username: string;
  password: string;
  workingDirectory: string;
}

export function stackRemoteImage(params: connectSshParams) {
  const { host, username, password, workingDirectory, browserWindow } = params;

  let conn = new Client();

  try {
    conn
      .on("ready", function () {
        console.log("Client :: ready");
        conn.exec(
          stackImage(workingDirectory),
          function (err: any, stream: any) {
            if (err) throw err;
            stream
              .on("close", function () {
                new Notification({
                  title: "Image Stacked",
                  body: `${workingDirectory} stacked successfully`,
                }).show();
                conn.end();
              })
              .on("data", function (data: Buffer) {
                browserWindow.webContents.send(
                  "ssh-data",
                  Buffer.from(data).toString()
                );
              })
              .stderr.on("data", function (data: any) {
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
