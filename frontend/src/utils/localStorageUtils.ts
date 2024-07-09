export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedState = localStorage.getItem(key);
    return !serializedState ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Error al cargar los datos del LocalStorage", error);
    return null;
  }
};

export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Error al guardar los datos en LocalStorage", error);
  }
};
