import fetch from 'node-fetch';
import Timer from './timer/index.js';

const owner = 'jasonchen23';
const repos = 'repoAPI';
const info =[{owner: owner, repo: repos}];

const updateRepoAPI = async (owner,repos) => {
  const clientIdAndSecret = 'Jason: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';
  const base64 = (text) => Buffer
    .from(text)
    .toString('base64');

  return fetch(`https://api.github.com/repos/${owner}/${repos}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Language': 'en_US',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Basic ${base64(clientIdAndSecret)}`,
    },
    body:JSON.stringify({
      "name":["hello"],
    }),
})};
const updateRepo = async () => {
  const timer = new Timer();

  const promises = [...info].map(async (info) => {
    // const o = new Object({name: info.owner, reponame: info.repo});
    const repoDetails = await updateRepoAPI(info.owner,info.repo);

    return repoDetails.json();
  });

  const results = await Promise.all(promises);

  console.log('time elapsed(getUsersES6):', timer.count());
  
  return results;
};
(async () => {
  const result =await updateRepo(owner,repos);
  
  console.log('repos = ', result);
})();


// import fetch from 'node-fetch';
// import Timer from './timer/index.js';


// async function updateRepo() {
//   try {
//   const clientIdAndSecret = 'Jason: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';
//   const base64 = Buffer
//     .from(clientIdAndSecret)
//     .toString('base64');
//   const info = ['nkgokul'];
//   const timer = new Timer();

//   let results = [...info].map(async () => {
//     const userDetails = await fetch('https://api.github.com/repos/' + 'jasonchen23' + '/' + 'cache-test', {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/vnd.github.v3+json",
//         "Accept-Language": "en_US",
//         "Accept": "application/vnd.github.v3+json",
//         "Authorization": `Basic ${base64}`,
//       },
//       body: JSON.stringify({
//         "name":["hello"],
//       })
//     });
//     return userDetails.json();
//   });

//   results = await Promise.all(results);

//   console.log('time elapsed(getUsers):', timer.count());
//   console.log(results);
//   return results;
//   }
//   catch(err) {
//     message = err.message("error");
//   }
// }

// (async () => {
//   const result = await updateRepo();
//   console.log('users =', result);
// })();

