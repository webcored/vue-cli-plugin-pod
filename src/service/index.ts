import { Generate } from './services/generate';
import { Rename } from './services/rename';
import { DeleteFiles } from './services/delete';
import { Config } from './services/config';
import { apiTypeMock } from './types';

const generate: Generate = new Generate();
const rename: Rename = new Rename();
const deleteFiles: DeleteFiles = new DeleteFiles();
const config: Config = new Config();

// TODO: add example
const commands = (api: apiTypeMock): void => {
  api.registerCommand(
    'generate',
    {
      description: 'Generate files',
      usage: 'vue-cli-service generate <type> <component name or path>'
    },
    generate.exec.bind(generate, api)
  );

  api.registerCommand(
    'rename',
    {
      description: 'Rename files',
      usage:
        'vue-cli-service rename <existing component name or path> <component name or path>'
    },
    rename.exec.bind(rename, api)
  );

  api.registerCommand(
    'delete',
    {
      description: 'Delete files',
      usage: 'vue-cli-service delete <type> <component name or path>'
    },
    deleteFiles.exec.bind(deleteFiles, api)
  );

  api.registerCommand(
    'config',
    {
      description: 'Create pod config files',
      usage: 'vue-cli-service config'
    },
    config.copy.bind(config, api)
  );
};

export = commands;
