import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repoSlug = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base =
  process.env.GITHUB_ACTIONS && repoSlug ? `/${repoSlug}/` : '/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
})
