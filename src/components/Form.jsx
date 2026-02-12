import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  age: yup.number().positive().integer().required("Idade obrigatória")
});

export default function Form({ onAddUser }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    onAddUser(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Nome" {...register("name")} />
      <p>{errors.name?.message}</p>

      <input placeholder="Email" {...register("email")} />
      <p>{errors.email?.message}</p>

      <input placeholder="Idade" {...register("age")} />
      <p>{errors.age?.message}</p>

      <button type="submit">Cadastrar</button>
    </form>
  );
}
