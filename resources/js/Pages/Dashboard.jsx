import { Head, Link, router } from "@inertiajs/react";
import { PropTypes } from "prop-types";
import { useState } from "react";
import route from "ziggy-js";

import { CreatePassword } from "@/Components/Forms/Password/Create";
import { MagnifyingGlass } from "@/Components/Icons/MagnifyingGlass";
import { List as ListPasswords } from "@/Components/Password/List";
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
                <CreatePassword />
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

              <ListPasswords passwords={passwords} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
  errors: PropTypes.object,
  passwords: PropTypes.object,
};
