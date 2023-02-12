import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as S from "./styles";

import { cor } from "../../styles";
import { useAuth } from "../../hooks/AuthContext";

interface Props {
  nome: string;
  pres: () => void;
}

export function Header() {
  const nv = useNavigation();
  const { signOut, user } = useAuth();

  return (
    <S.container>
      <S.content>
        <S.button onPress={() => signOut()}>
          <S.text>Sair</S.text>
        </S.button>
        <S.nome>{user.nome}</S.nome>

        <S.bottonIco onPress={() => nv.navigate("cart")}>
          <Entypo name="shopping-cart" size={30} color={cor.pink[1]} />
        </S.bottonIco>
      </S.content>
    </S.container>
  );
}
