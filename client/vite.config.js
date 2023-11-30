import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/

export default {
  build: {
    rollupOptions: {
      external: ['react/jsx-runtime']
    }
  }
}
