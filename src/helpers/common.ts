export const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

export const getServerUrl = function (path: string) {
  return process.env.NEXT_PUBLIC_SERVER_HOST + "/" + path;
};
