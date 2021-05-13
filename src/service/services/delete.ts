import { removeSync } from 'fs-extra';
import { apiTypeMock, FileOptions } from "../types";
import { Common } from "./common";

class DeleteFiles extends Common {
  async exec(api: apiTypeMock, _options: null, args: string[]): Promise<void> {

    await this.setup(api.getCwd(), args);

    const typeConfig = this.config[this.fileType];

    let deletables: FileOptions[] = typeConfig.files;

    // delete component files
    if (this.fileType === 'component' && typeConfig.singleFile) {
      deletables = typeConfig.files.filter(file => !file.tagname); // delete only non tagables
    }

    this.deleteFiles(deletables);
  }

  deleteFiles(files: FileOptions[]): void {
    files.forEach((file) => {
      const { filePath, fileDir } = this.constructFilePath(file);
      this.log('error', `Deleted file: ${filePath}`);
      removeSync(filePath);
      this.deleteDir(fileDir);
    });
  }
}

export { DeleteFiles };

