import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoryState, currentCategoryState } from "../Atoms";

interface IForm {
  category: string;
}

function CreateCategory() {
  const setCategories = useSetRecoilState(categoryState);
  const setCategory = useSetRecoilState(currentCategoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ category }: IForm) => {
    setCategories((oldCategories) => [{ text: category }, ...oldCategories]);
    setValue("category", "");
    setCategory(category);
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", { required: "Please Write a category" })}
        placeholder="Write a category"
      />
      <button>Add Category</button>
    </form>
  );
}

export default CreateCategory;
