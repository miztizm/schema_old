// utils/brotli.ts
export const BrotliDecompress = (text: string) => {
    if (process.server) {
      const { brotliDecompressSync } = require('zlib')
      return brotliDecompressSync(Buffer.from(text, 'base64')).toString()
    }
    return decodeURIComponent(escape(atob(text)))
  }