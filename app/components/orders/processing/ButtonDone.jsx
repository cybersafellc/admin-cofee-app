"use client";

import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "../../material-components";
import AlertError from "../../AlertError";
import AlertSuccess from "../../AlertSuccess";
import clientValidator from "@/utils/tokenizer/client-validator";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { markADone } from "@/utils/app/orders/processing/main";

export default function ButtonDone({ id }) {
  const redirect = useRouter();

  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleDone = async () => {
    setLoading(true);
    setError(false);
    await clientValidator(redirect);
    const access_token = getCookie("access_token");
    await markADone(access_token, id, (err, data) => {
      if (err) {
        setErrorMessage(err.message);
        setError(true);
        setLoading(false);
        setTimeout(() => {
          setError(false);
        }, 5000);
        return;
      }
      setOpen(false);
      setSuccessMessage("Successfully Mark a Done");
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
    return;
  };
  return (
    <>
      <AlertSuccess
        btnMessage="Reload"
        href="/orders/processing"
        open={success}
        message={successMessage}
        title="Success"
      />
      <Button
        onClick={handleOpen}
        className="w-full flex justify-center items-center bg-green-100 text-green-800 border border-green-800 py-1 "
        disabled={false}
      >
        Done
      </Button>
      <Dialog open={open} handler={handleOpen} className="p-5">
        <AlertError open={error} title="Error" message={errorMessage} />
        <DialogHeader>Confirmation</DialogHeader>
        <DialogBody>Has this order been completed?</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>No</span>
          </Button>
          <Button
            variant="gradient"
            color="black"
            onClick={handleDone}
            loading={loading}
          >
            <span>Yes</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
