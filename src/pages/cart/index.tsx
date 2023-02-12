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
  const { user } = useAuth();
  const [cart, setCart] = useState<IModel[]>([]);

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
        const dt = {
          ...item,
          qntBuy: item.qntBuy + 1,
        };

        arrSelect[index] = dt;

        setCart(arrSelect);
      }
    },
    [cart]
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

  const onlyBuy = useCallback((item: IModel) => {
    setLoad(true);
    try {
      fire()
        .collection("order")
        .add(item)
        .then(() => {
          fire()
            .collection("cart")
            .doc(item.id)
            .delete()
            .then(() => setLoad(false))
            .catch((h) => console.log(h));
        });
    } catch (err) {
      setLoad(false);
      console.log(err);
    }
  }, []);

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
