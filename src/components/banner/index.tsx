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
      <S.title>{title}</S.title>
      <S.content>
        <S.imgBox contentFit="contain" source={{ uri: img }} />

        <S.boxText>
          <S.text>{text}</S.text>
        </S.boxText>
      </S.content>
    </S.container>
  );
}
