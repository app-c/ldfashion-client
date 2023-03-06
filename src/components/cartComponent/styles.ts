import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { cor } from "../../styles";

const w = Dimensions.get("window").width;

type colorButton = "a" | "b";

interface PropsBt {
  color: colorButton;
}

const variant = {
  yel: "#bda835",
  green: cor.green[1],
};

export const container = styled.View``;

export const title = styled.Text`
  color: ${cor.dark[1]};
  font-size: 24px;
  margin-bottom: 10px;
`;

export const text = styled.Text`
  color: ${cor.dark[1]};
  font-size: 16px;
`;

export const box = styled.View`
  flex-direction: row;
  padding: 20px;

  justify-content: space-between;
`;

export const imgBox = styled.Image`
  background-color: ${cor.dark[3]};
  width: ${w * 0.4}px;
  height: ${w * 0.4}px;
  border-radius: 5px;
`;

export const content = styled.View`
  width: ${w * 0.45}px;
`;

export const addContent = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const btContent = styled.View`
  flex-direction: row;
  width: ${w * 0.2}px;
  justify-content: space-between;
`;

export const addButton = styled.TouchableOpacity<PropsBt>`
  padding: 5px;
  background-color: ${(h) => variant[h.color]};
`;

export const button = styled.TouchableOpacity`
  padding: 5px 10px;

  align-items: center;
  justify-content: center;
  background-color: ${cor.pink[1]};
  margin-top: 20px;
  border-radius: 5px;
`;
