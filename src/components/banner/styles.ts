import { Image } from "expo-image";
import styled from "styled-components/native";
import { cor } from "../../styles";

export const container = styled.TouchableOpacity`
  padding: 20px;
  margin: 20px 0;
`;

export const content = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
`;

export const imgBox = styled(Image)`
  background-color: ${cor.dark[3]};
  width: 150px;
  height: 100px;
`;

export const boxText = styled.View`
  width: 50%;
  margin-left: 20px;
`;

export const title = styled.Text`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 22px;
  color: ${cor.green[1]};
`;

export const text = styled.Text`
  color: ${cor.dark[1]};
  font-size: 20px;
  margin-top: 10px;
`;
