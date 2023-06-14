import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { categoryState, currentCategoryState, toDoSelector } from "../Atoms";
import ToDo from "./Todo";
import CreateCategory from "./CreateCategory";
import { useEffect } from "react";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [categories, setCategories] = useRecoilState(categoryState);
  const [category, setCategory] = useRecoilState(currentCategoryState);

  useEffect(() => {
    setCategory(categories[0].text as any);
  }, []);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as any);
  };

  const deleteCategory = (event: React.FormEvent<HTMLButtonElement>) => {
    setCategories((oldCategories) => {
      const targetIndex = oldCategories.findIndex(
        (aCategory) => aCategory.text === (category as any)
      );
      if (targetIndex >= 0)
        return [
          ...oldCategories.slice(0, targetIndex),
          ...oldCategories.slice(targetIndex + 1),
        ];
      else return oldCategories;
    });
  };
  return (
    <div>
      <br />
      <h1>To Dos</h1>
      <hr />
      <CreateCategory />
      <br />
      <select value={category} onInput={onInput}>
        {categories?.map((aCategory) => (
          <option key={aCategory.text} value={aCategory.text}>
            {aCategory.text}
          </option>
        ))}
      </select>
      {categories.length > 1 ? (
        <button onClick={deleteCategory}>Delect Current Category</button>
      ) : null}
      <br />
      <br />
      <CreateToDo />
      <hr />
      <ul>
        {toDos?.map((aTodo) => (
          <ToDo key={aTodo.id} {...aTodo}></ToDo>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
