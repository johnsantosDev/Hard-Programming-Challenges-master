const { exec } = require('child_process');

const DEFAULT_BRANCH = process.env.MY_BRANCH || process.env.DEFAULT_BRANCH || 'master'; // the default fallback branch if current branch can't be recieved through command line
const getCurrentBranch = () => new Promise((resolve, reject) => {
  exec('git branch --show-current', (err, stdout, stderr) => {
    if (err != null) {
      console.error(`COULD NOT GET CURRENT BRANCH RESOLVING TO ${DEFAULT_BRANCH}`);
      resolve(DEFAULT_BRANCH);
    } else if (typeof (stderr) !== 'string') {
      console.error(`COULD NOT GET CURRENT BRANCH RESOLVING TO ${DEFAULT_BRANCH}`);
      resolve(DEFAULT_BRANCH);
    } else {
      resolve(stdout.replace('\n', ''));
    }
  });
});
module.exports = getCurrentBranch;
