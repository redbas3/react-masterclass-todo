import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoryState, toDoState } from "../Atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text} </span>
      {categories?.map((aCategory) => {
        if (aCategory.text !== category) {
          return (
            <button
              key={aCategory.text}
              name={aCategory.text}
              onClick={onClick}
            >
              {aCategory.text}
            </button>
          );
        } else {
          return null;
        }
      })}
      <button onClick={onClickDelete}>DELETE</button>
    </li>
  );
}

export default ToDo;
