var gulp = require('gulp');
var mocha = require('gulp-mocha');
var exit = require('gulp-exit');

var routeTests = [
        './test/routes/books-routes-test.js',
    ]; 

var serviceTests = [
  './test/services/booking-service-test.js',
];
    
gulp.task('test', function() {
  gulp.run('routeTests', 'serviceTests');
});
    
gulp.task('routeTests', function(){
  gulp.src(routeTests)
    .pipe(mocha()) 
    .on('end', function() { console.log('>>Finished Running Route Tests'); })
    .pipe(exit());
});    

gulp.task('serviceTests', function(){
  gulp.src(serviceTests)
    .pipe(mocha()) 
    .on('end', function() { console.log('>>Finished Running Route Tests'); })
    .pipe(exit());
});
