'use client'

type ButtonPrimaryProps = {
    width: string;
    height: string;
    text: string;
    onClick?: () => void;
    disabled?: boolean;
};

export default function Button_Primary(
    { 
        width, 
        height, 
        text,
        onClick,
        disabled = false,
    }: ButtonPrimaryProps) {
    return (
        <button onClick={onClick} disabled={disabled} className={`btn btn-primary bg-foreground h-${height} w-${width} disabled:opacity-50`}>{text}</button>
    );
}