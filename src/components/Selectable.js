
const Selectable = ({ getStartPoint, wordData }) => {
    const handleClick = (e) => {
      if (e.type === 'click') { // left click
        console.log(e.target)
        getStartPoint(wordData.startIndex)
        // when left click on a selectable word, the utterance should stop and begin again on said word.
      } else if (e.type === 'contextmenu') { // right click
        e.preventDefault()
        // when right click on a selectable, make a call to dictionary api to get the definition
        console.log('Right click');
      }
    }
  
    return (
      <span
        className="selectable"
        onClick={handleClick}
        onContextMenu={handleClick}
        startIndex={wordData.startIndex}
      >
          {wordData.word}
      </span>
    )
}

export default Selectable;

  