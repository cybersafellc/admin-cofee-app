"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "../material-components";
import clientValidator from "@/utils/tokenizer/client-validator";
import { useRouter } from "next/navigation";
import { markAReady } from "@/utils/app/products/main";
import { getCookie } from "cookies-next";
import AlertError from "../AlertError";
import AlertSuccess from "../AlertSuccess";

export default function ReadyButton({ id }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const redirect = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleReady = async () => {
    setLoading(true);
    setError(false);
    await clientValidator(redirect);
    const access_token = getCookie("access_token");
    await markAReady(id, access_token, (err, data) => {
      if (err) {
        setErrMessage(err.message);
        setError(true);
        setLoading(false);
        setOpen(false);
        return;
      }
      setSuccessMessage("Successfully mark a Ready");
      setSuccess(true);
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };

  return (
    <>
      <AlertError open={error} title="Error" message={errMessage} />
      <AlertSuccess
        open={success}
        title="Success"
        href="/products"
        btnMessage="Reload"
        message={successMessage}
      />
      <Button size="lg" className="py-2" onClick={handleOpen}>
        Ready
      </Button>
      <Dialog open={open} handler={handleOpen} className="p-5">
        <DialogHeader>Is this product available?</DialogHeader>
        <DialogBody>
          If this type of coffee is available, please click "mark a ready". If
          not, click "cancel".
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="black"
            onClick={handleReady}
            loading={loading}
          >
            <span>Mark a Ready</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
