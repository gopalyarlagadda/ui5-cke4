module.exports = function(grunt) {
	"use strict";
	grunt.loadNpmTasks("@sap/grunt-sapui5-bestpractice-build");
	// grunt.initConfig({
	// 	build: {
	// 		files: []
	// 	}
	// });	
	grunt.registerTask("default", [
		"clean",
		"lint",
		"build"
	]);
};