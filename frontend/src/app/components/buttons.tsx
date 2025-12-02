import styles from './buttons.module.css';
import Image from 'next/image';

type ButtonPrimaryProps = {
    width: string;
    height: string;
    text: string;
    onClick?: () => void;
    disabled?: boolean;
}

type ButtonIconProps = {
    size: string;
    onClick?: () => void;
    disabled?: boolean;
}

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
            className={`${styles.btn} ${styles['btn-primary']} disabled:opacity-50`}
            style={{ width, height }}
        >{text}</button>
    );
}

export function Button_Secondary({
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
            className={`${styles.btn} ${styles['btn-secondary']} font-inter disabled:opacity-50`}
            style={{ width, height }}
        >{text}</button>
    );
}

export function Button_Cancel({
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
            className={`${styles.btn} ${styles['btn-cancel']} disabled:opacity-50`}
            style={{ width, height }}
        >{text}</button>
    );
}

export function Button_Edit({
    size,
    onClick,
    disabled = false,
}: ButtonIconProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`${styles.btn} ${styles['btn-primary']} disabled:opacity-50`}
            style={{ width: size, height: size }}
        >
            <Image src={"/icons/edit/edit.svg"} alt={"Edit"} width={0} height={0} style={imageStyle} loading={"lazy"}/>
        </button>
    );
}

export function Button_Delete({
    size,
    onClick,
    disabled = false,
}: ButtonIconProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`${styles.btn} ${styles['btn-cancel']} disabled:opacity-50`}
            style={{ width: size, height: size }}
        >
            <Image src={"/icons/edit/bin.svg"} alt={"Delete"} width={0} height={0} style={imageStyle} loading={"lazy"}/>
        </button>
    );
}

const imageStyle = {
    width: '100%',
    height: '100%',
}