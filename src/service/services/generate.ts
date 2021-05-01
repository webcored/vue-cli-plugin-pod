import { ensureDirSync, existsSync, writeFileSync } from 'fs-extra';
import { FileOptions, apiTypeMock, DynamicObjects } from '../types';
import { Common } from './common';



class Generate extends Common {

  async exec(api: apiTypeMock, _options: null, args: string[]): Promise<void> {
    await this.setup(api.getCwd(), args);

    // type config
    const typeConfig = this.config[this.fileType];

    // generate template file content
    if (this.fileType === 'component') {
      let generatableFiles: FileOptions[] = typeConfig.files;
      const templateFile: FileOptions | undefined = typeConfig.files.find(file => file.isTemplateFile);
      let templateFileContent: string;

      if (!templateFile) {
       this.log('warning', 'Template file missing, loading file content will fail.');
      } else {
        const tagFiles = typeConfig.files.filter(file => file.tagname);
        if (typeConfig.singleFile) {
          templateFileContent = this.singFileTemplateContent(tagFiles);
          // non tagged files except template files
          generatableFiles = typeConfig.files.filter(file => file.isTemplateFile || !file.tagname);
        } else {
          templateFileContent = this.multiFileTemplateContent(tagFiles);
        }
      }

      // replace template file content
      generatableFiles = generatableFiles.map(file => {
        if(file.isTemplateFile) {
          file.content =  templateFileContent;
        }
        return file;
      });

      this.generateFiles(generatableFiles);
    } else { // for other files
      const generatableFiles: FileOptions[] = typeConfig.files;
      this.generateFiles(generatableFiles);
    }
  }

  private singFileTemplateContent(tagfiles: FileOptions[]) {
    let templateFileContent = '';

    tagfiles.forEach((file) => {
      const tagInnerContent = file.content ? file.content : '';
      const attributes = this.contructAttributes(file.tagAttributes);

      templateFileContent += `<${file.tagname}${attributes ? ` ${attributes}` : ''}>\n\t${tagInnerContent}\n</${file.tagname}> \n\n`;
    });

    return templateFileContent;
  }

  private multiFileTemplateContent(tagfiles: FileOptions[]) {
    let templateFileContent = '';
    let templateFilePath: string;
    const templateFileObject: FileOptions | undefined = tagfiles.find(file => file.isTemplateFile);

    if (templateFileObject) {
      const { fileDir } = this.constructFilePath(templateFileObject);
      templateFilePath = fileDir;
    }


    tagfiles.forEach(file => {
      let tagInnerContent;
      if (file.isTemplateFile) { // avoid import for template file
        tagInnerContent = file.content ? file.content : '';
      } else {
        const { filePath } = this.constructFilePath(file);
        file.tagAttributes = file.tagAttributes || {};
        file.tagAttributes.src = this.getRelativePath(templateFilePath, filePath);
      }

      const attributes = this.contructAttributes(file.tagAttributes);

      templateFileContent += `<${file.tagname}${attributes ? ` ${attributes}` : ''}>${tagInnerContent ? `${tagInnerContent}` : ''}</${file.tagname}> \n\n`;
    });

    return templateFileContent;
  }

  private contructAttributes(attributes: DynamicObjects | undefined) {
    return attributes ? Object.entries(attributes).map((attr) => {
      const [key, value] = attr;
      return `${key}="${value}"`;
    }).join(' ') : '';
  }

  private generateFiles(files: FileOptions[]) {
    files.forEach(file => {
      const { fileDir, filePath } = this.constructFilePath(file);
      ensureDirSync(fileDir);

      if (existsSync(filePath)) {
        this.log('error', `File already exists: ${filePath}`);
      } else {
        writeFileSync(filePath, file.content);
        this.log('success', `Generated file: ${filePath}`);
      }
    });
  }
}

export { Generate };
