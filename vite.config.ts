// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig, loadEnv } from 'vite' // Import loadEnv
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => { // Accept 'mode' argument
  const env = loadEnv(mode, process.cwd(), '') // Load env vars from .env files

  return {
    plugins: [react()],

    define: {
      'process.env': env  // Expose all env vars to client as process.env
    },
    base: "/react/",
    // server: {
    //   proxy: {
    //     '/api': { // Path in your React app that will trigger the proxy
    //       target: 'http://freeline.42web.io', // The target API server
    //       changeOrigin: true, // Important: Set this to true for CORS
    //       rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove the '/api' prefix when forwarding
    //     },
    //   },
    // },
  }
})