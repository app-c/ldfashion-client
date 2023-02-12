import React from "react";

import * as S from "./styles";

interface Props {
  pres: () => void;
  title: string;
  img: string;
  text: string;
}

export function Banner({ pres, title, img, text }: Props) {
  return (
    <S.container onPress={pres}>
      <S.box>
        <S.title>{title}</S.title>
        <S.imgBox>
          <S.text>{img}</S.text>
        </S.imgBox>
      </S.box>

      <S.boxText>
        <S.text>{text}</S.text>
      </S.boxText>
    </S.container>
  );
}
