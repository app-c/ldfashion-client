import React, { useCallback, useEffect, useMemo, useState } from "react";
import fire from "@react-native-firebase/firestore";
import { Alert, Button, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "../../components/header";
import * as S from "./styles";
import { IModel } from "../../dto";
import { useAuth } from "../../hooks/AuthContext";
import { currency } from "../../utils";

export function Buy() {
  const { user, token } = useAuth();
  const nv = useNavigation();
  const route = useRoute();
  const data = route.params as IModel;

  const [qnt, setQnt] = useState(1);

  const sendMessage = useCallback(async () => {
    const message = {
      to: token,
      sound: "default",
      title: "Ordem de compra",
      body: `Cliente ${user.nome} está solicitando a compra de um novo produto`,
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }, [token, user.nome]);

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
    const vl = String(data.amount * qnt);
    const amount = currency(vl);

    return {
      ...data,
      user,
      amount,
    };
  }, [data, qnt, user]);

  const handleBuy = useCallback(() => {
    const rs = {
      ...resp,
      buyItemid: resp.id,
      qntBuy: qnt,
    };

    // sendMessage();

    try {
      fire()
        .collection("order")
        .add(rs)
        .then(() => {
          sendMessage();
        });
      Alert.alert("Sucesso", "pedido realizado");
      nv.navigate("home");
    } catch (err) {
      Alert.alert("Erro", "pedido realizado");
    }
  }, [nv, qnt, resp]);

  const handleCart = useCallback(() => {
    const rs = {
      ...resp,
      buyItemid: resp.id,
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

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <S.box>
          <S.imgBox contentFit="contain" source={{ uri: resp.image }} />
          <S.subText>{resp.category}</S.subText>
          <S.boxC>
            <S.text>Tamanho: {resp.tamanho}</S.text>
            <S.text>Estoque: {resp.quantity}</S.text>
          </S.boxC>
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
      </ScrollView>
    </S.container>
  );
}
