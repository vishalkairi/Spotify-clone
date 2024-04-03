import { Icon } from "@iconify/react";
export const IconComponent = ({ icon, text, active }) => {
  return (
    <div
      className={`
         hover:text-white hover:cursor-pointer flex justify-start items-center`}
    >
      <Icon
        icon={icon}
        className={`${
          active ? `text-white` : `text-zinc-600`
        }  hover:text-white ml-6 inline-block`}
        width="20"
        height="30"
      />
      <span
        className={`${
          active ? `text-white` : `text-zinc-600`
        } hover:text-white ml-4 text-lg hover:underline hover:underline-offset-1`}
      >
        {text}
      </span>
    </div>
  );
};
