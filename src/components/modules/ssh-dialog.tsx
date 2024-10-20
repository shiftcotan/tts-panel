import { MonitorCogIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

const SshDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-orange-500 rounded-md hover:bg-orange-600">
          <MonitorCogIcon className="size-4" />
          Connect via SSH
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="text-white">
        <div className="flex flex-col gap-1">
          <label htmlFor="host" className="text-sm">
            Host
          </label>
          <Input
            type="text"
            placeholder="Host (example: 192.168.209.25)"
            id="host"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <Input type="text" placeholder="Username" id="username" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <Input type="password" placeholder="Password" id="password" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="wd" className="text-sm">
            Working Directory
          </label>
          <Input type="text" placeholder="Working Directory" id="wd" />
        </div>
        <AlertDialogFooter>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button>Connect</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SshDialog;
