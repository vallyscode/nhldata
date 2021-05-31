const https = require('https');
const { StringDecoder } = require('string_decoder');


// // https://statsapi.web.nhl.com/api/v1/teams


// const req = https.request(options, res => {
//     console.log(`StatusCode: ${res.statusCode}`);

//     let decoder = new StringDecoder("utf8");

//     res.on("data", d => {
//         decoder.write(d);
//     });

//     res.on("end", () => {
//         let result = decoder.end();
//         console.log(result);
//     });
// });

// req.on("error", error => {
//     console.log(error);
// });

// req.end()

(async () => {
    let decoder = new StringDecoder("utf8");
    let response = new Promise((resolve, reject) => {

        const options = {
            hostname: "statsapi.web.nhl.com",
            port: 443,
            path: "/api/v1/teams",
            method: "GET"
        }

        const req = https.request(options, (res) => {
            res.on("data", d => {
                decoder.write(d);
            })

            res.on("end", () => {
                let result = decoder.end();
                resolve(result);
            })
        });

        req.on("error", error => {
            reject(error);
        })

    });
    let s = await response;
    console.log(`S: ${s}`);
})();

console.log("boop");