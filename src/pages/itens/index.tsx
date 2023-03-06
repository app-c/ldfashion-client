import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import fire from "@react-native-firebase/firestore";
import { Header } from "../../components/header";
import { ICategory, IModel } from "../../dto";
import { useAuth } from "../../hooks/AuthContext";
import * as S from "./styles";
import { currency } from "../../utils";

interface IItem {
  category: string;
}

type Tm = "P" | "M" | "G" | "GG" | "G1" | "G2" | "G3";

interface ITM {
  tm: Tm;
}

const order = {
  P: 1,
  M: 2,
  G: 3,
  GG: 4,
  G1: 5,
  G2: 6,
  G3: 7,
};
export function Item() {
  const { user } = useAuth();
  const nv = useNavigation();
  const route = useRoute();
  const { category } = route.params as IItem;

  const [data, setData] = useState<IModel[]>([]);

  const handleNavigateBuy = useCallback(
    (item: IModel) => {
      nv.navigate("buy", item);
    },
    [nv]
  );

  const loadData = useCallback(() => {
    fire()
      .collection("model")
      .onSnapshot((h) => {
        const rs = h.docs.map((p) => {
          return {
            ...p.data(),
            id: p.id,
          } as IModel;
        });

        setData(rs.filter((h) => h.category === category));
      });
  }, [category]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const list = useMemo(() => {
    return data
      .map((h) => {
        const vl = String(h.amount);
        const amount = currency(vl);
        return {
          ...h,
          order: order[h.tamanho],
          valor: amount,
        };
      })
      .sort((a, b) => {
        if (a.order < b.order) {
          return -1;
        }
        return 1;
      });
  }, [data]);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

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
            <S.imgBox
              contentFit="contain"
              placeholder={blurhash}
              // resizeMode="contain"
              source={{ uri: h.image }}
            />

            <S.content>
              <S.title>tamanho: {h.tamanho}</S.title>
              <S.title>R$ {h.valor}</S.title>
            </S.content>
          </S.box>
        )}
      />
    </S.container>
  );
}
