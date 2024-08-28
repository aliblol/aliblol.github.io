import TitleBar from "./TitleBar";

function Window({
    title,
    children,
    onClose,
}: {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}) {
    return (
        <div className="absolute left-1/4 top-1/4 w-1/2 window">
            <TitleBar title={title} onClose={onClose} />
            <div className="window-body">{children}</div>
        </div>
    );
}

export default Window;
