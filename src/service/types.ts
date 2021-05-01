interface DynamicObjects {
  [key: string]: string | boolean;
}

interface apiTypeMock {
  getCwd: () => string;
  registerCommand: (
    command:string,
    object: DynamicObjects,
    method: (_options: null, args: string[]) => Promise<void> | void,
  ) => void;
}


interface FileOptions {
  filename: string;
  extension: string;
  content: string;
  basepath?: string;
  tagname?: string;
  isTemplateFile?: boolean
  tagAttributes?: DynamicObjects
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

export {
  apiTypeMock,
  DynamicObjects,
  FileOptions,
  FileObjects,
  CONFIG,
  setFileInfoResponse,
  DFunction
};

