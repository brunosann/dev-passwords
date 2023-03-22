import { useForm } from "@inertiajs/react";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import route from "ziggy-js";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Overlay from "@/Components/Overlay";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { getPassword } from "@/Services/Password";

import { CustomFields } from "./CustomFields";

export const EditPassword = ({ id, open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { data, setData, put, processing, errors, reset } = useForm({
    name: "",
    username: "",
    password: "",
    description: "",
    custom_fields: [],
  });

  useEffect(() => {
    if (!id) return;
    handleInit();
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleInit = async () => {
    try {
      setLoading(true);
      const response = await getPassword(id, true);
      if (response.ok && !response.ok) throw response;
      setData({
        ...response,
        username: response.username || "",
        description: response.description || "",
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = ({ target }) => {
    setData(target.name, target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    try {
      put(route("passwords.update", id), {
        onSuccess: () => setOpen(false),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Overlay open={open} setOpen={setOpen} title="Editar senha">
        {!loading ? (
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
              <SecondaryButton onClick={() => setOpen(false)}>
                Cancelar
              </SecondaryButton>
              <PrimaryButton type="submit" disabled={processing}>
                Salvar
              </PrimaryButton>
            </div>
          </form>
        ) : (
          <div className="animate-pulse">
            <div className="flex-1 space-y-6 py-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="w-16 h-2 bg-gray-400" />
                  <div className="h-10 bg-gray-400" />
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mt-4">
              <div className="w-full h-8 bg-gray-400" />
              <div className="w-full h-8 bg-gray-400" />
            </div>
            <div className="flex gap-2 mt-4 justify-end">
              <div className="w-24 h-8 bg-gray-400" />
              <div className="w-20 h-8 bg-gray-400" />
            </div>
          </div>
        )}
      </Overlay>
    </>
  );
};

EditPassword.propTypes = {
  id: PropTypes.string,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
