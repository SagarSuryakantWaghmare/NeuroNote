// Environment variables (Vite automatically loads variables prefixed with VITE_)
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
export const NODE_ENV = import.meta.env.VITE_NODE_ENV || "development";
export const APP_NAME = import.meta.env.VITE_APP_NAME || "NeuroNote";
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || "1.0.0";

// API Configuration
export const API_BASE_URL = BACKEND_URL ? `${BACKEND_URL}/api/v1` : "/api/v1";