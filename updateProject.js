const {Nuxt, Builder, Generator} = require('nuxt');
const Promise = require('bluebird');
const fs = require('fs');
const simpleGit = require('simple-git');
const publicIp = require('public-ip');

const updateGit = async () => {
  const git = simpleGit();
  await git.fetch();
  const gitInfo = await git.branch().then(r => {
    return {
      branch: r.current,
      current: r.branches[r.current],
      origin: r.branches['remotes/origin/' + r.current]
    }
  });
  if (!gitInfo) {
    return Promise.reject("Error get git info")
  }
  if (!gitInfo.origin) {
    return Promise.reject("Error origin branch not found: remotes/origin/" + gitInfo.branch)
  }
  console.info("Current revision:", gitInfo.current.commit)
  if (gitInfo.current.commit !== gitInfo.origin.commit) {
    console.info("Start updating to revision:", gitInfo.origin.commit)
    await git.pull()
    console.log("Files updated");
  } else
    console.info("Already latest revision!")


}

const generateProject = async () => {
  if (!fs.existsSync(process.cwd() + '/dist'))
    fs.mkdirSync(process.cwd() + '/dist');

  if (!fs.existsSync(process.cwd() + '/dist/client'))
    fs.mkdirSync(process.cwd() + '/dist/client');

  let config = require('./nuxt.config.js');
  config.dev = false;
  config.build.quiet = true;

  const nuxt = new Nuxt(config);
  const builder = new Builder(nuxt);
  const generator = new Generator(nuxt, builder);
  console.log("Project start generate.... (it can takes 2-5min)\n")
  await generator
    .generate({init: true, build: true})
  console.log('\nProject generated successful!');
}
const npmInstall = async () => {
  const child_process = require('child_process');
  child_process.execSync('npm install');
  return
}
//
const showMyIp = async () => {
  const publicIp_v4 = await publicIp.v4();
  console.log("Check this ip must be in whitelist (api and ddos protector):\n\t",publicIp_v4)
}
Promise.resolve()
  .then(showMyIp)
  .then(updateGit)
  .then(npmInstall)
  .then(generateProject)
  .then();
