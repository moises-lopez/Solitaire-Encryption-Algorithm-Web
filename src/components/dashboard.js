import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { fullEncrypt, fullDecrypt } from "./../scripts/solitari";
import { Button } from "@material-ui/core";

const Dashboard = () => {
  let [deckCards, setDeckCards] = useState("");
  let [message, setMessage] = useState("");
  let [messageD, setMessageD] = useState("");
  let [fullKeyD, setFullKeyD] = useState([]);
  let [encryptedMessageText, setEncryptedMessageText] = useState("");
  let [fullKey, setFullKey] = useState([]);
  let [DecryptedMessageText, setDecryptedMessageText] = useState("");

  const handleEncrypt = () => {
    let [fullKeyAux, messageEncrypted] = fullEncrypt(deckCards, message);
    setEncryptedMessageText(messageEncrypted);
    setFullKey(fullKeyAux);
  };

  const handleDecrypt = () => {
    let decryptedM = fullDecrypt(messageD, fullKeyD);
    setDecryptedMessageText(decryptedM);
  };

  return (
    <React.Fragment>
      <ContainerRow>
        <Container>
          <h1 style={{ margin: "1.5rem 5rem", width: "35rem" }}>ENCRYPT</h1>
          <p style={{ margin: "1.5rem 5rem", width: "35rem" }}>
            Deck Cards Test = 1 4 7 10 13 16 19 22 25 28 3 6 9 12 15 18 21 24 27
            2 5 8 11 14 17 20 23 26
          </p>
          <TextField
            style={{ margin: "1.5rem 5rem", width: "35rem" }}
            value={deckCards}
            onChange={(e) => setDeckCards(e.target.value)}
            id='standard-basic'
            label='Cards Array'
          />
          <TextField
            style={{ margin: "1.5rem 5rem", width: "35rem" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id='standard-basic'
            label='Message'
          />
          <Button
            style={{ margin: "1.5rem 5rem", width: "35rem" }}
            onClick={() => handleEncrypt()}
            variant='contained'
            color='primary'
          >
            Encrypt
          </Button>
          <Text>Encrypted Message : {encryptedMessageText}</Text>
          <Text>Key Generated : {fullKey}</Text>
        </Container>
        <Container>
          <h1 style={{ margin: "1.5rem 5rem", width: "35rem" }}>DECRYPT</h1>
          <TextField
            style={{ margin: "1.5rem 5rem", width: "35rem" }}
            value={messageD}
            onChange={(e) => setMessageD(e.target.value)}
            id='standard-basic'
            label='Message to decrypt'
          />
          <TextField
            style={{ margin: "1.5rem 5rem", width: "35rem" }}
            value={fullKeyD}
            onChange={(e) => setFullKeyD(e.target.value)}
            id='standard-basic'
            label='Key Generated'
          />
          <Button
            style={{ margin: "1.5rem 5rem", width: "35rem" }}
            onClick={() => handleDecrypt()}
            variant='contained'
            color='primary'
          >
            Decrypt
          </Button>
          <Text>Decrypted Message : {DecryptedMessageText}</Text>
        </Container>
      </ContainerRow>
      <Spacer></Spacer>
    </React.Fragment>
  );
};

const ContainerRow = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: flex-start;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  align-items: flex-start;
`;

const Text = styled.div`
  margin: 0.5rem 0.5rem 0.5rem 5rem;
`;

const Spacer = styled.div`
  margin-bottom: 5rem;
`;

const styles = (theme) => ({
  textField: {
    width: "35rem",
  },
});

export default Dashboard;
