var os = require("os");

function Cofeefy(options) {
    
    setTimeout(function(){cpuAverage();}, 5000);
}

Cofeefy.prototype.apply = function (compiler) {
    compiler.plugin("compile", function (params) {
        console.log("The compiler is starting to compile...");
    });

    compiler.plugin("compilation", function (compilation) {
        console.log("The compiler is starting a new compilation...");

        compilation.plugin("optimize", function () {
            console.log("The compilation is starting to optimize files...");
        });
    });

    compiler.plugin("emit", function (compilation, callback) {
        console.log("The compilation is going to emit files...");
        callback();
    });
};
//from https://gist.githubusercontent.com/bag-man/5570809/raw/6017b5f0f9cc4d631a810692f511cbe6f4fb3204/cpu.js

//Create function to get CPU information
function cpuAverage() {

  //Initialise sum of idle and time of cores and fetch CPU info
  var totalIdle = 0, totalTick = 0;
  var cpus = os.cpus();

  //Loop through CPU cores
  for(var i = 0, len = cpus.length; i < len; i++) {

    //Select CPU core
    var cpu = cpus[i];

    //Total up the time in the cores tick
    for(type in cpu.times) {
      totalTick += cpu.times[type];
   }     

    //Total up the idle time of the core
    totalIdle += cpu.times.idle;
  }

  //Return the average Idle and Tick times
  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

//Grab first CPU Measure
var startMeasure = cpuAverage();

//Set delay for second Measure
setTimeout(function() { 

  //Grab second Measure
  var endMeasure = cpuAverage(); 

  //Calculate the difference in idle and total time between the measures
  var idleDifference = endMeasure.idle - startMeasure.idle;
  var totalDifference = endMeasure.total - startMeasure.total;

  //Calculate the average percentage CPU usage
  var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

  //Output result to console
  console.log(percentageCPU + "% CPU Usage.");

}, 100);


module.exports = Cofeefy;