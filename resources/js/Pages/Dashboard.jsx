import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import route from "ziggy-js";

import { Password as FormPassword } from "@/Components/Forms/Password";
import { ArrowLongLeft } from "@/Components/Icons/ArrowLongLeft";
import { ArrowLongRight } from "@/Components/Icons/ArrowLongRight";
import { Eye } from "@/Components/Icons/Eye";
import { LockClosed } from "@/Components/Icons/LockClosed";
import { MagnifyingGlass } from "@/Components/Icons/MagnifyingGlass";
import { PencilSquare } from "@/Components/Icons/PencilSquare";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ auth, errors, passwords }) {
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const params = route().params;
    delete params.page;
    router.get(
      route("dashboard", {
        ...params,
        _query: {
          search,
        },
      }),
      {},
      { preserveState: true }
    );
  };

  const handleOnChangeSearch = ({ target: { value } }) => {
    setSearch(value);
    if (!value) {
      const params = route().params;
      delete params.search;
      router.get(
        route("dashboard", {
          ...params,
        })
      );
    }
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      errors={errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Senhas
        </h2>
      }
    >
      <Head title="Home" />

      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex justify-end">
                <FormPassword />
              </div>
              <section className="sm:flex sm:items-end sm:justify-between mb-4">
                <div>
                  <p className="font-semibold text-lg text-gray-800 leading-tight mb-1">
                    Ordenar por
                  </p>
                  <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg  rtl:flex-row-reverse">
                    <Link
                      as="button"
                      type="button"
                      href={route("dashboard", {
                        ...route().params,
                        order: "accessed",
                      })}
                      preserveState
                      className={`px-5 py-2 font-medium text-gray-600 transition-colors duration-200 text-sm hover:bg-gray-100 ${
                        (route().current("dashboard", { order: "accessed" }) &&
                          "bg-gray-200") ||
                        (!("order" in route().params) && "bg-gray-200")
                      }`}
                    >
                      Mais Acessados
                    </Link>

                    <Link
                      as="button"
                      type="button"
                      href={route("dashboard", {
                        ...route().params,
                        order: "recent",
                      })}
                      preserveState
                      className={`px-5 py-2 font-medium text-gray-600 transition-colors duration-200 text-sm hover:bg-gray-100 ${
                        route().current("dashboard", { order: "recent" }) &&
                        "bg-gray-200"
                      }`}
                    >
                      Mais Recentes
                    </Link>
                  </div>
                </div>
                <div className="mt-4 mr-0 mb-0 ml-0 sm:mt-0">
                  <p className="sr-only">Pesquisar senha</p>
                  <form onSubmit={handleSearchSubmit} className="relative flex">
                    <div className="flex items-center pt-0 pr-0 pb-0 pl-3 absolute inset-y-0 left-0 pointer-events-none">
                      <p>
                        <MagnifyingGlass className="w-5 h-5 text-gray-400" />
                      </p>
                    </div>
                    <input
                      placeholder="Pesquisar senha"
                      type="search"
                      className="block w-full p-2 pl-10 border border-gray-400 rounded-lg rounded-r-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                      onChange={handleOnChangeSearch}
                    />
                    <button
                      type="submit"
                      className="border-gray-400 border border-l-0 rounded-r-lg px-4 text-gray-500 transition-colors duration-200 hover:bg-gray-100"
                    >
                      Buscar
                    </button>
                  </form>
                </div>
              </section>
              <section className="flex flex-col gap-4">
                {passwords.data?.map((password) => (
                  <div
                    key={password.id}
                    className="flex sm:items-center sm:justify-between gap-2"
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200">
                        <LockClosed className="w-6 h-6" />
                      </div>
                      <div className="ml-1 sm:ml-4 flex-1 min-w-0">
                        <p className="text-lg font-bold text-gray-800 truncate">
                          {password.name}
                        </p>
                        <p className="text-gray-600 text-md">
                          {(password.username &&
                            password.description &&
                            `${password.username} / ${password.description}`) ||
                            (password.username && `${password.username}`) ||
                            (password.description && `${password.description}`)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                      <SecondaryButton className="gap-1">
                        <Eye className="w-5 h-5" />
                        <span className="hidden sm:block">Visualizar</span>
                      </SecondaryButton>
                      <SecondaryButton className="gap-1">
                        <PencilSquare className="w-5 h-5" />
                        <span className="hidden sm:block">Editar</span>
                      </SecondaryButton>
                    </div>
                  </div>
                ))}
              </section>

              <section className="mt-6 flex items-center justify-between ">
                <div className="text-sm text-gray-500">
                  Página
                  <span className="font-medium text-gray-700 ml-1">
                    {passwords.current_page} de {passwords.last_page}
                  </span>
                </div>

                <div className="flex items-center gap-x-2">
                  <Link
                    as="button"
                    type="button"
                    href={passwords.prev_page_url}
                    disabled={!passwords.prev_page_url}
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <ArrowLongLeft className="w-5 h-5 rtl:-scale-x-100" />
                    <span className="hidden sm:block">Anterior</span>
                  </Link>

                  <Link
                    as="button"
                    type="button"
                    href={passwords.next_page_url}
                    disabled={!passwords.next_page_url}
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <span className="hidden sm:block">Próximo</span>
                    <ArrowLongRight className="w-5 h-5 rtl:-scale-x-100" />
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
