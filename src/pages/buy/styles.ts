import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { cor } from "../../styles";

const w = Dimensions.get("window").width;

type colorButton = "yel" | "green";

interface PropsBt {
  color: colorButton;
}

const variant = {
  yel: "#bda835",
  green: cor.green[1],
};

export const container = styled.View`
  flex: 1;
  background-color: ${cor.dark[4]};
`;

export const box = styled.View`
  padding: 20px;
`;

export const title = styled.Text`
  color: ${cor.dark[1]};
  align-self: center;
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;

  margin-bottom: 30px;
`;

export const imgBox = styled.View`
  background-color: ${cor.dark[2]};
  height: ${w * 0.5}px;

  border-radius: 5px;
`;

export const subText = styled.Text`
  color: ${cor.dark[1]};
  font-size: 20px;
  margin: 10px;
`;
export const text = styled.Text`
  color: ${cor.dark[1]};
  font-size: 16px;
  margin: 1px 10px;
`;

export const subTitle = styled.Text`
  color: ${cor.dark[1]};
  font-size: 24px;
  margin: 10px;

  align-self: center;
  font-weight: bold;
`;

export const add = styled.View`
  flex-direction: row;
  align-self: center;
  justify-content: space-between;
  align-items: center;

  width: ${w * 0.4}px;
`;

export const addButon = styled.TouchableOpacity`
  width: 50px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${cor.dark[3]};
  border-radius: 4px;
`;

export const textAdd = styled.Text`
  color: ${cor.dark[1]};
  font-size: 20px;
  text-align: center;
`;

export const boxButon = styled.View`
  width: 100%;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  padding: 0 20px;

  top: 100px;
`;

export const button = styled.TouchableOpacity<PropsBt>`
  width: 127px;
  background-color: ${(h) => variant[h.color]};
  padding: 6px;
  border-radius: 5px;

  align-items: center;
  justify-content: center;
`;
