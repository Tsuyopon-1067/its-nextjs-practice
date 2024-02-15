interface Props {
    length: number;
    setIdx: (idx: number) => void;
    idx: number;
}

export default function ProvinceSelectButton({ length, setIdx, idx }: Props) {
    const inc = () => {
        setIdx((idx + 1) % length);
    };
    const dec = () => {
        setIdx((idx + length - 1) % length);
    };

    return (
        <div>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
        </div>
    );
}
