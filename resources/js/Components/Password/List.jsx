import { Menu, Transition } from "@headlessui/react";
import { PropTypes } from "prop-types";
import { Fragment, useState } from "react";

import { EditPassword } from "../Forms/Password/Edit";
import { EllipsisVertical } from "../Icons/EllipsisVertical";
import { Eye } from "../Icons/Eye";
import { LockClosed } from "../Icons/LockClosed";
import { PencilSquare } from "../Icons/PencilSquare";
import { Trash } from "../Icons/Trash";
import SecondaryButton from "../SecondaryButton";
import { Delete } from "./Delete";
import { Pagination } from "./Pagination";
import { View } from "./View";

export const List = ({ passwords }) => {
  const [idView, setIdView] = useState(null);
  const [idEdit, setIdEdit] = useState(null);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  const handleView = (id) => {
    setIsOpenView(true);
    setIdView(id);
  };

  const handleEdit = (id) => {
    setIsOpenEdit(true);
    setIdEdit(id);
  };

  const handleDelete = (id) => {
    setIdDelete(id);
  };

  return (
    <>
      <View
        id={idView}
        setOpen={setIsOpenView}
        open={isOpenView}
        setId={setIdView}
      />
      <EditPassword id={idEdit} open={isOpenEdit} setOpen={setIsOpenEdit} />
      <Delete id={idDelete} setId={setIdDelete} />
      <ul className="flex flex-col gap-4">
        {passwords.data?.map((password) => (
          <li
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
            <div className="flex items-center">
              <div className="hidden sm:flex gap-2">
                <SecondaryButton
                  className="gap-1"
                  onClick={() => handleView(password.id)}
                >
                  <Eye className="w-5 h-5" />
                </SecondaryButton>
                <SecondaryButton
                  className="gap-1"
                  onClick={() => handleEdit(password.id)}
                >
                  <PencilSquare className="w-5 h-5" />
                </SecondaryButton>
                <SecondaryButton
                  className="gap-1"
                  onClick={() => handleDelete(password.id)}
                >
                  <Trash className="w-5 h-5" />
                </SecondaryButton>
              </div>
              <div className="block sm:hidden">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button as="div">
                    <SecondaryButton className="gap-1">
                      <EllipsisVertical className="w-5 h-5" />
                    </SecondaryButton>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-1 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <Menu.Item>
                        <div>
                          <SecondaryButton
                            className="gap-1 border-0 w-full"
                            onClick={() => handleView(password.id)}
                          >
                            <Eye className="w-5 h-5" />
                            <span>Visualizar</span>
                          </SecondaryButton>
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        <div>
                          <SecondaryButton
                            className="gap-1 border-0 w-full"
                            onClick={() => handleEdit(password.id)}
                          >
                            <PencilSquare className="w-5 h-5" />
                            <span>Editar</span>
                          </SecondaryButton>
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        <div>
                          <SecondaryButton
                            className="gap-1 border-0 w-full"
                            onClick={() => handleDelete(password.id)}
                          >
                            <Trash className="w-5 h-5" />
                            <span>Deletar</span>
                          </SecondaryButton>
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </li>
        ))}
      </ul>

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
