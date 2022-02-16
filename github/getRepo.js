import fetch from 'node-fetch';
import Timer from './timer/index.js';

const owner = 'jasonchen23';
const repos = 'repoAPI';
const info =[{owner: owner, repo: repos}];

const getRepoAPI = async (owner,repos) => {
  const clientIdAndSecret = 'Jason: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';
  const base64 = (text) => Buffer
    .from(text)
    .toString('base64');

  return fetch(`https://api.github.com/repos/${owner}/${repos}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Language': 'en_US',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Basic ${base64(clientIdAndSecret)}`,
    },
    // body:JSON.stringify({

    // }),
})};
const getRepoES6 = async () => {
  const timer = new Timer();

  const promises = [...info].map(async (info) => {
    const o = new Object({name: info.owner, reponame: info.repo});
    const repoDetails = await getRepoAPI(o.name,o.reponame);

    return repoDetails.json();
  });

  const results = await Promise.all(promises);

  console.log('time elapsed(getUsersES6):', timer.count());
  
  return results;
};
(async () => {
  const result =await getRepoES6(owner,repos);
  
  console.log('repos = ', result);
})();
