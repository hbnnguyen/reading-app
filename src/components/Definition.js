import React, { useCallback, useEffect, useState } from 'react';

const Definition = ({ word, wordDefinitions }) => {
  const [dataToDisplay, setDataToDisplay] = useState([])


//   const meanings = wordDefinitions[0].meanings;
//   const toDisplay = useCallback(() => {
//     if (meanings) {
//       const array = [];
//       meanings.forEach((meaning, index) => {
//         array[index] = {};
//         array[index].partOfSpeech = meaning.partOfSpeech;
//         array[index].definitions = [];
//         meaning.definitions.forEach((d) => {
//           array[index].definitions.push(d.definition);
//         });
//       });
//       return array;
//     }
//   }, [meanings]);

//   useEffect(() => {
//     const array = toDisplay();
//     setDataToDisplay(array)
//   }, [word, toDisplay]);

//   return (

   useEffect(() => {
    setDataToDisplay(wordDefinitions)
    console.log(wordDefinitions);
  });
  return(

    <div>
      <h2>{word}</h2>
      <p> {dataToDisplay}</p>
    </div>
  )
  // const meanings = wordDefinitions[0].meanings;
  // const toDisplay = useCallback(() => {
  //   if (meanings) {
  //     const array = [];
  //     meanings.forEach((meaning, index) => {
  //       array[index] = {};
  //       array[index].partOfSpeech = meaning.partOfSpeech;
  //       array[index].definitions = [];
  //       meaning.definitions.forEach((d) => {
  //         array[index].definitions.push(d.definition);
  //       });
  //     });
  //     return array;
  //   }
  // }, [meanings]);

  // useEffect(() => {
  //   const array = toDisplay();
  //   setDataToDisplay(array)
  //   console.log(array);
  // }, [word, toDisplay]);

  // return (
  //   <div>
  //     <h2>{word}</h2>
  //     <div>
  //     {dataToDisplay &&
  //         dataToDisplay.map((data, index) => (
  //           <div key={word+"Meaning"+index}>
  //             <h3>Part of Speech: {data.partOfSpeech}</h3>
  //             <ul>
  //               {data.definitions.map((definition, definitionIndex) => (
  //                 <li key={word+"Def"+definitionIndex}>{definition}</li>
  //               ))}
  //             </ul>
  //           </div>
  //         ))}
  //     </div>
  //   </div>
  // );
};

export default Definition;
