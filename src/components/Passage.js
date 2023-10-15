import "./Passage.css";

const Selectable = ({ word }) => {

  const handleClick = (e) => {
    if (e.type === 'click') {
      console.log('Left click');
    } else if (e.type === 'contextmenu') {
      e.preventDefault()
      console.log('Right click');
    }
  }

  return (
    <span
      className="selectable"
      onClick={handleClick}
      onContextMenu={handleClick}>
        {word}
    </span>
  )
}

const splitText = (text, from, to) => [
  text.slice(0, from),
  text.slice(from, to),
  text.slice(to)
];

const HighlightedText = ({ text, from, to }) => {
  const [start, highlight, finish] = splitText(text, from, to);
  return (
    <p>
      {start}
      <span style={{ backgroundColor: "yellow" }}>{highlight}</span>
      {finish}
    </p>
  );
};

const Passage = ({ text, isPaused, isSpeaking, highlightSection }) => {
  const buildParagraph = (text) => {
    const words = text.split(" ");
    const paragraph = [];

    words.forEach((word, index) => {
      paragraph.push(<Selectable key={index + word} word={word} />);
      paragraph.push(<span key={index + "space"}> </span>);
    });

    return paragraph;
  };

  const canSelect = () => {
    if (isPaused && isSpeaking) {
      return true;
    } else if (!isPaused && !isSpeaking) {
      return true;
    } if (!isPaused && isSpeaking) {
      return false;
    }
  };

  return (
    <div id="Passage">
      <h2>Passage</h2>
      <div id="paragraph">
        {
          canSelect() ? buildParagraph(text)
          : <HighlightedText text={text} {...highlightSection} />
        }
      </div>
    </div>
  );
};

export default Passage;