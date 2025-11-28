type InputWithIconProps = {
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon: string; // /public folder
};

//TODO: requirements for password/email
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
        bg-position-[left_10px_center]
        bg-size-[20px_20px]
      "
      style={{
        backgroundImage: `url('${icon}')`,
        paddingLeft: "2.5rem",
      }}
    />
  );
}