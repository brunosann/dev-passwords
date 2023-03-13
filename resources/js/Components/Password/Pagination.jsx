import { Link } from "@inertiajs/react";
import { PropTypes } from "prop-types";

import { ArrowLongLeft } from "../Icons/ArrowLongLeft";
import { ArrowLongRight } from "../Icons/ArrowLongRight";

export const Pagination = ({ data }) => {
  return (
    <section className="mt-6 flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Página
        <span className="font-medium text-gray-700 ml-1">
          {data.current_page} de {data.last_page}
        </span>
      </div>

      <div className="flex items-center gap-x-2">
        <Link
          as="button"
          type="button"
          href={data.prev_page_url}
          disabled={!data.prev_page_url}
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 disabled:cursor-not-allowed"
        >
          <ArrowLongLeft className="w-5 h-5 rtl:-scale-x-100" />
          <span className="hidden sm:block">Anterior</span>
        </Link>

        <Link
          as="button"
          type="button"
          href={data.next_page_url}
          disabled={!data.next_page_url}
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 disabled:cursor-not-allowed"
        >
          <span className="hidden sm:block">Próximo</span>
          <ArrowLongRight className="w-5 h-5 rtl:-scale-x-100" />
        </Link>
      </div>
    </section>
  );
};

Pagination.propTypes = {
  data: PropTypes.shape({
    current_page: PropTypes.number,
    last_page: PropTypes.number,
    prev_page_url: PropTypes.string,
    next_page_url: PropTypes.string,
  }).isRequired,
};
