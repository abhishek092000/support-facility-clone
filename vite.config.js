import react from '@vitejs/plugin-react'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { defineConfig } from 'vite'

// Locate a PHP binary. PHP_BIN always wins; otherwise the usual Windows
// bundles are probed so `npm run dev` works without PATH changes.
function findPhp() {
  if (process.env.PHP_BIN) return process.env.PHP_BIN
  const candidates = [
    'C:/xampp/php/php.exe',
    'C:/wamp64/bin/php/php.exe',
    'C:/laragon/bin/php/php.exe',
    '/usr/bin/php',
    '/usr/local/bin/php',
  ]
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate
  }
  return 'php'
}

const PHP_BIN = findPhp()
const PHP_PORT = Number(process.env.PHP_PORT || 8123)

// The contact form posts to /api/send-mail.php. Vite cannot execute PHP, so in
// development and preview those requests are proxied to PHP's built-in server.
// Preview serves the built output, mirroring how the site is deployed.
function phpServer() {
  const start = (docroot) => {
    const child = spawn(PHP_BIN, ['-S', `127.0.0.1:${PHP_PORT}`, '-t', docroot], {
      stdio: 'ignore',
    })
    child.on('error', () => {
      console.warn(
        `[php] could not start "${PHP_BIN}". Set PHP_BIN to your php binary or the form will return 502.`
      )
    })
    return child
  }

  let child
  return {
    name: 'php-dev-server',
    apply: 'serve',
    configureServer(server) {
      child = start('public')
      server.httpServer?.once('close', () => child?.kill())
      server.config.logger.info(`[php] ${PHP_BIN} serving /api on http://127.0.0.1:${PHP_PORT}`)
    },
    configurePreviewServer(server) {
      child = start('dist')
      server.httpServer?.once('close', () => child?.kill())
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), phpServer()],
  server: {
    proxy: {
      '/api': {
        target: `http://127.0.0.1:${PHP_PORT}`,
        changeOrigin: true,
      },
    },
  },
  preview: {
    proxy: {
      '/api': {
        target: `http://127.0.0.1:${PHP_PORT}`,
        changeOrigin: true,
      },
    },
  },
})
