import { atom } from "jotai";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorageUtils";
import { userAndToken } from "../types";

const createPersistedAtom = <T>(key: string, initilValue: T) => {
  const baseAtom = atom<T>(loadFromLocalStorage<T>(key) || initilValue);

  const persistedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: T) => {
      set(baseAtom, update);
      saveToLocalStorage(key, get(baseAtom));
    }
  );
  return persistedAtom;
};

export const userAtom = createPersistedAtom<userAndToken | null>("user", null);
