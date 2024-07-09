import { atom } from "jotai";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorageUtils";

const createPersistedAtom = <T>(key: string, initilValue: T) => {
  const baseAtom = atom(loadFromLocalStorage(key) || initilValue);

  const persistedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: T) => {
      set(baseAtom, update);
      saveToLocalStorage(key, get(baseAtom));
    }
  );
  return persistedAtom;
};

export const userAtom = createPersistedAtom("user", null);
