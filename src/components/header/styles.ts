import styled from "styled-components/native";
import { cor } from "../../styles";

export const container = styled.View`
  background-color: ${cor.dark[3]};

  width: 100%;
  height: 100px;

  justify-content: flex-end;
`;

export const content = styled.View`
  height: 70%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
`;

export const box = styled.View`
  justify-content: space-between;
`;

export const button = styled.TouchableOpacity`
  background-color: ${cor.alert[2]};
  border-radius: 5px;

  width: 100px;
  padding: 6px;
  align-items: center;
  justify-content: center;
`;

export const text = styled.Text`
  color: ${cor.dark[1]};
`;

export const nome = styled.Text`
  color: ${cor.dark[1]};
  font-weight: bold;

  font-size: 18px;
`;

export const bottonIco = styled.TouchableOpacity``;
