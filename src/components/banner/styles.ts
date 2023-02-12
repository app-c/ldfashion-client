import styled from "styled-components/native";
import { cor } from "../../styles";

export const container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 20px;
  margin-bottom: 40px;
`;

export const box = styled.View`
  width: 50%;
  height: 150px;
`;

export const imgBox = styled.View`
  background-color: ${cor.dark[3]};
  width: 100%;
  height: 100%;
`;

export const boxText = styled.View`
  width: 50%;

  padding: 20px 4px 10px 40px;
`;

export const title = styled.Text`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 22px;
  color: ${cor.dark[1]};
`;

export const text = styled.Text`
  color: ${cor.dark[1]};
  font-size: 20px;
  margin-top: 10px;
`;
