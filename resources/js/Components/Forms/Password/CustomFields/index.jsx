import { Trash } from "@/Components/Icons/Trash";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";

export const CustomFields = ({ customFields, setData, errors }) => {
  const handleOnChangeCustomField = ({ target }) => {
    const field = target.dataset.field;
    const key = target.dataset.key;
    const value = target.value;

    if (!field || !key) return;

    const modifiedCustomFields = customFields;
    modifiedCustomFields[key][field] = value;

    setData("custom_fields", modifiedCustomFields);
  };

  const handleCustomFields = () => {
    setData("custom_fields", [{ name: "", value: "" }, ...customFields]);
  };

  const handleDeleteCustomField = (key) => {
    const modifiedCustomFields = customFields;
    modifiedCustomFields.splice(key, 1);
    setData("custom_fields", modifiedCustomFields);
  };

  return (
    <div className="sm:mt-8 border-t-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 sm:mt-4 mb-2">
        <p className="text-base leading-6 text-gray-900 mb-1 sm:mb-0">
          Campos personalizados
        </p>
        <SecondaryButton onClick={handleCustomFields}>
          Adicionar campo
        </SecondaryButton>
      </div>

      {customFields.map((field, index) => (
        <div key={index} className="mb-2">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <TextInput
                data-field="name"
                data-key={index}
                value={field.name}
                className="mt-1 block w-full"
                onChange={handleOnChangeCustomField}
                placeholder="website"
              />
            </div>

            <div className="flex-[2]">
              <TextInput
                data-field="value"
                data-key={index}
                value={field.value}
                className="mt-1 block w-full"
                onChange={handleOnChangeCustomField}
                placeholder="https://mail.google.com"
              />
            </div>
            <button
              type="button"
              onClick={() => handleDeleteCustomField(index)}
            >
              <Trash className="w-5 h-5 text-red-500" />
            </button>
          </div>

          <InputError
            message={
              errors[`custom_fields.${index}.name`] ||
              errors[`custom_fields.${index}.value`]
            }
            className="mt-2"
          />
        </div>
      ))}
    </div>
  );
};
