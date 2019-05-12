const os = require("os");
const ora = require('ora');

const addon = require('./build/Release/addon');

//Create function to get CPU information
cpuAverage = () => {

  //Initialise sum of idle and time of cores and fetch CPU info
  let totalIdle = 0, totalTick = 0;
  let cpus = os.cpus();

  //Loop through CPU cores
  for (let i = 0, len = cpus.length; i < len; i++) {

    //Select CPU core
    let cpu = cpus[i];

    //Total up the time in the cores tick
    for (type in cpu.times) {
      totalTick += cpu.times[type];
    }

    //Total up the idle time of the core
    totalIdle += cpu.times.idle;
  }

  //Return the average Idle and Tick times
  return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
}

cpuGetMetrics = () => {

  //Grab first CPU Measure
  let startMeasure = cpuAverage();

  //Set delay for second Measure
  setTimeout(function () {

    //Grab second Measure
    let endMeasure = cpuAverage();

    //Calculate the difference in idle and total time between the measures
    let idleDifference = endMeasure.idle - startMeasure.idle;
    let totalDifference = endMeasure.total - startMeasure.total;

    //Calculate the average percentage CPU usage
    let percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

    // const spinner = ora('Loading unicorns').start();

    // setTimeout(() => {
    //   spinner.color = 'yellow';
    //   spinner.text = 'Loading rainbows';
    // }, 1000);
    console.log(addon.hello());


    while (true) { }

  }, 100);
}
class Cofeefy {
  apply(compiler) {
    compiler.hooks.compilation.tap("coffeemachine", (
      stats /* stats is passed as argument when done hook is tapped.  */
    ) => {
      //console.log('stats', stats);
      setTimeout(function () { cpuGetMetrics(); }, 1000);
    });
  }


}


//from https://gist.githubusercontent.com/bag-man/5570809/raw/6017b5f0f9cc4d631a810692f511cbe6f4fb3204/cpu.js




module.exports = Cofeefy;