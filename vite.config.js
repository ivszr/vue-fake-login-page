import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import bcrypt from "bcryptjs"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})
