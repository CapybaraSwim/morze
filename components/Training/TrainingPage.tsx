import { FC, useState } from "react";
import Controls from "./Controls";
import Training from "./Training";
import styles from "./TrainingPage.module.scss";

const TrainingPage: FC = () => {
    const [stage, setStage] = useState<"controls" | "training">("controls");
    const [trainingParams, setTrainingParams] = useState<{
        speed: number;
        groups: number;
        symbols: string[];
    } | null>(null);

    const handleStart = (speed: number, groups: number, symbols: string[]) => {
        setTrainingParams({ speed, groups, symbols });
        setStage("training");
    };

    const handleFinish = () => {
        setStage("controls");
    };

    return (
        <div className={styles.trainingPage}>
            
            {stage === "controls" && <Controls onStart={handleStart} />}
            {stage === "training" && trainingParams && (
                <Training
                    speed={trainingParams.speed}
                    groups={trainingParams.groups}
                    symbols={trainingParams.symbols}
                    onFinish={handleFinish}
                />
            )}
        </div>
    );
};

export default TrainingPage;