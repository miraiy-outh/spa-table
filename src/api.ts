import { TTable, TTableExport } from "./services/types/table-types";

const HOST = "https://test.v5.pryaniky.com";

function saveToken(token: string) {
  sessionStorage.setItem("tokenData", token);
}

function getToken(): string {
  const token = sessionStorage.getItem("tokenData");
  return token ? token : "";
}

export async function getAuthToken(
  username: string,
  password: string
): Promise<string> {
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

export async function getTable(): Promise<TTable[]> {
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

export async function deleteLine(id: string) {
  return fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
    method: "POST",
    headers: {
      "x-auth": getToken(),
    },
  }).then((res) => {
    if (res.status === 200) {
      return res.json().then((data) => {
        console.log(id);
        console.log(data);
        if (data.error_code === 0)
          return Promise.resolve(`Line with id=${id} deleted`);
        else return Promise.reject(new Error("Line delete failed"));
      });
    }
    return Promise.reject(new Error("Line delete failed"));
  });
}

export async function addLine(line: TTableExport) {
  return fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth": getToken(),
    },
    body: JSON.stringify(line),
  }).then((res) => {
    if (res.status === 200) {
      return res.json().then((data) => {
        return Promise.resolve("New line created");
      });
    }
    console.log(line, JSON.stringify(line));
    return Promise.reject(new Error("Line add failed"));
  });
}

export async function changeLine(line: TTableExport, id: string) {
  return fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth": getToken(),
    },
    body: JSON.stringify(line),
  }).then((res) => {
    if (res.status === 200) {
      return res.json().then((data) => {
        return Promise.resolve(`Line with id=${id} changed`);
      });
    }
    console.log(line, JSON.stringify(line));
    return Promise.reject(new Error("Line change failed"));
  });
}
