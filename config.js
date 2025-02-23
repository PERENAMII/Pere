const fs = require("fs"); 
require("dotenv").config();

module.exports = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "PERENAMI",
    ownerNumber: process.env.OWNER_NUMBER || "2349132629929",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ === "true",
    autoViewStatus: process.env.AUTO_VIEW_STATUS === "true",
    autoReact: process.env.AUTO_REACT === "true",
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUlRTVc4dlFmQmtXRUxOLzk5RlZLL0VJdVI3NnRKdDhDQWJtZ21FMjlsWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ3BCR1EyZnFJTmNlK2p3ZUp1TDd4R2lqaG84K3o3WTZWejlWR3FrdDRqdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSXVUdm5FSFJNdEFBNDhodTlHcnpxb2plNWw5UEtqZTB2RFlEVXlmZkVzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoWEZXSFRRdXdnOEM2V1pCeHZYZVZvTnV1TGFEME54cXZhY0lxUFFOc213PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBBY1JHT2ZXM1QxYjEvUERtbmNtRE5qNDVROW1FeFZqU2ljaGlwRHdBMms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5telcrOC9DVGdEVURObFYyMUxzVFU2dVlQaHNhV2JHK1A3SzZ5VFF4bG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUV2M2xvZ3Vlb216cXVqc0tBcUlVblZ6UURrdzRqWUtXeXQxVVJFTFptbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTWJ1SzZJNmk4b0ZmTHRjcFY2ekJPVG1uelBZSXc3SjRSajRybUhsVFMwRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFkMDNXeXdzbUxVOE9SQ3NsbG52T2xhOHNSTkM2b3l0bkQ0blNGRUd5QWVvM1pYWXU5TGt2bTdqK0lpRjhScGRxeCtLemhRSXI0SEUwTTQ5UW82bmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgzLCJhZHZTZWNyZXRLZXkiOiJFdCtWNzl6eGZaQThyVnJ2Nis0d25GTFlldVlBYXhHYUJZVnd1TTdtUHBRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI5VEFQQTFMRSIsIm1lIjp7ImlkIjoiMjM0OTEzMjYyOTkyOTo4QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTk4MDA2ODY3NTQyMjE2OjhAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOajJyTmtDRUs3MzY3MEdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJydFYvYTk3U2ZWZ2lRMzJCSXd2ZkJ3TTlwclNUOUh0SVlmZEw2UlNvQmljPSIsImFjY291bnRTaWduYXR1cmUiOiJCT0YrMVgyNjBINFZ2ajlxem05b2ZaL2dDdWF2SURhcHlLcGhwZjYvbmJNd1JxNzBkOFViNitLaTBiY21yc0hES0x4ZFZmSzVpUVNwYmV0emI5TmVCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiM3FQdVFXeXlSdlhjUlZlbDRzOGdzUVNBYzZVbnlDQXhzeXJ3U3hVRlJmYm5LMnJKSEZsVXk0SGcxcEFONG4wMlM5OVk2bCsxcnRpaFB6N3h0UlM4aFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTMyNjI5OTI5OjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYTdWZjJ2ZTBuMVlJa045Z1NNTDN3Y0RQYWEway9SN1NHSDNTK2tVcUFZbiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQwMzA3Mzg3LCJsYXN0UHJvcEhhc2giOiIzZ1BVSmsiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUE5NyJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED || "false",
};

let file = require.resolve(__filename); 
fs.watchFile(file, () => {
    fs.unwatchFile(file); 
    console.log(`Update '${__filename}'`); 
    delete require.cache[file];
    require(file); 
});
