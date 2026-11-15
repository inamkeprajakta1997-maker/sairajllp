import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../components/corporate";
import { pageHead } from "../data/company";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Industrial & Logistics Solutions",
      "Dependable warehousing, logistics, manpower and industrial support from Sairaj LLP, Sahajpurwadi, Pune.",
      "/",
    ),
  component: Home,
});

