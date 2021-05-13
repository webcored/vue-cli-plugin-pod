import { CONFIG, DFunction } from "./service/types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const extend = function(configMethod: DFunction<CONFIG>) {
  return configMethod;
};

const defaultConfigMethod = (filename: string): CONFIG => ({
  component: {
    singleFile: false,
    files: [
      {
        filepath: `${filename}/${filename}.vue`,
        basepath: `src/components`,
        content: `<div><!-- component : ${filename} --></div>`,
        tagname: 'template',
        isTemplateFile: true,
      },
      {
        filepath: `${filename}/style.css`,
        basepath: `src/components`,
        content: `.${filename} { /*  your styles ... */ }`,
        tagname: 'style',
        tagAttributes: {
          'type': 'css',
          'scoped': 'true'
        }
      },
      {
        filepath: `${filename}/script.js`,
        basepath: `src/components`,
        content: `export default { /* component: ${filename} */ }`,
        tagname: 'script',
      },
      {
        filepath: `${filename}/test.js`,
        basepath: `src/components`,
        content: `export default { /* component: ${filename} */ }`,
      }
    ]
  },
  directive: {
    files: [
      {
        filepath: `${filename}/${filename}.js`,
        basepath: `src/directivies`,
        content: `export default { /* component: ${filename} */ }`,
      },
      {
        filepath: `${filename}/test.js`,
        basepath: `src/directivies`,
        content: `export default { /* component: ${filename} */ }`,
      }
    ]
  },
  mixin: {
    files: [
      {
        filepath: `${filename}/${filename}.js`,
        basepath: `src/mixins`,
        content: `export default { /* component: ${filename} */ }`,
      },
      {
        filepath: `${filename}/tes.js`,
        basepath: `src/mixins`,
        content: `export default { /* component: ${filename} */ }`,
      },
    ]
  }
});

export {
  extend,
  defaultConfigMethod
};
