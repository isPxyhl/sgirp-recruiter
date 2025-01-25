import fs from "fs/promises"
import path from "path"

const storageFile = path.join(process.cwd(), "data", "users.json")

export async function readStorage() {
  try {
    const data = await fs.readFile(storageFile, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    return {}
  }
}

export async function writeStorage(data: object) {
  await fs.mkdir(path.dirname(storageFile), { recursive: true })
  await fs.writeFile(storageFile, JSON.stringify(data, null, 2))
}

