import React from "react";

import { AntDesign } from "@expo/vector-icons";

import * as S from "./styles";
import { cor } from "../../styles";
import { IModel } from "../../dto";
import { Load } from "../load";
import { currency, number } from "../../utils";

interface Props {
  data: IModel;
  plus: () => void;
  minus: () => void;
  onlyBuy: () => void;
  load: boolean;
}

export function CartConponet({ data, minus, onlyBuy, load, plus }: Props) {
  const valor = number(String(data.amount));
  const vl = Number(valor) * data.qntBuy;
  const amount = currency(String(vl));

  console.log(vl);
  return (
    <S.container>
      <S.box>
        <S.imgBox source={{ uri: data.image }} />

        <S.content>
          <S.title>{data.category}</S.title>

          <S.text>Tamanho: {data.tamanho}</S.text>

          <S.addContent>
            <S.text>Qnt. {data.qntBuy}</S.text>
            <S.btContent>
              <S.addButton onPress={minus} color="a">
                <AntDesign name="minuscircleo" color={cor.dark[1]} size={20} />
              </S.addButton>

              <S.addButton onPress={plus} color="b">
                <AntDesign name="pluscircleo" color={cor.pink[1]} size={20} />
              </S.addButton>
            </S.btContent>
          </S.addContent>

          <S.text>total: R$ {amount}</S.text>

          <S.button onPress={onlyBuy}>
            {load ? <Load /> : <S.text>Comprar</S.text>}
          </S.button>
        </S.content>
      </S.box>
    </S.container>
  );
}
