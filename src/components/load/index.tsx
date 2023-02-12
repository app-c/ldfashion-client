import React from "react";
import { cor } from "../../styles";

import * as S from "./styles";

export function Load() {
  return (
    <S.container>
      <S.load color={cor.dark[1]} size={34} />
    </S.container>
  );
}
