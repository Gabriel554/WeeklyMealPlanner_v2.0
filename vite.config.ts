import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/WeeklyMealPlanner_v2.0/',
  build: {
    outDir: 'build'
  }
})
