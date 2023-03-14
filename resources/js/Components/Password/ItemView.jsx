import { PropTypes } from "prop-types";
import { useState } from "react";

import { Clipboard } from "../Icons/Clipboard";
import { ClipboardCheck } from "../Icons/ClipboardCheck";

export const ItemView = ({ label, name }) => {
  const [copied, setCopied] = useState(false);

  const copyTextToClipboard = async () => {
    setCopied(true);
    if ("clipboard" in navigator) await navigator.clipboard.writeText(name);
    else document.execCommand("copy", true, name);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <p className="font-medium text-sm text-gray-700">{label}</p>
      <div className="flex justify-between items-center">
        <p className="text-gray-700">{name}</p>
        <button
          type="button"
          className="transition-colors text-gray-700 hover:text-gray-900"
          onClick={copyTextToClipboard}
        >
          {copied ? (
            <ClipboardCheck className="w-6 h-6" />
          ) : (
            <Clipboard className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};

ItemView.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
