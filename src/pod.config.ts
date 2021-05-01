import { CONFIG, DFunction } from "./service/types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const extend = function(configMethod: DFunction<CONFIG>) {
  return configMethod;
};

const defaultConfigMethod = (name: string): CONFIG => ({
  component: {
    singleFile: false,
    files: [
      {
        filename: `${name}`,
        basepath: `src/components/${name}`,
        extension: 'vue',
        content: `<div><!-- component : ${name} --></div>`,
        tagname: 'template',
        isTemplateFile: true,
      },
      {
        filename: 'style',
        basepath: `src/components/${name}`,
        extension: 'css',
        content: `.${name} { /*  your styles ... */ }`,
        tagname: 'style',
        tagAttributes: {
          'type': 'css',
          'scoped': 'true'
        }
      },
      {
        filename: 'script',
        basepath: `src/components/${name}`,
        extension: 'js',
        content: `export default { /* component: ${name} */ }`,
        tagname: 'script',
      },
      {
        filename: 'test',
        basepath: `src/components/${name}`,
        extension: 'js',
        content: `export default { /* component: ${name} */ }`,
      }
    ]
  },
  directive: {
    files: [
      {
        filename: `${name}`,
        basepath: `src/directivies/${name}`,
        extension: 'js',
        content: `export default { /* component: ${name} */ }`,
      },
      {
        filename: 'test',
        basepath: `src/directivies/${name}`,
        extension: 'js',
        content: `export default { /* component: ${name} */ }`,
      }
    ]
  },
  mixins: {
    files: [
      {
        filename: `${name}`,
        basepath: `src/mixins/${name}`,
        extension: 'js',
        content: `export default { /* component: ${name} */ }`,
      },
      {
        filename: 'test',
        basepath: `src/mixins/${name}`,
        extension: 'js',
        content: `export default { /* component: ${name} */ }`,
      },
    ]
  }
});

export {
  extend,
  defaultConfigMethod
};
