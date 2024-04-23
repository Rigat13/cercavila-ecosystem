const dev = process.env.NODE_ENV !== "production";
export const URL_PREFIX = dev ? "http://81.25.126.202:8080" : "http://81.25.126.202:8080";

// ALTERNATIVE: If wanted to use cv-front localhost with cv-api localhost | --> cv-front deployed with cv-api deployed
//export const URL_PREFIX = dev ? "http://localhost:8080" : "http://81.25.126.202:8080";
