import { writeFileSync } from 'fs-extra';
import { defaultConfigMethod } from '../../pod.config';
import { apiTypeMock, CONFIG, FileOptions } from '../types';
import { Common } from './common';

class Config extends Common {
  copy(api: apiTypeMock): void {
    const projectPath: string = api.getCwd();

    // HACK: converting default configs to es6 literal file
    const config: CONFIG = defaultConfigMethod('${filename}');
    Object.keys(config).forEach((key) => {
      const typeConfig = config[key];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeConfig.files.forEach((file: any) => {
        Object.keys(file).forEach((obj) => {
          const value = file[obj as keyof FileOptions];
          if ((typeof value === 'string')) {
            file[obj] = value.includes('${filename}') ? '`' + value + '`' : `'${value}'`;
          }
        });
        return file;
      });
    });

    // HACK: to handle sub level
    config.component.files[1].tagAttributes = { type: `'css'`, scoped: true };

    const stringifiedConfig: string = JSON.stringify(config, null, 2).replace(/"/g, '');
    const template = `const vuepodConfig = require('vue-cli-plugin-pod/pod.config.js'); \n\nmodule.exports = vuepodConfig.extend(function(filename) { return ${stringifiedConfig}})`;

    const filePath = `${projectPath}/pod.config.js`;
    writeFileSync(filePath, template);
    this.log('success', `created config file: ${filePath}`);
  }
}

export { Config };