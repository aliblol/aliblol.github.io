import { useState } from "react";
import { Folder, User } from "lucide-react";
import DesktopIcon from "./components/DesktopIcon";
import TitleBar from "./components/TitleBar";
import ProjectWindow from "./components/ProjectWindow";

export default function Component() {
    const [isProjectWindowOpen, setIsProjectWindowOpen] = useState(false);
    const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);

    const toggleProjectWindow = () =>
        setIsProjectWindowOpen(!isProjectWindowOpen);
    const toggleAboutMe = () => setIsAboutMeOpen(!isAboutMeOpen);

    return (
        <div>
            <TitleBar title="Alice's Portfolio" />
            <div>
                <div id="desktop-icons" className="flex flex-row p-4 space-x-4">
                    <DesktopIcon
                        Icon={User}
                        label="About Me"
                        onClick={toggleAboutMe}
                    />
                    <DesktopIcon
                        Icon={Folder}
                        label="Projects"
                        onClick={toggleProjectWindow}
                    />
                </div>
                {isProjectWindowOpen && (
                    <ProjectWindow toggleWindow={toggleProjectWindow} />
                )}
            </div>
        </div>
    );
}
