const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        // this.option('babel'); // This method adds support for a `--babel` flag
    }
    
    
    async prompting() {
        this.answers = await this.prompt([{
            type    : 'input',
            name    : 'projectName',
            message : 'Project Name?',
            validate: function (input) {
                return /\w+/.test(input.trim()) || 'project name required!';
            },
            //default : this.appname, // Default to current folder name
        },{
            type    : 'confirm',
            name    : 'useCloud',
            message : 'Deploy it on cloud? (for now only support cloud deploy)',
            default : true,
        }]);
        
        this.log('projectName', this.answers.projectName);
        this.log('useCloud', this.answers.useCloud);
        
        this.tpl = this.answers.useCloud ? 'cloud' : 'standalone';
        //const tpl = this.answers.useCloud ? '../cloud' : '../standalone';
        //this.composeWith(require.resolve(tpl));
    }
    
    
    writing() {
        //console.log(this.sourceRoot())
        //console.log(this.destinationRoot())
        
        const tplPath = this.templatePath(this.tpl);
        const destPath = this.destinationPath(this.answers.projectName);
        
        console.log('copy from: ', tplPath);
        console.log('to: ', destPath);
        
        this.fs.copyTpl(
            tplPath,
            destPath,
            //{ title: 'Templating with Yeoman' },
        );
    }
    
};

