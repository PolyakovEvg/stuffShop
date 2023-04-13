import React from "react";
import { Routes, Route } from "react-router-dom";
import { router } from "./index";

const AppRouter = () => {
  return (
      <Routes>
        {router.map((route) => {
          return (
            <Route key={route.path} path={route.path} Component={route.component} />
          );
        })}
      </Routes>
  );
};

export default AppRouter;
