import { PropTypes } from "prop-types";
import { useState } from "react";

import { Eye } from "../Icons/Eye";
import { LockClosed } from "../Icons/LockClosed";
import { PencilSquare } from "../Icons/PencilSquare";
import SecondaryButton from "../SecondaryButton";
import { Pagination } from "./Pagination";
import { View } from "./View";

export const List = ({ passwords }) => {
  const [id, setId] = useState(false);

  return (
    <>
      <View id={id} setId={setId} />

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
                <p
                  style={{
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    textOverflow: "ellipsis",
                  }}
                  className="text-gray-600 text-md"
                >
                  {(password.username &&
                    password.description &&
                    `${password.username} / ${password.description}`) ||
                    (password.username && `${password.username}`) ||
                    (password.description && `${password.description}`)}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              <SecondaryButton
                className="gap-1"
                onClick={() => setId(password.id)}
              >
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

      <Pagination data={passwords} />
    </>
  );
};

List.propTypes = {
  passwords: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        username: PropTypes.string,
        description: PropTypes.string,
      })
    ).isRequired,
  }),
};
