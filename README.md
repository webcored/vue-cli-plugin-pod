 <p align="center">
  <img src="https://prakashchokalingam.github.io/vue-cli-plugin-pod/logo.png" height="100px" width="100px">
 </p>

<h1 align="center">vue-cli-plugin-pod</h1>
<p align="center">Extended cli to manage file templates for vue projects</p>
<p align="center">
  <img src="https://flat.badgen.net/badge/Built%20With/TypeScript/blue">
  <a href="https://www.npmjs.com/package/vue-cli-plugin-pod">
    <img src="https://img.shields.io/npm/v/vue-cli-plugin-pod?color=%2322d422&logoColor=%23fff&style=flat-square">
  </a>
  <img src="https://img.shields.io/static/v1?label=node&message=%3E=%2012.0.0&color=%2322d422&logoColor=%23fff&style=flat-square">
  <img src="https://img.shields.io/npm/dt/vue-cli-plugin-pod?style=flat-square">
</p>

---

#### Refer
https://dev.to/prakash_chokalingam/generating-files-with-vue-cli-plugin-pod-5639


## Installation

Add this [vue cli plugin](https://cli.vuejs.org/guide/plugins-and-presets.html) to your awesome vue project using the below command:

```
vue add pod
```

> once installed, your project will have access to the following  tasks:

---

### Generate

Creates template files for the specified file type

```
npm run generate <filetype> <file name or path>
```

Example: `npm run generate component UI/Button`


### Rename

Renames template files for the specified file type

```
npm run rename <filetype> <old file name or path> <new file name or path>
```

Example: `npm run rename component icon avatar`

### Delete

Deletes template files for the specified file type

```
npm run delete <filetype> <file name or path>
```

Example: `npm run delete component UI/Button`

### Config
Get a clone of the default pod config file and customize it.


```
npm run config
```

The above command will generate a `pod.config.js` file to the root of your project.

click here to check the [default config](https://github.com/prakashchokalingam/vue-cli-plugin-pod/blob/main/src/pod.config.ts).

Default file types allowed: `component`, `directive` & `mixin`.

The config file accepts fileType & array of [files](https://github.com/prakashchokalingam/vue-cli-plugin-pod/blob/main/src/service/types.ts#L14).

Available config file options:

|    key     | type / default          | description  |
| :------------- |:-------------| :-------------|
| filepath     | string : {filename}/{filename.extension} | file default path and name |
| $basepath `optional`      | string : {filetype} |  file basepath directory    |
| content | string   |    file default content |
| isTemplateFile `optional` | boolean: true for .vue file      |    A boolean flag to identify the template file |
| tagname `optional` | string |  tag name applicable for component files alone. It specified the tag should be used while refering in the template file |
| tagAttributes `optional` | Object  | Required attributes for file while refering the file in template file|

> Only `component` filetype will accept an object `singleFile: true` which decides whether to follow vue single file structure by infering the component files contents to the template file  **or** create multiple files while generating a component and refer them in the template file.

---

## TODO
* VUE UI integration
* Pre/Post callbacks for file operations








