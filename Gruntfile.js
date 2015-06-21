// Generated on 2014-12-11 using generator-angular 0.10.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

// Configurable paths for the application
var appConfig = {
    app: 'app',
    dist: 'dist'
};

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        config: appConfig,
        clean: {
            app: {
                src: ['<%= config.app %>/scripts/app.js', '<%= config.app %>/styles/*.{css, patch}']
            },
            dist: {
                src: ['<%= config.dist %>/{,*/}/*', '.tmp/*']
            }
        },
        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                devDependencies: true,
                src: ['<%= config.app %>/index.html'],
                ignorePath: /\.\.\//
            }
        },
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            browserify: {
                files: ['<%= config.app %>/scripts/app.src.js'],
                tasks: ['browserify']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [ // 监听到文件变化不执行任何task，直接reload
                    '<%= config.app %>/{,*/}*.{css,html}',
                    '<%= config.app %>/scripts/app.js'
                ]
            },
            less: {
                files: ['<%= config.app %>/styles/{,*/}*.less'],
                tasks: ['less:app']
            },
            autoprefixer: {
                files: ['<%= config.app %>/styles/*.css'],
                tasks: ['autoprefixer:app']
            }
        },
        less: {
            app: {
                src: '<%= config.app %>/styles/less/app.less',
                dest: '<%= config.app %>/styles/app.css'
            }
        },
        browserify: {
            app: {
                files: {
                    '<%= config.app %>/scripts/app.js': ['<%= config.app %>/scripts/app.src.js']
                }
            }
        },
        autoprefixer: {
            options: {
                browser: ['last 2 versions', 'ie 9'],
                diff: true
            },
            app: {
                expand: true,
                cwd: '<%= config.app %>/styles',
                src: '*.css',
                dest: '<%= config.app %>/styles',
                ext: '.css'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                // ignores: ['<%= config.app %>/scripts/app.js'],
                src: [
                    'Gruntfile.js',
                    '<%= config.app %>/scripts/{,*/}*.js',
                    '!<%= config.app %>/scripts/app.js'
                ]
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 10086,
                hostname: '0.0.0.0',
                livereload: 35780,
                useAvailablePort: true
            },
            livereload: {
                options: {
                    open: false, // 自动打开浏览器
                    middleware: function(connect) {
                        return [
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    port: 10087,
                    open: true,
                    base: '<%= config.dist %>'
                }
            }
        },

        useminPrepare: {
            html: '<%= config.app %>/index.html',
            options: {
                dest: '<%= config.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
            }
        },
        // cssmin: {
        // },
        // uglify: {
        // },
        // concat: {
        //   dist: {}
        // },
        // Renames files for browser caching purposes
        filerev: {
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: ['*.html'],
                    dest: '<%= config.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '*.html',
                        'images/{,*/}*.{svg,png,jpg}'
                    ]
                }]
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'autoprefixer',
        'copy:dist',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('buildAndServe', 'Build then start a connect web server', function() {
        if (grunt.option('local')) {
            grunt.config.set('connect.options.hostname', 'localhost');
        }
        grunt.task.run([
            'build',
            'connect:dist',
            'watch:gruntfile' //just keep server alive
        ]);
    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function() {
        if (grunt.option('local')) {
            grunt.config.set('connect.options.hostname', 'localhost');
        }

        grunt.task.run([
            'clean:app',
            'less:app',
            'autoprefixer:app',
            'browserify:app',
            'jshint:all',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('default', ['serve']);

};
