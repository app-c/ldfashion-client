import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import fire from "@react-native-firebase/firestore";
import { Banner } from "../../components/banner";
import { Header } from "../../components/header";
import { Tipo } from "../../components/tipo";
import { ICategory, IType } from "../../dto";

import * as S from "./styles";

export function Home() {
  const { navigate } = useNavigation();
  const [type, setType] = useState<IType[]>([]);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [selected, setSelected] = useState("");

  const loadData = useCallback(() => {
    fire()
      .collection("type")
      .onSnapshot((h) => {
        const rs = h.docs.map((p) => {
          return {
            ...p.data(),
            id: p.id,
          } as IType;
        });

        setType(
          rs.sort((a, b) => {
            if (a.type < b.type) {
              return -1;
            }
            return 1;
          })
        );
      });

    fire()
      .collection("category")
      .onSnapshot((h) => {
        const rs = h.docs.map((p) => {
          return {
            ...p.data(),
            id: p.id,
          } as ICategory;
        });

        setCategory(
          rs.sort((a, b) => {
            if (a.type < b.type) {
              return -1;
            }
            return 1;
          })
        );
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const fil = useMemo(() => {
    const rs = category.filter((h) => h.type === selected);

    return rs;
  }, [category, selected]);

  const handleNavigate = useCallback(
    (item: ICategory) => {
      navigate("item", item);
    },
    [navigate]
  );

  return (
    <S.container>
      <Header />

      <S.BoxTipo>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 30 }}
          horizontal
          data={type}
          keyExtractor={(h) => h.id}
          renderItem={({ item: h }) => (
            <S.box>
              <Tipo
                pres={() => setSelected(h.type)}
                select={selected === h.type}
                title={h.type}
              />
            </S.box>
          )}
        />
      </S.BoxTipo>

      <FlatList
        contentContainerStyle={{ paddingBottom: 40 }}
        data={fil}
        keyExtractor={(h) => String(h.id)}
        renderItem={({ item: h, index: i }) => (
          <Banner
            title={h.category}
            text={h.description}
            pres={() => handleNavigate(h)}
            img={h.models[i].image}
          />
        )}
      />
    </S.container>
  );
}
