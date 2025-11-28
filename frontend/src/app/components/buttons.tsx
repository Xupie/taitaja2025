type ButtonPrimaryProps = {
    width: string;
    height: string;
    text: string;
    onClick?: () => void;
    disabled?: boolean;
};

export default function Button_Primary({
    width,
    height,
    text,
    onClick,
    disabled = false,
}: ButtonPrimaryProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-primary bg-foreground disabled:opacity-50`}
            style={{ width, height }}
        >{text}</button>
    );
}