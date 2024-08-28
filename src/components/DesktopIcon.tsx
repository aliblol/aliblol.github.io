import React from 'react';
import { LucideProps } from 'lucide-react';

type IconType = React.ComponentType<LucideProps>;

function DesktopIcon({ Icon, label, onClick }: { Icon: IconType, label: string, onClick: () => void }) {
    return (
        <div
            className="flex cursor-pointer flex-col items-center"
            onClick={onClick}
        >
            <div className="mb-1 rounded bg-gray-200 p-2">
                <Icon className="h-8 w-8" />
            </div>
            <span className="text-center text-white">{label}</span>
        </div>
    );
}

export default DesktopIcon;
