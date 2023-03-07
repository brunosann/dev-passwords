import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import route from "ziggy-js";

import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: "",
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const handleOnChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <GuestLayout>
      <Head title="Entrar" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600 text-center">
          {status}
        </div>
      )}

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            onChange={handleOnChange}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Senha" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={handleOnChange}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="block mt-4">
          <label htmlFor="remember" className="flex items-center">
            <Checkbox
              id="remember"
              name="remember"
              value={data.remember}
              onChange={handleOnChange}
            />
            <span className="ml-2 text-sm text-gray-600">Lembrar senha</span>
          </label>
        </div>

        <div className="flex items-center justify-between mt-4">
          {canResetPassword && (
            <Link
              href={route("password.request")}
              className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Esqueceu sua senha?
            </Link>
          )}

          <PrimaryButton className="ml-4" disabled={processing}>
            Entrar
          </PrimaryButton>
        </div>
      </form>
      <div className="flex gap-1 justify-center mt-2">
        <p className="text-sm text-gray-600">Não tem uma conta?</p>
        <Link
          href={route("register")}
          className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Inscreva-se
        </Link>
      </div>
    </GuestLayout>
  );
}
