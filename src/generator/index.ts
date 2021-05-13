/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export = (api: any): void => {
  api.extendPackage({
    scripts: {
      generate: 'vue-cli-service generate',
      rename: 'vue-cli-service rename',
      delete: 'vue-cli-service delete',
      config: 'vue-cli-service config'
    }
  });
};
