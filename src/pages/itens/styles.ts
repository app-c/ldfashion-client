import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { Image } from "expo-image";
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

export const imgBox = styled(Image)`
  background-color: ${cor.dark[2]};
  border-radius: 4px;

  /* width: ${w * 0.8}px; */
  height: ${w * 1.3}px;
  background-color: ${cor.dark[4]};
`;

export const content = styled.View`
  flex-direction: row;
  width: 100%;

  justify-content: space-between;
`;
