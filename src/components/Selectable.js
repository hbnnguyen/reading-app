const Selectable = ({ wordData, onContextMenu, getStartIndex, isHighlighted }) => {
    const handleClick = () => {
        getStartIndex(wordData.startIndex);
    };

    return (
        <span
            className={isHighlighted ? "selectable highlighted" : "selectable"}
            onClick={handleClick}
            onContextMenu={onContextMenu}
            startindex={wordData.startIndex}
        >
            {wordData.word}
        </span>
    );
};

export default Selectable;

