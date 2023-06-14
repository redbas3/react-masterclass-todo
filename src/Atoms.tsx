import { atom, selector } from "recoil";

export const localStorageCategoryName = "CATEGORIES";
export const localStorageToDoName = "TODOS";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export interface ICategory {
  text: string;
}

export const categoryState = atom<ICategory[]>({
  key: "category",
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem(localStorageCategoryName);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(localStorageCategoryName)
          : localStorage.setItem(
              localStorageCategoryName,
              JSON.stringify(newValue)
            );
      });
    },
  ],
});

export const currentCategoryState = atom({
  key: "currentCategory",
  default: "",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem(localStorageToDoName);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(localStorageToDoName)
          : localStorage.setItem(
              localStorageToDoName,
              JSON.stringify(newValue)
            );
      });
    },
  ],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(currentCategoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
