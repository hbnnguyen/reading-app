import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Box } from '@mui/material';

const Definition = ({ open, handleClose, word, wordDefinition }) => {
  const [dataToDisplay, setDataToDisplay] = useState("loading...");

  useEffect(() => {
    setDataToDisplay(wordDefinition);
  }, [wordDefinition]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>{word}</h2>
        <p> {dataToDisplay}</p>
      </Box>
    </Modal>
  );
};

export default Definition;
