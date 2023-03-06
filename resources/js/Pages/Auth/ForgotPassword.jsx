import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <GuestLayout>
      <Head title="Esqueceu sua senha" />

      <div className="mb-4 text-sm text-gray-600">
        Esqueceu sua senha? Sem problemas. Digite seu endereço de e-mail e
        enviaremos um link de redefinição de senha que permitirá que você
        escolha uma nova.
      </div>

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <form onSubmit={submit}>
        <InputLabel htmlFor="email" value="Email" />

        <TextInput
          id="email"
          type="email"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          isFocused={true}
          onChange={onHandleChange}
        />

        <InputError message={errors.email} className="mt-2" />

        <div className="flex items-center justify-between mt-4">
          <Link
            href={route("login")}
            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Entrar
          </Link>
          <PrimaryButton className="ml-4" disabled={processing}>
            Enviar
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
