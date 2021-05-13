interface DynamicObjects {
  [key: string]: string | boolean;
}

interface apiTypeMock {
  getCwd: () => string;
  registerCommand: (
    command: string,
    object: DynamicObjects,
    method: (_options: null, args: string[]) => Promise<void> | void
  ) => void;
}

interface FileOptions {
  filepath: string;
  content: string;
  basepath?: string;
  tagname?: string;
  isTemplateFile?: boolean;
  tagAttributes?: DynamicObjects;
}

interface FileObjects {
  singleFile?: boolean;
  files: FileOptions[];
}

interface CONFIG {
  [key: string]: FileObjects;
}

interface setFileInfoResponse {
  filePath: string;
  fileName: string;
}

type DFunction<A> = (name: string) => A;

interface constructedFileOptions {
  fileDir: string;
  fileName: string;
  filePath: string;
}

export {
  apiTypeMock,
  DynamicObjects,
  FileOptions,
  FileObjects,
  CONFIG,
  setFileInfoResponse,
  DFunction,
  constructedFileOptions
};
