'use client'

type InputWithIconProps = {
  name: string;
  type?: string;
  placeholder?: string;
  icon: string; // /public folder
};

export default function InputWithIcon({
  name,
  type = "text",
  placeholder,
  icon,
}: InputWithIconProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="
        basic-input
        bg-no-repeat
        bg-[left_10px_center]
        bg-[length:20px_20px]
        pl-12
      "
      style={{
        backgroundImage: `url('${icon}')`,
      }}
    />
  );
}