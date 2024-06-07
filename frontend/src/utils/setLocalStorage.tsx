const setLocalStorage = (data: any) => {
  for (const key in data) {
    localStorage.setItem(key, data[key].toString());
  }
};

export default setLocalStorage;
