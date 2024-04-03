export const TextInput = ({ placeholder, id, value, setValue }) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-white font-semibold mt-2 mb-2">
        {placeholder}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="p-2 rounded-md bg-black text-white border-2 border-solid border-white"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
