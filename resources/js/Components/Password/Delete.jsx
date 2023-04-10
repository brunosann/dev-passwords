import { router } from "@inertiajs/react";
import route from "ziggy-js";

import DangerButton from "../DangerButton";
import Modal from "../Modal";
import SecondaryButton from "../SecondaryButton";

export const Delete = ({ id, setId }) => {
  const closeModal = () => {
    setId(null);
  };

  const handleDeletePassword = () => {
    router.delete(route("passwords.destroy", id));
    closeModal();
  };

  return (
    <Modal maxWidth="md" show={!!id} onClose={closeModal}>
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">
          Tem certeza de que deseja excluir a senha?
        </h2>

        <div className="mt-6 flex justify-end">
          <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
          <DangerButton className="ml-3" onClick={handleDeletePassword}>
            Deletar
          </DangerButton>
        </div>
      </div>
    </Modal>
  );
};
