import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import { FlatList } from "react-native";
import { Header } from "../../components/header";
import { ICategory, IModel } from "../../dto";
import { useAuth } from "../../hooks/AuthContext";
import * as S from "./styles";

export function Item() {
  const { user } = useAuth();
  const nv = useNavigation();
  const route = useRoute();
  const data = route.params as ICategory;

  const handleNavigateBuy = useCallback(
    (item: IModel) => {
      nv.navigate("buy", item);
    },
    [nv]
  );

  const list = useMemo(() => {
    const { description, category } = data;

    const rs = data.models.map((h) => {
      const vl = h.amount / 100;

      return {
        ...h,
        amount: vl,
        description,
        category,
        user,
      };
    });
    return rs;
  }, [data.models]);

  return (
    <S.container>
      <Header />

      <FlatList
        contentContainerStyle={{
          paddingBottom: 50,
          paddingTop: 20,
        }}
        data={list}
        keyExtractor={(h) => String(h.id)}
        renderItem={({ item: h }) => (
          <S.box onPress={() => handleNavigateBuy(h)}>
            <S.imgBox />

            <S.content>
              <S.title>tamanho: {h.tamanho}</S.title>
              <S.title>R$ {h.amount}</S.title>
            </S.content>
          </S.box>
        )}
      />
    </S.container>
  );
}
