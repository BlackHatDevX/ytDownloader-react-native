import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  Image,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ytdl from "react-native-ytdl";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [yturi, setUri] = useState("");
  const [ytLink, setYtLink] = useState("");
  const downloadFromUrl = async () => {
    if (yturi == "") {
      Alert.alert("Error", "Link box seems is empty. Enter link to continue", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      const youtubeURL = yturi;
      const urls = await ytdl(youtubeURL, { quality: "highest" });
      const finalUri = urls[0].url;

      Alert.alert(
        "Link Generated",
        "Link has been generated, tap download now to download video",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      setYtLink(finalUri);
    }
  };

  return (
    <View className=" bg-black h-full w-full">
      <SafeAreaView>
        <View className="w-full pt-2 pb-1 pl-3 ">
          <Text className=" text-white text-2xl font-bold">
            <Image
              className="h-10 w-10"
              source={require("./assets/Images/logo.png")}
            />
            <Text className="text-red-500"> {"  "}Y</Text>
            outube <Text className="text-red-500">D</Text>
            ownloader
          </Text>
        </View>
        <View className="pt-72">
          <TextInput
            textAlignVertical="true"
            multiline
            className=" bg-gray-950 border-2 border-gray-200 text-white p-1 ml-auto mr-auto w-72 text-lg rounded-md"
            placeholderTextColor="gray"
            placeholder="Enter your youtube video url here."
            onChangeText={setUri}
            value={yturi}
          />
          <TouchableOpacity
            className="align-middle bg-white border-2 mt-10 rounded-xl w-48 pt-1 pb-1 mr-auto ml-auto"
            onPress={downloadFromUrl}
          >
            <Text className="text-black text-center p- text-lg">
              Generate URL
            </Text>
          </TouchableOpacity>
          {/* generated url  */}
          <Text
            className="text-center bg-red-800 p-1 text-white text-xl mt-5 border-red-900 border-2 w-48 mr-auto ml-auto rounded-xl"
            onPress={() => {
              if (ytLink == "") {
                Alert.alert(
                  "Error",
                  "No link generated yet, please generate link first",
                  [{ text: "OK", onPress: () => console.log("no link") }]
                );
              } else Linking.openURL(ytLink);
            }}
          >
            <Text className="text-center pb-2 font-bold">Download Now</Text>
          </Text>
        </View>
        <StatusBar style="light" />
      </SafeAreaView>
    </View>
  );
}
