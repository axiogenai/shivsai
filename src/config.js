// Production-ready API Configuration
// Overridden by VITE_API_URL and VITE_ADMIN_URL environment variables in production
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
export const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5176'
