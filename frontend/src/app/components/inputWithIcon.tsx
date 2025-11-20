'use client'

type InputWithIconProps = {
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon: string; // /public folder
};

//TODO: fix image overlap with text, requirements for password
export default function InputWithIcon({
  name,
  type = "text",
  placeholder,
  icon,
  required,
}: InputWithIconProps) {
  return (
    <input
      name={name}
      type={type}
      required={required}
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