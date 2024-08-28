import Window from "./Window"

const ProjectWindow = ({ toggleWindow }: { toggleWindow: () => void }) => (
    <Window title="My Projects" onClose={toggleWindow}>
        <ul>
            <li>Project 1: Windows 98 Portfolio</li>
            <li>Project 2: Attendance Management Web App</li>
            <li>Project 3: Smart Doorbell</li>
        </ul>
    </Window>
);

export default ProjectWindow;
