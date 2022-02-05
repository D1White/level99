const serverDelay = <T>(data: T): Promise<T> => {
  const delay = Math.floor(Math.random() * (1200 - 80 + 1) + 80);

  const promise = new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });

  return promise;
};

export default serverDelay;
