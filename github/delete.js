import fetch from 'node-fetch';
import Timer from './timer/index.js';

const owner = 'jasonchen23';
const repos = 'repoAPI';
const info =[{owner: owner, repo: repos}];

const deleteRepoAPI = async (owner,repos) => {
  const clientIdAndSecret = 'Jason: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';
  const base64 = (text) => Buffer
    .from(text)
    .toString('base64');

  return fetch(`https://api.github.com/repos/${owner}/${repos}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Language': 'en_US',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Basic ${base64(clientIdAndSecret)}`,
    },
    // body:JSON.stringify({

    // }),
})};
const deleteRepo = async () => {
  const timer = new Timer();

  const promises = [...info].map(async (info) => {
    // const o = new Object({name: info.owner, reponame: info.repo});
    const repoDetails = await deleteRepoAPI(info.owner,info.repo);

    return repoDetails.json();
  });

  const results = await Promise.all(promises);

  console.log('time elapsed(deleteRepo):', timer.count());
  
  return results;
};
(async () => {
  const result =await deleteRepo(owner,repos);
  
  console.log('repos = ', result);
})();

// import fetch from 'node-fetch';
// import Timer from './timer/index.js';

// async function getRepo() {
//   // your_username:$token
//   const clientIdAndSecret = 'Jason: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';
//   const base64 = Buffer
//     .from(clientIdAndSecret)
//     .toString('base64');

//   const timer = new Timer();

//   const info = [{owner:'jasonchen23',repo:'cache_test'}];
//   let results = info.map(async (owner, repo) => {

//     const userDetails = await fetch('https://api.github.com/repos/' + 'jasonchen23' + '/' + 'cache_test', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Accept-Language': 'en_US',
//         'Accept': 'application/vnd.github.v3+json',
//         'Authorization': `Basic ${base64}`,
//       },
//       // body: JSON.{

//       // }
//     });

//     return userDetails.json();
//   });

//   results = await Promise.all(results);

//   console.log('time elapsed(getUsers):', timer.count());

//   return results;
// }

// (async () => {
//   // time elapsed(getUsers): 1.241522465005517
//   const result = await getRepo();
//   console.log('users =', result);
// })();
