export type ButtonGroupProps = {
  label: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ButtonGroup({
  label,
  value,
  setValue,
  options,
}: ButtonGroupProps) {
  return (
    <div className="mx-auto w-80">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="flex flex-row">
        {options.map((option, index) => (
          <button
            key={option}
            className={classNames(
              option === value
                ? "bg-green-800 font-semibold text-white"
                : "bg-slate-400 text-gray-900",
              index === 0 ? "rounded-l-md" : "",
              index === options.length - 1 ? "rounded-r-md" : "",
              "border border-black ",
              "relative w-full cursor-pointer select-none py-2 pl-2 pr-2 text-center hover:bg-green-600",
            )}
            onClick={() => setValue(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
