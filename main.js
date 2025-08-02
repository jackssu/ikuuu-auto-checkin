const host = process.env.HOST || "ikuuu.de";

const protocolPrefix = "https://";
const logInUrl = `${protocolPrefix}${host}/auth/login`;
const checkInUrl = `${protocolPrefix}${host}/user/checkin`;

function parseCookie(rawCookie) {
  let cookieSets = rawCookie.split("path=/,");

  // 用于存储去重后的Cookie键值对
  const cookies = {};

  // 遍历 cookieSets 数组
  cookieSets.forEach((cookie) => {
    // 利用正则表达式提取字段名和字段值
    const match = cookie.match(/^([^=]+)=(.*?);/);
    if (match) {
      const fieldName = match[1].trim();
      let fieldValue = match[2].trim();

      // 对字段值进行解码
      fieldValue = decodeURIComponent(fieldValue);

      // 存储到cookies对象中（确保每个字段只有一个值，即去重）
      if (!cookies[fieldName]) {
        cookies[fieldName] = fieldValue;
      }
    }
  });

  return cookies;
}

function generateCookieStr(cookieObject) {
  // 将对象转换为Cookie格式的字符串
  return Object.entries(cookieObject)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("; ");
}

async function logIn(email, passwd) {
  console.log("Loging in...");

  let formData = new FormData();
  formData.append("host", host);
  formData.append("email", email);
  formData.append("passwd", passwd);
  formData.append("code", "");
  formData.append("remember_me", "off");

  let response = await fetch(logInUrl, {
    method: "POST",
    body: formData,
  });

  let rawCookie = response.headers.get("set-cookie");

  let responseJson = await response.json();

  responseJson && console.log(responseJson.msg);

  return parseCookie(rawCookie);
}

function checkIn(cookie) {
  fetch(checkInUrl, {
    method: "POST",
    headers: {
      Cookie: generateCookieStr(cookie),
    },
  })
    .then((res) => res.json())
    .then((resJson) => {
      if (resJson) {
        console.log(resJson.msg);
      }
    });
}

async function main() {
  let email;
  let passwd;

  if (process.env.EMAIL && process.env.PASSWD) {
    email = process.env.EMAIL;
    passwd = process.env.PASSWD;
  } else {
    console.log("ENV ERROR");
    process.exit(1);
  }

  let cookie = await logIn(email, passwd);

  checkIn(cookie);
}

main();
