import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
} from "react-native";

import Svg, { Circle, Rect } from "react-native-svg";

import * as S from "./styles";

import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/AuthContext";

export function LogIn() {
  const { signIn } = useAuth();
  const [nome, setNome] = useState("");
  const [tell, setTell] = useState("");

  const [load, setLoad] = useState(false);

  const handleLogIn = useCallback(() => {
    setLoad(true);

    if (nome === "" && tell === "") {
      setLoad(false);
      return Alert.alert("Erro", "Digite seu nome e telefone");
    }

    setTimeout(() => {
      signIn({
        nome,
        telefone: tell,
      });
      setLoad(false);
    }, 1000);
  }, [nome, signIn, tell]);
  return (
    <S.Container>
      <S.logo source={logo} />

      <S.boxInput>
        <S.title>Nome</S.title>
        <S.input onChangeText={setNome} placeholder="digite seu nome" />
      </S.boxInput>

      <S.boxInput>
        <S.title>Telefone</S.title>
        <S.input
          onChangeText={setTell}
          keyboardType="numeric"
          placeholder="digite seu telefone"
        />
      </S.boxInput>

      <S.button onPress={handleLogIn}>
        {load ? <ActivityIndicator /> : <S.text>Entrar</S.text>}
      </S.button>
    </S.Container>
  );
}
