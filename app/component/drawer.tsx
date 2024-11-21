import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Drawer() {
  // Estado para controlar la visibilidad del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animación para el menú
  const slideAnim = useRef(
    new Animated.Value(-Dimensions.get("window").width)
  ).current;

  // Animaciones para los textos del menú
  const profileAnim = useRef(new Animated.Value(1)).current;
  const walletAnim = useRef(new Animated.Value(1)).current;
  const settingsAnim = useRef(new Animated.Value(1)).current;
  const aboutAnim = useRef(new Animated.Value(1)).current;
  const jobsHistoryAnim = useRef(new Animated.Value(1)).current;

  // Función para abrir/cerrar el menú
  const toggleMenu = () => {
    if (isMenuOpen) {
      // Cerrar el menú deslizándolo fuera de la vista
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get("window").width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsMenuOpen(false));
    } else {
      // Abre el menú deslizándolo desde el lado izquierdo
      setIsMenuOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Función para cerrar el menú cuando se toca fuera de él
  const closeMenu = () => {
    if (isMenuOpen) {
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get("window").width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsMenuOpen(false));
    }
  };

  // Funciones para la animación de los textos
  const animateTextIn = (anim: Animated.Value | Animated.ValueXY) => {
    Animated.spring(anim, {
      toValue: 1.2, // Aumenta el tamaño del texto
      useNativeDriver: true,
    }).start();
  };

  const animateTextOut = (anim: Animated.Value | Animated.ValueXY) => {
    Animated.spring(anim, {
      toValue: 1, // Regresa al tamaño original
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="flex-1">
      <View className="top-[5rem] p-4 w-1 h-1">
        <Pressable onPress={toggleMenu}>
          <View className="group justify-center items-center p-2 bg-blue-500/70 w-[4rem] h-[4rem] rounded-[5rem] border border-blue-400">
            <Svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="size-10"
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </Svg>
          </View>
        </Pressable>
      </View>

      {isMenuOpen && (
        <Pressable
          onPress={closeMenu}
          className="absolute top-0 left-0 w-full h-full bg-black/10"
        />
      )}

      {isMenuOpen && (
        <Animated.View
          style={{
            transform: [{ translateX: slideAnim }],
          }}
          className="absolute top-0 left-0 justify-center items-start bg-gray-800 w-4/5 h-full p-4 z-10"
        >
          <View>
            <Image
              source={{
                uri: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726358400&semt=ais_hybrid",
              }}
              className="w-[100] h-[100] rounded-full top-[-2rem] right-[-7rem] border border-white"
            />
            <Text className="text-white font-bold top-[-1rem] right-[-5rem] text-xl">
              Nelson Betancourt
            </Text>
          </View>
          {/* Cada texto con animaciones de escala */}
          <Pressable
            onPressIn={() => animateTextIn(profileAnim)}
            onPressOut={() => animateTextOut(profileAnim)}
          >
            <Animated.View style={{ transform: [{ scale: profileAnim }] }}>
              <Text className="text-white text-5xl py-10">Profile</Text>
            </Animated.View>
          </Pressable>

          <Pressable
            onPressIn={() => animateTextIn(jobsHistoryAnim)}
            onPressOut={() => animateTextOut(jobsHistoryAnim)}
          >
            <Animated.View style={{ transform: [{ scale: jobsHistoryAnim }] }}>
              <Text className="text-white text-5xl py-10">Jobs History</Text>
            </Animated.View>
          </Pressable>

          <Pressable
            onPressIn={() => animateTextIn(walletAnim)}
            onPressOut={() => animateTextOut(walletAnim)}
          >
            <Animated.View style={{ transform: [{ scale: walletAnim }] }}>
              <Text className="text-white text-5xl py-10">Wallet</Text>
            </Animated.View>
          </Pressable>

          <Pressable
            onPressIn={() => animateTextIn(settingsAnim)}
            onPressOut={() => animateTextOut(settingsAnim)}
          >
            <Animated.View style={{ transform: [{ scale: settingsAnim }] }}>
              <Text className="text-white text-5xl py-10">Settings</Text>
            </Animated.View>
          </Pressable>

          <Pressable
            onPressIn={() => animateTextIn(aboutAnim)}
            onPressOut={() => animateTextOut(aboutAnim)}
          >
            <Animated.View style={{ transform: [{ scale: aboutAnim }] }}>
              <Text className="text-white text-5xl py-10">About</Text>
            </Animated.View>
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}
