import React, { useCallback, useMemo, useState } from "react";
import fire from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "../../components/header";
import * as S from "./styles";
import { IModel } from "../../dto";

export function Buy() {
  const nv = useNavigation();
  const route = useRoute();
  const data = route.params as IModel;

  const [qnt, setQnt] = useState(1);

  const plus = useCallback(() => {
    if (qnt < data.quantity) {
      setQnt(qnt + 1);
    }
  }, [data.quantity, qnt]);

  const minus = useCallback(() => {
    if (qnt > 1) {
      setQnt(qnt - 1);
    }
  }, [qnt]);

  const resp = useMemo(() => {
    const vl = data.amount * qnt;

    return {
      ...data,
      amount: vl,
    };
  }, [data, qnt]);

  const handleBuy = useCallback(() => {
    const rs = {
      ...resp,
      quantity: resp.quantity - qnt,
      qntBuy: qnt,
    };

    try {
      fire().collection("order").add(rs);

      Alert.alert("Sucesso", "pedido realizado");
      nv.navigate("home");
    } catch (err) {
      Alert.alert("Erro", "pedido realizado");
    }
  }, [nv, qnt, resp]);

  const handleCart = useCallback(() => {
    const rs = {
      ...resp,
      qntBuy: qnt,
    };

    try {
      fire().collection("cart").add(rs);

      Alert.alert("Sucesso", "Pedido adicionado no carrinho");
      nv.navigate("home");
    } catch (err) {
      Alert.alert("Erro", "pedido realizado");
    }
  }, [nv, qnt, resp]);

  return (
    <S.container>
      <Header />
      <S.title>Detalhes da compra</S.title>

      <S.box>
        <S.imgBox />
        <S.subText>{resp.category}</S.subText>
        <S.text>Tamanho: {resp.tamanho}</S.text>
      </S.box>

      <S.subTitle>Total: R$ {resp.amount}</S.subTitle>

      <S.add>
        <S.addButon onPress={minus}>
          <S.textAdd>-</S.textAdd>
        </S.addButon>

        <S.subTitle>{qnt}</S.subTitle>

        <S.addButon onPress={plus}>
          <S.textAdd>+</S.textAdd>
        </S.addButon>
      </S.add>

      <S.boxButon>
        <S.button onPress={handleCart} color="yel">
          <S.textAdd>Adicionar no carrinho</S.textAdd>
        </S.button>

        <S.button onPress={handleBuy} color="green">
          <S.textAdd>Finalizar pedido</S.textAdd>
        </S.button>
      </S.boxButon>
    </S.container>
  );
}
