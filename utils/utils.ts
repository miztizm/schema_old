// path-utils.ts
import { resolve, isAbsolute, sep } from 'path'
import { accessSync, constants, statSync } from 'fs'
import { isWindows } from 'std-env'

/**
 * Synchronously resolves a relative file path to an absolute path and ensures it exists.
 * @param relativePath - The relative file path to resolve.
 * @returns The normalized absolute file path.
 * @throws Will throw an error if the file does not exist.
 */
export function normalizedFilePathSync(relativePath: string): string {
  const absolutePath = resolve(__dirname, relativePath)
  const normalizedPath = isWindows ? absolutePath.replace(/\\/g, '/') : absolutePath

  try {
    accessSync(normalizedPath, constants.F_OK)
    return normalizedPath
  } catch (error) {
    throw new Error(`Failed to resolve and normalize the file path: ${error instanceof Error ? error.message : String(error)}`)
  }
}
