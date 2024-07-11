"use client";
import { PowerIcon } from "@heroicons/react/24/solid";
import {
  ListItem,
  ListItemPrefix,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "./material-components";
import React from "react";
import { deleteCookie } from "cookies-next";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const redirect = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleLogout = () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    redirect.push("/login");
  };
  return (
    <>
      <ListItem onClick={handleOpen}>
        <ListItemPrefix>
          <PowerIcon className="h-5 w-5" />
        </ListItemPrefix>
        Log Out
      </ListItem>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Are you sure to Logout?</DialogHeader>
        <DialogBody>Yes or no haha :/</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="black" onClick={handleLogout}>
            <span>Logout</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
