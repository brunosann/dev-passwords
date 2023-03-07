import { Head } from "@inertiajs/react";

import { Password as FormPassword } from "@/Components/Forms/Password";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard(props) {
  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Senhas
        </h2>
      }
    >
      <Head title="Home" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">Você está logado!</div>
          </div>
        </div>
      </div>

      <FormPassword />
    </AuthenticatedLayout>
  );
}
