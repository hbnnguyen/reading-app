import TextToSpeech from "./TextToSpeech";

const Main = () => {
  const text = "It is a truth universally acknowledged, that a single man in " +
    "possession of a good fortune, must be in want of a wife.";


  return (
    <div id="Main">
      <TextToSpeech text={text} />

    </div>
  )
}

export default Main;