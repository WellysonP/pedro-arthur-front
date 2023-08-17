import React from "react";
import { BrowserRouter, Routes as RoutesDom, Route } from "react-router-dom";
import Index from "../pages/home";
import Guest from "../pages/guest";

export default function Routes() {
  return (
    <BrowserRouter>
      <RoutesDom>
        <Route path="/" element={<Index />} />
        <Route path="/convidado/:name" element={<Guest />} />
      </RoutesDom>
    </BrowserRouter>
  );
}