import { MonitorCheck, MonitorCogIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import sshModeAtom from "../../atoms/ssh-mode";
import { useAtom } from "jotai";
import sshProfileAtom from "../../atoms/ssh-profile";
import cn from "../../utils/cn";

const SshDialog = () => {
  const [open, setOpen] = useState(false);
  const [sshMode] = useAtom(sshModeAtom);
  const [_, setSshProfile] = useAtom(sshProfileAtom);
  const formik = useFormik({
    initialValues: {
      host: "",
      username: "",
      password: "",
      workingDirectory: "",
    },
    onSubmit: (values) => {
      (window.ipcRenderer as any).listRemoteFiles(values);
    },
  });

  useEffect(() => {
    if (sshMode) {
      setSshProfile(formik.values);
      setOpen(false);
    }
  }, [sshMode]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <button
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm bg-orange-500 rounded-md hover:bg-orange-600",
            sshMode && "bg-emerald-600 hover:bg-emerald-700"
          )}
        >
          {sshMode ? (
            <MonitorCheck className="size-4" />
          ) : (
            <MonitorCogIcon className="size-4" />
          )}
          {sshMode ? "Connected" : "Connect via SSH"}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="text-white">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="host" className="text-sm">
              Host
            </label>
            <Input
              {...formik.getFieldProps("host")}
              type="text"
              placeholder="Host (example: 192.168.209.25)"
              id="host"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <Input
              {...formik.getFieldProps("username")}
              type="text"
              placeholder="Username"
              id="username"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <Input
              {...formik.getFieldProps("password")}
              type="password"
              placeholder="Password"
              id="password"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="wd" className="text-sm">
              Working Directory
            </label>
            <Input
              {...formik.getFieldProps("workingDirectory")}
              type="text"
              placeholder="Working Directory"
              id="wd"
            />
          </div>

          <AlertDialogFooter>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Connect</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SshDialog;
