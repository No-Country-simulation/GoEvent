export const loadFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Error al cargar los datos del LocalStorage", error);
    return undefined;
  }
};

export const saveToLocalStorage = (key: string, value: any) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Error al guardar los datos en LocalStorage", error);
  }
};
