import { apiTypeMock, FileObjects } from "../types";
import { Common } from "./common";
import { renameSync, ensureDirSync, existsSync } from 'fs-extra';

class Rename extends Common {
  async exec(api: apiTypeMock, _options: null, args: string[]): Promise<void> {
    // parse input
    const [type, oldPath, newPath] = args;

    if (!type || !oldPath || !newPath) {
      this.throwInvalidateError();
    }


    this.projectPath = api.getCwd();

    const oldFileInfo = this.setFileInfo(oldPath);
    const newFileInfo = this.setFileInfo(newPath);

    const oldConfig = await this.setConfig(oldFileInfo.fileName);
    const newConfig = await this.setConfig(newFileInfo.fileName, true);


    // type config
    const oldFiles: FileObjects = oldConfig[type];
    const newFiles: FileObjects = newConfig[type];

    this.renameFiles(oldFiles, newFiles);
  }

  renameFiles(
    oldFiles: FileObjects,
    newFiles: FileObjects,
  ): void {
    oldFiles.files.forEach((file, index) => {
      const { filePath: oldFilePath, fileDir: oldFileDir } = this.constructFilePath(file);
      const { filePath: newFilePath, fileDir: newFileDir } = this.constructFilePath(newFiles.files[index]);
      // old file present
      if (existsSync(oldFilePath)) {
        ensureDirSync(newFileDir);
        renameSync(oldFilePath, newFilePath);
        this.deleteDir(oldFileDir);
        this.log('success', `Renamed: ${oldFilePath} -> ${newFilePath}`);
      } else {
        this.log('error', `File not exists to rename: ${oldFilePath} -> ${newFilePath}`);
      }
    });
  }
}

export { Rename };