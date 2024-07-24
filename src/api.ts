const HOST = "https://test.v5.pryaniky.com";

function saveToken(token: string) {
  sessionStorage.setItem("tokenData", token);
}

function getToken(): string {
  const token = sessionStorage.getItem("tokenData");
  return token ? token : "";
}

export function getAuthToken(username: string, password: string) {
  return fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => {
    if (res.status === 200) {
      return res.json().then((tokenData) => {
        const token = tokenData.data.token;
        saveToken(token);
        return Promise.resolve(token);
      });
    }
    return Promise.reject(new Error("Login failed"));
  });
}

export function getTable() {
  return fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
    method: "GET",
    headers: {
      "x-auth": getToken(),
    },
  }).then((res) => {
    if (res.status === 200) {
      return res.json().then((data) => {
        const tableData = data.data;
        if (tableData !== null) return Promise.resolve(tableData);
        else return Promise.reject(new Error("Table get failed"));
      });
    }
    return Promise.reject(new Error("Table get failed"));
  });
}
