import React, { ChangeEvent, FocusEvent } from "react";
import { FieldMetaProps } from "formik";

interface InputProps {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  name: string;
  type?: string;
  layout?: "col" | "gap";
  meta?: FieldMetaProps<string>;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  name,
  onChange,
  onBlur,
  layout,
  meta,
}) => {
  return (
    <div className={`flex ${layout === "col" ? "flex-col" : ""} gap-[6px]`}>
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        className="bg-gray-600 p-2 rounded"
      />
      {meta?.touched && meta.error && (
        <span className="text-red-500 text-[12px]">{meta.error}</span>
      )}
    </div>
  );
};

export default Input;
