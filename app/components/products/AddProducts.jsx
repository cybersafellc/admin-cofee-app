"use client";

import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "../material-components";
import AlertError from "../AlertError";
import { addProducts } from "@/utils/app/products/main";
import clientValidator from "@/utils/tokenizer/client-validator";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import AlertSuccess from "../AlertSuccess";

export default function AddProducts() {
  const redirect = useRouter();

  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const handleOpen = () => setOpen(!open);
  const handleAddPhoto = ({ target }) => setFile(target.files[0]);
  const onChangeName = ({ target }) => setName(target.value);
  const onChangePrice = ({ target }) => setPrice(target.value);
  const onChangeDescription = ({ target }) => setDescription(target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(false);
    if (!file || !name || !price || !description) {
      setAlertMessage("Please input all data required");
      setAlert(true);
      setLoading(false);
      setTimeout(() => {
        setAlert(false);
      }, 5000);
      return;
    }
    await clientValidator(redirect);
    const access_token = getCookie("access_token");
    const formData = new FormData();
    formData.append("images", file);
    const form = {
      formData: formData,
      name: name,
      price: price,
      description: description,
    };
    await addProducts(form, access_token, (err, data) => {
      if (err) {
        setAlertMessage(err.message);
        setAlert(true);
        setLoading(false);
        setTimeout(() => {
          setAlert(false);
        }, 5000);
        return;
      }
      setOpen(false);
      setSuccessMessage(`Successfully added new products ${data.name}`);
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
        title="Success"
        btnMessage="Reload"
        href="/products"
        message={successMessage}
        open={success}
      />
      <div
        className="w-full min-h-[420px] rounded-lg shadow-lg flex  items-center justify-center cursor-pointer border"
        onClick={handleOpen}
      >
        <i className="bx bx-plus text-4xl"></i> Add product
      </div>

      <Dialog open={open} handler={handleOpen} className="p-5">
        <AlertError title="Error" open={alert} message={alertMessage} />
        <form onSubmit={handleSubmit}>
          <DialogHeader>Add Product</DialogHeader>
          <DialogBody className="flex flex-col gap-3">
            <Input
              label="Name"
              placeholder="Name"
              type="text"
              onChange={onChangeName}
              value={name}
            />
            <Input
              label="Price"
              placeholder="Price"
              type="number"
              onChange={onChangePrice}
              value={price}
            />
            <Textarea
              label="Description"
              type="text"
              onChange={onChangeDescription}
              value={description}
            />
            <Input label=" Image" type="file" onChange={handleAddPhoto} />
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
              type="submit"
              loading={loading}
            >
              <span>Add</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
