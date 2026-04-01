import styles from "./ImageFrame.module.css"

type ImageFrameProps = {
    src: string;
    className?: string;
}

function ImageFrame({ src, className }: ImageFrameProps) {
    return (
        <img src={src} className={`${styles.ImageFrame} ${className ?? ""}`} />
    );
}

export default ImageFrame;