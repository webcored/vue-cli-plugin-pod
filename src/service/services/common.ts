import * as chalk from 'chalk';
import { rmdirSync } from 'fs-extra';
import { relative, parse } from 'path';
import { defaultConfigMethod } from '../../pod.config';
import {
  CONFIG,
  constructedFileOptions,
  DFunction,
  FileOptions,
  setFileInfoResponse
} from '../types';

class Common {
  public configFile: string;
  public config: CONFIG;
  public projectPath: string;

  public fileType: string;
  public filePath: string;
  public fileName: string;

  constructor() {
    this.configFile = '';
    this.config = {};
    this.projectPath = '';

    this.fileType = '';
    this.filePath = '';
    this.fileName = '';
  }

  async setup(projectPath: string, args: string[]): Promise<void> {
    // parse input
    const [type, file] = args;

    if (!type || !file) {
      this.throwInvalidateError();
    }

    this.projectPath = projectPath;
    this.fileType = type;

    const { fileName } = this.setFileInfo(file);
    await this.setConfig(fileName);

    // validate type
    this.validateType(type);
  }

  public async setConfig(fileName: string, silence = false): Promise<CONFIG> {
    let configMethod: DFunction<CONFIG>;
    let file: string;
    const configFilePath = 'pod.config.js';
    try {
      file = `${this.projectPath}/${configFilePath}`;
      configMethod = await import(file);
    } catch (e) {
      file = 'default';
      configMethod = defaultConfigMethod;
    }

    this.configFile = file;
    this.config = configMethod(fileName);

    if (!silence) {
      const msg: string =
        file === 'default'
          ? 'Using default config...'
          : `Using config: ${file}`;
      this.log('info', msg);
    }

    return this.config;
  }

  public setFileInfo(path: string): setFileInfoResponse {
    const split: string[] = path.split('/');
    const fileName: string = split[split.length - 1];

    // path
    split.pop();
    const filePath = split.join('/');

    this.filePath = filePath;
    this.fileName = fileName;

    return { filePath, fileName };
  }

  public validateType(type: string): void {
    const types: string[] = Object.keys(this.config);
    if (!types.includes(type)) {
      this.log(
        'error',
        `Invalid type '${type}' requested. Allowed types: [${types.join(', ')}]`
      );
      process.exit();
    }
  }

  public constructFilePath(
    file: FileOptions,
    customFilePath?: string
  ): constructedFileOptions {
    let fileFulPath = `.`;

    // base path
    if (file.basepath) {
      fileFulPath += `/${file.basepath}`;
    }

    // file requested path
    const fileLoc = customFilePath || this.filePath;
    if (this.filePath) {
      fileFulPath += `/${fileLoc}`;
    }

    // config file path
    fileFulPath += `/${file.filepath}`;

    const { dir: fileDir, base: fileName } = parse(fileFulPath);
    return {
      fileDir,
      fileName,
      filePath: fileFulPath
    };
  }

  public log(type: string, msg: string): void {
    let coloredMsg: string | undefined;
    switch (type) {
      case 'info':
        coloredMsg = chalk.blue(msg);
        break;
      case 'error':
        coloredMsg = chalk.red(msg);
        break;
      case 'success':
        coloredMsg = chalk.greenBright(msg);
        break;
      case 'warning':
        coloredMsg = chalk.yellowBright(msg);
        break;
    }

    console.log(coloredMsg);
  }

  public throwInvalidateError(): void {
    this.log('error', 'Arguments missing, try vue-cli-service help');
    process.exit();
  }

  public getRelativePath(templateFilePath: string, filePath: string): string {
    const rPath: string = relative(templateFilePath, filePath);
    return rPath.includes('/') ? rPath : `./${rPath}`;
  }

  public deleteDir(dirpath: string): void {
    // deletes directory recursively if empty
    const paths: string[] = dirpath.split('/');
    let fullpath: string = dirpath;

    while (paths.length) {
      try {
        rmdirSync(fullpath);
        paths.pop();
        fullpath = paths.join('/');
      } catch (e) {
        break;
      }
    }
  }
}

export { Common };
