const TitleBar = ({
    title,
    onClose,
}: {
    title: string;
    onClose?: () => void;
}) => {
    return (
        <div className="title-bar">
            <div className="title-bar-text">{title}</div>
            <div className="title-bar-controls">
                <button aria-label="Minimize"></button>
                <button aria-label="Maximize"></button>
                <button aria-label="Close" onClick={onClose}></button>
            </div>
        </div>
    );
};

export default TitleBar;
