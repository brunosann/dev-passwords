import route from "ziggy-js";

export const getPassword = async (id, isEdit = false) => {
  const params = isEdit
    ? { password: id, _query: { edit: true } }
    : { password: id };

  const response = await fetch(route("passwords.show", params));
  if (!response.ok) throw response;
  const responseJson = await response.json();

  return responseJson;
};
