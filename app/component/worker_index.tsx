import React from "react";
import { View, Pressable, Text } from "react-native";

export default function Worker() {
  return (
    <View className="flex flex-wrap gap-2 justify-center items-center bg-gray-500 w-full h-full">
      {/* job widget */}
      {/* <Pressable
	className="bg-blue-500 w-[10rem] h-[10rem] rounded-md justify-center items-center shadow shadow-black-xl"
	  onPress={() => alert('job listing')}
	>
	<Text className="text-white font-bold">Jobs</Text>
	</Pressable> */}
      {/* bookings widget */}
      {/* <Pressable
	className="bg-blue-500 w-[10rem] h-[10rem] rounded-md justify-center items-center shadow shadow-black-xl"
	  onPress={() => alert('booking')}
	>
	<Text className="text-white font-bold">Booking</Text>
	</Pressable> */}
      {/* chat widget */}
      {/* <Pressable
	className="bg-blue-500 w-[10rem] h-[10rem] rounded-md justify-center items-center shadow shadow-black-xl"
	  onPress={() => alert('chat')}
	>
	<Text className="text-white font-bold">Chat</Text>
	</Pressable> */}
    </View>
  );
}
