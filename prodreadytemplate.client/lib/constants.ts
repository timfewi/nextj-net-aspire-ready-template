// lib/constant.js
export const APIEndpoint =
    typeof window === "undefined"
        ? "https://localhost:5001/api"
        : "/api";