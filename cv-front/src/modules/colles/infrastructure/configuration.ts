const dev = process.env.NODE_ENV !== "production";
export const URL_PREFIX = dev ? "http://localhost:8080" : "";
