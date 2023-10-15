const HighlightedText = ({ text, from, to }) => {
    const splitTextForHighlight = (text, from, to) => {
        return  [
                    text.slice(0, from),
                    text.slice(from, to),
                    text.slice(to)
                ];
    }
    
    const [start, highlight, finish] = splitTextForHighlight(text, from, to);

    return (
        <p>
        {start}
        <span style={{ backgroundColor: "yellow" }}>{highlight}</span>
        {finish}
        </p>
    );
};

export default HighlightedText;