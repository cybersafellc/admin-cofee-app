"use client";

import { useState } from "react";
import { Typography, Input, Button } from "../material-components";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { login } from "@/utils/app/login/main";
import AlertError from "../AlertError";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function Form() {
  const redirect = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMess, setErrMess] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeUsername = ({ target }) => setUsername(target.value);
  const onChangePassword = ({ target }) => setPassword(target.value);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const form = {
      username: username,
      password: password,
    };
    const response = await login(form, (err, success) => {
      if (err) {
        setErrMess(err.message);
        setError(true);
        setLoading(false);
      }
      return success;
    });
    if (response) {
      setCookie("access_token", response.data.access_token);
      setCookie("refresh_token", response.data.refresh_token);
      redirect.push("/dashboard");
    }
    return;
  };
  return (
    <>
      <AlertError open={error} title="Login Failed" message={errorMess} />
      <form
        action="#"
        className="mx-auto max-w-[24rem] text-left"
        onSubmit={handleLogin}
      >
        <div className="mb-6">
          <label htmlFor="email">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Username
            </Typography>
          </label>
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Password
            </Typography>
          </label>
          <Input
            label="Password"
            type={passwordShown ? "text" : "password"}
            icon={
              <i onClick={togglePasswordVisiblity}>
                {passwordShown ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" />
                )}
              </i>
            }
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <Button
          color="gray"
          size="lg"
          className="mt-8 py-2 flex justify-center items-center"
          fullWidth
          type="submit"
          loading={loading}
        >
          sign in
        </Button>
      </form>
    </>
  );
}
