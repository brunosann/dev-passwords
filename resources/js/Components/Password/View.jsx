/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import route from "ziggy-js";

import Overlay from "../Overlay";
import { ItemView } from "./ItemView";

export const View = ({ id, setId }) => {
  const [password, setPassword] = useState(null);

  useEffect(() => {
    if (!id) return;
    getPassword();
    return () => setPassword(null);
  }, [id]);

  const getPassword = useCallback(async () => {
    try {
      const response = await fetch(route("passwords.show", id));
      if (!response.ok) throw response;
      const responseJson = await response.json();
      setPassword(responseJson);
    } catch (error) {
      console.log("error", error);
    }
  }, [id]);

  return (
    <Overlay title="Visualizar senha" open={!!id} setOpen={setId}>
      {password ? (
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
      ) : null}
    </Overlay>
  );
};
