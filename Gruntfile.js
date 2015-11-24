module.exports = function(grunt) {
  // Importation des différents modules grunt
  require('load-grunt-tasks')(grunt);

  // Configuration des plugins
  grunt.initConfig({
    uglify: {
      options: {
        mangle: false,
        sourceMap: true
      },
      libs: {
        files: {
          'dist/libs.min.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/semantic/dist/semantic.js'
          ]
        },
        sourceMapName: 'dist/libs.map'
      },
      dist: {
        files: {
          'dist/app.min.js': [
             "src/skitter-layout/js/front.js"
          ]
        },
        sourceMapName: 'web/built/app.map'
      }
    }, //end uglify
    less: {
        dist: {
            options: {
                compress: true,
                yuicompress: true,
                paths: [".tmp/css"],
                optimization: 2
            },
            files: {
                ".tmp/css/app.css": [
                    "src/skitter-layout/less/layout.less"
                ]
            }
        }
    }, //end less
    cssmin: {
      combinelibs: {
        options:{
          report: 'gzip',
          keepSpecialComments: 0
        },
        files: {
          'dist/libs.min.css': [
            '.tmp/libs/1.fonts.css',
            '.tmp/libs/semantic.css',
            '.tmp/libs/reset5.css'
          ]
        }
      },
      combine: {
        options:{
          report: 'gzip',
          keepSpecialComments: 0
        },
        files: {
          'dist/app.min.css': [
            '.tmp/css/app.css'
          ]
        }
      }
    }, //end cssmin
    watch: {
      css: {
        files: ['src/skitter-layout/less/**/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }, //end watch
    copy: {
        fonts: {
            expand: true,
            filter: 'isFile',
            src: '.tmp/libs/*.css',
            dest: '.tmp/libs/',
            options: {
                process: function (content, srcpath) {
                    return content.replace(/dist\//g, "../dist/");
                },
            },
            flatten: true,
        },
        fontIcons: {
            expand: true,
            filter: 'isFile',
            src: 'bower_components/semantic/dist/themes/default/assets/fonts/*',
            dest: 'dist/fonts/',
            flatten: true,
        },
        cssLibs: {
            expand: true,
            filter: 'isFile',
            src: [
                'bower_components/semantic/dist/semantic.css',
                'src/skitter-layout/css/vendor/reset5.css'
            ],
            dest: '.tmp/libs/', //themes/default/assets/fonts/
            flatten: true,
            options: {
                process: function (content, srcpath) {
                    return content.replace(/themes\/default\/assets\//g, "../dist/");
                },
            }
        },
    },
    googlefonts : {
        build: {
            options: {
                formats: {
                    eot: true,
                    ttf: true,
                    woff: true,
                    woff2: true,
                    svg: true
                },
                fontPath: 'dist/fonts/',
                cssFile: '.tmp/libs/1.fonts.css',
                fonts: [
                    {
                        family: 'Lato',
                        styles: [
                            100,300,400,700,900,'100italic','300italic','400italic','700italic','900italic'
                        ]
                    },
                    {
                        family: 'Dosis',
                        styles: [
                            200,300,400,500,600,700,800
                        ]
                    }
                ]
            }
        }
    } //end googlefont
  });

  // Déclaration des différentes tâches
  grunt.registerTask('default', ['css', 'javascript']);
  grunt.registerTask('fonts', ['googlefonts', 'copy:fontIcons', 'copy:fonts']);
  grunt.registerTask('javascript', ['uglify:libs', 'uglify:dist']);
  grunt.registerTask('localcsscompile', ['less', 'cssmin']);
  grunt.registerTask('css', ['fonts', 'copy:cssLibs', 'localcsscompile']);
};
