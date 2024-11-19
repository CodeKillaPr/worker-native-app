import React from "react";
import { View, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

const Footer = () => {
  return (
    <View className="absolute bottom-10 w-[25rem] h-[5rem] rounded-[5rem] border-[0.2rem] border-blue-500/80 bg-blue-500/20 p-4 items-center">
      <Pressable className="hover:scale-110 duration-500 justify-center items-center">
        <View className="w-10">
          <Svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            />
          </Svg>
        </View>
      </Pressable>
    </View>
  );
};

export default Footer;
