import { ChangeEvent } from "react";

export function Select({
  value,
  onChange,
  options,
  label,
  isDisabled,
}: Readonly<{
  value: string | number;
  label: string;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; name: string }[];
  isDisabled?: boolean;
}>) {
  return (
    <div className="flex flex-col items-start gap-1 portrait:flex-1">
      <label className="text-xs text-gray-300 ml-1 portrait:hidden">
        {label}
      </label>
      <select
        disabled={isDisabled}
        className="bg-gray-700 rounded-md cursor-pointer hover:bg-gray-800 transition ease-in active:ring-0 active:border-0 p-2 min-w-[200px] sm:min-w-full portrait:min-w-0 portrait:w-full"
        id={label}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
