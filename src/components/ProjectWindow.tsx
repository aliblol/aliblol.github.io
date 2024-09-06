import { useNavigate } from "react-router";
import Window from "./Window"

const ProjectWindow = ({ toggleWindow }: { toggleWindow: () => void }) => {
    const navigate = useNavigate();
    return (
    <Window title="My Projects" onClose={toggleWindow}>
        <ul>
            <li>Project 1: Windows 98 Portfolio</li>
            <li>Project 2: Attendance Management Web App</li>
            <li>Project 3: Smart Doorbell</li>
            <li onClick={() => navigate('f1-data-viz')}>Project 4: F1 Data Visualisation</li>
        </ul>
    </Window>
)};

export default ProjectWindow;
