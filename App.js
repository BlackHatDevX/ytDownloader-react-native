import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Image,
  Keyboard,
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
  const [ytVideoLink, setYtVideoLink] = useState("");
  const [ytAudioLink, setYtAudioLink] = useState("");
  const downloadFromUrl = async () => {
    Keyboard.dismiss();
    if (yturi == "") {
      Alert.alert("Error", "Link box seems is empty. Enter link to continue", [
        { text: "OK", onPress: () => "" },
      ]);
    } else {
      const youtubeURL = yturi;
      const basicInfo = await ytdl.getBasicInfo(youtubeURL);
      const title = basicInfo.player_response.videoDetails.title;
      const videoUrls = await ytdl(youtubeURL, { quality: "highestaudio" });
      const audioUrls = await ytdl(youtubeURL, {
        quality: "highestaudio",
        filter: "audioonly",
        format: "m4a",
      });
      const videoFinalUri = videoUrls[0].url;
      const audioFinalUri = audioUrls[0].url;

      Alert.alert(
        "Link Generated",
        "Link has been generated, tap download now to download video",
        [{ text: "OK", onPress: () => "" }]
      );
      setYtVideoLink(videoFinalUri + "&title=" + title);
      setYtAudioLink(audioFinalUri + "&title=" + title);
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
              if (ytVideoLink == "") {
                Alert.alert(
                  "Error",
                  "No link generated yet, please generate link first",
                  [{ text: "OK", onPress: () => "" }]
                );
              } else Linking.openURL(ytVideoLink);
            }}
          >
            <Text className="text-center pb-2 font-bold">Download Video</Text>
          </Text>
          <Text
            className="text-center bg-red-800 p-1 text-white text-xl mt-5 border-red-900 border-2 w-48 mr-auto ml-auto rounded-xl"
            onPress={() => {
              if (ytAudioLink == "") {
                Alert.alert(
                  "Error",
                  "No link generated yet, please generate link first",
                  [{ text: "OK", onPress: () => "" }]
                );
              } else Linking.openURL(ytAudioLink);
            }}
          >
            <Text className="text-center pb-2 font-bold">Download Audio</Text>
          </Text>
        </View>
        <StatusBar style="light" />
      </SafeAreaView>
    </View>
  );
}
