/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useState } from "react";
import fire from "@react-native-firebase/firestore";
import { Alert, FlatList } from "react-native";
import { CartConponet } from "../../components/cartComponent";
import { Header } from "../../components/header";
import { IModel } from "../../dto";

import * as S from "./styles";
import { useAuth } from "../../hooks/AuthContext";

export function Cart() {
  const { user, token } = useAuth();
  const [cart, setCart] = useState<IModel[]>([]);
  const [qnt, setQnt] = useState(1);

  const [load, setLoad] = useState(false);

  const loadData = useCallback(() => {
    try {
      fire()
        .collection("cart")
        .onSnapshot((j) => {
          const rs = j.docs.map((h) => {
            return {
              ...h.data(),
              id: h.id,
            } as IModel;
          });

          setCart(
            rs.filter((h) => {
              if (
                h.user.nome === user.nome &&
                h.user.telefone === user.telefone
              ) {
                return h;
              }
            })
          );
        });
    } catch (err) {
      Alert.alert("Erro", "algo deu errado ao carregar seus dados");
    }
  }, [user.nome, user.telefone]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const plus = useCallback(
    (item: IModel) => {
      const index = cart.findIndex((i) => i.id === item.id);
      const arrSelect = [...cart];

      if (item.qntBuy < item.quantity) {
        setQnt(qnt + 1);
        const dt = {
          ...item,
          qntBuy: item.qntBuy + 1,
        };

        arrSelect[index] = dt;

        setCart(arrSelect);
      }
    },
    [cart, qnt]
  );

  const minus = useCallback(
    (item: IModel) => {
      const index = cart.findIndex((i) => i.id === item.id);
      const arrSelect = [...cart];

      if (item.qntBuy > 1) {
        const dt = {
          ...item,
          qntBuy: item.qntBuy - 1,
        };

        arrSelect[index] = dt;

        setCart(arrSelect);
      }
    },
    [cart]
  );

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

  const onlyBuy = useCallback(
    (item: IModel) => {
      setLoad(true);

      const rs = {
        ...item,
        amount: item.amount * qnt,
      };
      try {
        fire()
          .collection("order")
          .add(rs)
          .then(() => {
            fire()
              .collection("cart")
              .doc(item.id)
              .delete()
              .then(() => {
                setLoad(false);
                sendMessage();
              })
              .catch((h) => console.log(h));
          });
      } catch (err) {
        setLoad(false);
        console.log(err);
      }
    },
    [qnt]
  );

  return (
    <S.container>
      <Header />
      <S.Title>Meu carrinho</S.Title>

      <FlatList
        data={cart}
        keyExtractor={(h) => String(h.id)}
        renderItem={({ item: h }) => (
          <CartConponet
            load={load}
            onlyBuy={() => onlyBuy(h)}
            minus={() => minus(h)}
            plus={() => plus(h)}
            data={h}
          />
        )}
      />
    </S.container>
  );
}
