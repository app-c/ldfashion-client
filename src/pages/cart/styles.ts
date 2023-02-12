import styled from "styled-components/native";
import { cor } from "../../styles";

export const container = styled.View`
  background-color: ${cor.dark[4]};
  flex: 1;
`;

export const Title = styled.Text`
  color: ${cor.dark[1]};

  font-size: 24px;
  align-self: center;
  margin: 10px 0;
`;
