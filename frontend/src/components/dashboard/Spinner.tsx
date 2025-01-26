interface SpinnerProps {
    theme?: 'dark' | 'light';
}

export default function Spinner({ theme = 'light' }: SpinnerProps) {
    const borderColor = theme === 'dark' ? 'border-black border-b-black/20' : 'border-white border-b-white/20';

    return (
        <span className={`inline-block w-[20px] h-[20px] border-[3px] ${borderColor} rounded-[50%] animate-spin`}>
        </span>
    );
}
