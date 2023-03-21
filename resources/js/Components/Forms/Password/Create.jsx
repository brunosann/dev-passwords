import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import route from "ziggy-js";

import { PlusSmall } from "@/Components/Icons/PlusSmall";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Overlay from "@/Components/Overlay";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";

import { CustomFields } from "./CustomFields";

export const CreatePassword = () => {
  const [openOverlay, setOpenOverlay] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    username: "",
    password: "",
    description: "",
    custom_fields: [],
  });

  useEffect(() => {
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openOverlay]);

  const handleOnChange = ({ target }) => {
    setData(target.name, target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    try {
      post(route("passwords.store"), {
        onSuccess: () => setOpenOverlay(false),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PrimaryButton onClick={() => setOpenOverlay(true)}>
        <PlusSmall className="w-6 h-6" />
        <span>Novo</span>
      </PrimaryButton>
      <Overlay
        open={openOverlay}
        setOpen={setOpenOverlay}
        title="Cadastrar senha"
      >
        <form onSubmit={submit}>
          <div className="mb-4">
            <InputLabel htmlFor="name" value="Nome" />

            <TextInput
              id="name"
              name="name"
              value={data.name}
              className="mt-1 block w-full"
              isFocused={true}
              onChange={handleOnChange}
              placeholder="Gmail corporativo"
              required
            />

            <InputError message={errors.name} className="mt-2" />
          </div>

          <div className="mb-4">
            <InputLabel htmlFor="username" value="Username" />

            <TextInput
              id="username"
              name="username"
              value={data.username}
              className="mt-1 block w-full"
              onChange={handleOnChange}
              placeholder="jhon.doe@gmail.com"
            />

            <InputError message={errors.username} className="mt-2" />
          </div>

          <div className="mb-4">
            <InputLabel htmlFor="password" value="Senha" />

            <TextInput
              id="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              onChange={handleOnChange}
              placeholder="********"
              type="password"
              required
              autoComplete="off"
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mb-4">
            <InputLabel htmlFor="description" value="Descrição" />

            <TextInput
              id="description"
              name="description"
              value={data.description}
              className="mt-1 block w-full"
              onChange={handleOnChange}
              placeholder="e-mail de trabalho"
            />

            <InputError message={errors.description} className="mt-2" />
          </div>

          <CustomFields
            errors={errors}
            setData={setData}
            customFields={data.custom_fields}
          />

          <div className="flex justify-end gap-2 border-t-2 pt-4 mt-4">
            <SecondaryButton onClick={() => setOpenOverlay(false)}>
              Cancelar
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={processing}>
              Salvar
            </PrimaryButton>
          </div>
        </form>
      </Overlay>
    </>
  );
};
