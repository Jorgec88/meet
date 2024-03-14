'use strict';

const { google } = require('googleapis');
const calendar = google.calendar('v3');
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events.public.readonly'
];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ['https://Jorgec88.github.io/meet/'];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_types: 'offline',
    scope: SCOPES
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      authUrl
    })
  };
};

module.exports.getAccessToken = aync (event) => {
const code = decodeURIComponent(`${event.pathParameters.code}`);

return new Promise((resolve, reject) => {
oAuth2Client.getToken(code, (error, response) => {
if (error) {
  return reject(error);
 }
 return resolve(response);
});
})
  .then((results) => {
  return {
  statusCode: 200,
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
 },
 body: JSON.stringify(results),
 }
})
.catch((error) => {
  return {
  statusCode: 500,
 body: JSON.stringify(error),
  };
 });
};

//module.exports.getCalendarEvents = async (event) => {
//  const access_token = decodeURIComponent(
//  `${event.pathParameters.access_token}`
//    );
//  oAuth2Client.setCredentials({ access_token });

//  return new Promise((resolve,reject) => {
// calendar.events.list(
// {
//  calendarId: CALENDAR_ID,
// auth: oAuth2Client,
// timeMin: new Date().toISOString(),
// sigleEvents: true,
// orderBy: "startTime",
// },
// (error, response) => {
//  if (error) {
//   reject(error);
//} else {
// resolve(response);
//}
// }
//);
//})
// .then((results) => {
//   return {
//   statusCode: 200,
// headers: {
// 'Access-Control-Allow-Origin': '*',
//   'Access-Control-Aloow-Credentials': true,
//  },
//  body: JSON.stringify({ events: results.data.items }),
//  };
// })
//.catch((error) => {
//  return {
//  statusCode: 500,
//headers: {
//   'Access-Control-Allow-Origin': '*',
//     },
//   body: JSON.stringify(error),
//  };
// });
//};







//const codeValue = document.getElementById('code');
//      const getAccessToken = document.getElementById('getToken');
//      const accessTokenElement = document.getElementById('accessToken');
  //    const getToken =
    //    'https://rlzj6od56b.execute-api.us-east-2.amazonaws.com/dev/api/token';

//      getAccessToken.onclick = function () {
  //      let code = codeValue.value;
    //    if (decodeURIComponent(code) === code) {
      //    code = encodeURIComponent(codeValue.value);
        //}
//        const getTokenRequest = getToken + '/' + code;
//        fetch(getTokenRequest)
  //        .then(function (response) {
    //        return response.json();
      //    })
        //  .then(function (jason) {
   //         accessTokenElement.innerText = JSON.stringify(json);
     //     });
    //  }; 







//    <h4>Step 2: Get your code and exchange for an access token</h4>
//      <p>
//        After you are redirected back to your Meet app on GitHub, copy the code
//        from the URI.
//      </p>
//      <br />
//      <label
//        >Code input
//        <input id="code" type="text" value="" />
//      </label>
//      <button id="getToken">Get Token</button>
//      <p id="accessToken"></p>