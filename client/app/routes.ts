import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // The home/base URL path maps directly to the Dashboard
  index("./routes/dashboard.tsx"),

  // Matches path "/documents"
  route("documents", "./routes/documents.tsx"),
] satisfies RouteConfig;
