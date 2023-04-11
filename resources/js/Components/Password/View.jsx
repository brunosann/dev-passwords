/* eslint-disable react-hooks/exhaustive-deps */
import { PropTypes } from "prop-types";
import { useCallback, useEffect, useState } from "react";

import { getPassword } from "@/Services/Password";

import Overlay from "../Overlay";
import { ItemView } from "./ItemView";

export const View = ({ id, open, setOpen, setId }) => {
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    handleInit();
    return () => {
      setPassword(null);
    };
  }, [id]);

  const handleInit = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPassword(id);
      if (response.ok && !response.ok) throw response;
      setPassword(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  return (
    <Overlay
      title="Visualizar senha"
      open={open}
      setOpen={(state) => {
        setOpen(state);
        if (!state) setId(null);
      }}
    >
      <>
        {password && (
          <>
            <ul className="flex flex-col gap-2">
              <li>
                <ItemView label="Nome" name={password.name} />
              </li>
              {password.username && (
                <li>
                  <ItemView label="Username" name={password.username} />
                </li>
              )}
              <li>
                <ItemView label="Senha" name={password.password} />
              </li>
              {password.description && (
                <li>
                  <ItemView label="Descrição" name={password.description} />
                </li>
              )}
            </ul>
            {password.custom_fields.length >= 1 && (
              <div className="mt-4 pt-4 border-t-2">
                <p className="leading-6 text-gray-900 mb-2">
                  Campos personalizados
                </p>
                <ul className="flex flex-col gap-2">
                  {password.custom_fields.map((field) => (
                    <ItemView
                      key={field.name}
                      label={field.name}
                      name={field.value}
                    />
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {loading && (
          <div className="animate-pulse">
            <div className="flex-1 space-y-6 py-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="w-16 h-2 bg-gray-400" />
                  <div className="h-2 bg-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    </Overlay>
  );
};

View.propTypes = {
  id: PropTypes.string,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setId: PropTypes.func.isRequired,
};
