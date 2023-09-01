import { defineConfig } from 'vite'

import tsconfigPaths from "vite-tsconfig-paths/dist"

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        globals: true
    }
})
