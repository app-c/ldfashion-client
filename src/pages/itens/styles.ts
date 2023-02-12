import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { cor } from "../../styles";

const w = Dimensions.get("window").width;
export const container = styled.View`
  flex: 1;
  background-color: ${cor.dark[4]};
`;

export const title = styled.Text`
  color: ${cor.dark[1]};
  margin-top: 10px;
  font-size: 22px;
`;

export const box = styled.TouchableOpacity`
  padding: 20px;
`;

export const imgBox = styled.View`
  background-color: ${cor.dark[2]};
  border-radius: 4px;

  width: 100%;
  height: ${w * 0.5}px;
`;

export const content = styled.View`
  flex-direction: row;
  width: 100%;

  justify-content: space-between;
`;
