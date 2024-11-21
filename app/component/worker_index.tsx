import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location";
import Drawer from "./drawer";

export default function Worker() {
  const [region, setRegion] = useState<Region | undefined>(undefined);
  const mapRef = useRef<MapView>(null); // Referencia al MapView

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const initialRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(initialRegion);

      // Centrar el mapa inicialmente
      mapRef.current?.animateToRegion(initialRegion, 1000);
    })();
  }, []);

  // Función para centrar el mapa en la ubicación actual
  const findMe = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const newRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setRegion(newRegion);

    // Centrar el mapa en la nueva región
    mapRef.current?.animateToRegion(newRegion, 1000);
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {/* Mapa */}
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef} // Vincular la referencia del mapa
          style={{ width: "100%", height: "100%" }}
          showsUserLocation={true}
          followsUserLocation={false} // Lo desactivamos para controlar manualmente el centrado
          zoomEnabled={true}
          scrollEnabled={true}
          rotateEnabled={true}
          region={region}
        />
      </View>

      {/* Botón "Find Me" */}
      <View className="absolute bottom-[20rem] right-5">
        <TouchableOpacity
          onPress={findMe}
          className="bg-blue-500/80 border border-blue-400 p-3 rounded-full shadow-lg"
        >
          <Text className="text-white font-bold">Find Me</Text>
        </TouchableOpacity>
      </View>

      {/* Drawer (slide menu)*/}
      <View
        className="absolute top-0 left-0 right-0 bottom-0 z-10"
        pointerEvents="box-none"
      >
        <Drawer />
      </View>
    </View>
  );
}
