import React, { useState } from "react";
import { BrowserRouter, Routes as RoutesDom, Route } from "react-router-dom";
import Index from "../pages/home";
import Guest from "../pages/guest";
import Error from "../pages/error"

export default function Routes() {
  return (
    <BrowserRouter>
      <RoutesDom>
        <Route path="/home/Amanda&Miguel" element={<Index />} />
        <Route path="/guest/:id" element={<Guest />} />
        <Route path="/*" element={<Error />} />
      </RoutesDom>
    </BrowserRouter>
  );
}