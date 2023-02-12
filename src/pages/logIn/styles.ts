import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { cor } from "../../styles";

const w = Dimensions.get("window").width;

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.dark[4]};

  align-items: center;
  justify-content: center;
`;

export const logo = styled.Image`
  margin-bottom: 30px;
`;

export const title = styled.Text`
  color: ${cor.dark[1]};
  font-weight: bold;

  margin-top: 20px;
`;

export const boxInput = styled.View``;

export const input = styled.TextInput`
  background-color: ${cor.dark[1]};
  width: ${w * 0.8}px;
  height: 45px;

  border-radius: 5px;
  padding: 2px 15px;

  margin: 10px 0;
`;

export const button = styled.TouchableOpacity`
  margin-top: 20px;
  background: ${cor.green[1]};
  width: ${w * 0.8}px;

  align-items: center;
  justify-content: center;
  padding: 15px;

  border-radius: 5px;
`;

export const text = styled.Text`
  color: ${cor.dark[1]};
  font-weight: bold;
`;
