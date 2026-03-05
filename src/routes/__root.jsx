import * as React from "react";
import { Outlet, createRootRoute, useRouter } from "@tanstack/react-router";
import Header from "../components/Header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();
  const { mode, setMode } = router.options.context;

  return (
    <>
      <Header mode={mode} setMode={setMode} />
      <Outlet />
    </>
  );
}