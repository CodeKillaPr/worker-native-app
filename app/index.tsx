import { Text, View } from "react-native";
import "../global.css";
import Worker from "./component/worker_index";
import Footer from "./component/menu_toggle";
// import Drawer from "./component/side_menu";

export default function Index() {
  return (
    <View className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Worker />
        <Footer />
      </View>
    </View>
  );
}
