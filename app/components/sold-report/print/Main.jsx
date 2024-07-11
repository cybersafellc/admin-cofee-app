"use client";

import React, { useEffect } from "react";

export default function Main({ data }) {
  useEffect(() => {
    if (data) {
      window.print();
    }
  }, []);
  return <></>;
}
