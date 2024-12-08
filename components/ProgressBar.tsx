
interface ProgressBarProps {
    currentIndexQuestion: number;
    totalQuestions: number;
}

export function ProgressBar({ currentIndexQuestion, totalQuestions }: ProgressBarProps) {
    return (
        <div className="flex flex-col">
            {totalQuestions - currentIndexQuestion} questions restantes
            <div className="flex flex-row w-full">
                <div
                    className={`bg-gold h-2.5 rounded-full transition-all duration-300`}
                    style={{ width: `${(currentIndexQuestion + 1) / totalQuestions * 100}%` }}
                />
            </div>
        </div>
    );
} 