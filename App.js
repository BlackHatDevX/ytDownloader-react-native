// start : importing stuff

import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Appearance,
  Dimensions,
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
import { MoonIcon, SunIcon } from "react-native-heroicons/outline";
// e : importing stuff

// s : dimensions
const { width, height } = Dimensions.get("window");
// e : dimensions

// s : main app
export default function App() {
  // s : states
  const [color, setColor] = useState(Appearance.getColorScheme());
  const [yturi, setUri] = useState("");
  const [ytVideoLink, setYtVideoLink] = useState("");
  const [ytAudioLink, setYtAudioLink] = useState("");
  // e :states

  // s : theme switching
  const changeMode = () => {
    if (color === "dark") {
      setColor("light");
      Appearance.setColorScheme("light");
    } else {
      setColor("dark");
      Appearance.setColorScheme("dark");
    }
  };
  // e : theme switching

  // s : process youtube link
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
  // e : process youtube link

  // s : return
  return (
    <View
      className={
        color == "light" ? " bg-white h-full w-full" : "bg-black h-full w-full"
      }
    >
      <SafeAreaView>
        <View className="w-full justify-between flex-row pt-2 pb-1 pl-3 ">
          {/* navigation bar  */}
          <Text
            className={
              color == "light"
                ? " text-black text-2xl font-bold"
                : " text-white text-2xl font-bold"
            }
          >
            {/* youtube logo  */}
            <Image
              className="h-10 w-10"
              source={require("./assets/Images/logo.png")}
            />
            <Text className="text-red-500"> {"  "}Y</Text>
            outube <Text className="text-red-500">D</Text>
            ownloader
          </Text>

          {/* dark mode switch */}
          <View className=" h-8 w-8 pt-4 mr-5">
            <TouchableOpacity onPress={changeMode}>
              {color == "light" ? (
                <MoonIcon size="23" strokeWidth={2} color="black" />
              ) : (
                <SunIcon size="23" strokeWidth={2} color="white" />
              )}
              {/* <Text className="text-white text-2xl text-center "></Text> */}
            </TouchableOpacity>
          </View>
        </View>

        <View className="pt-60">
          {/* link input box  */}
          <TextInput
            textAlignVertical="true"
            multiline
            className={
              color == "dark"
                ? "bg-gray-950 border-2 border-gray-200 text-white p-1 ml-auto mr-auto w-72 text-lg rounded-md"
                : "bg-white border-2 border-gray-900 text-black p-1 ml-auto mr-auto w-72 text-lg rounded-md"
            }
            placeholderTextColor="gray"
            placeholder="Enter your youtube video url here."
            onChangeText={setUri}
            value={yturi}
          />

          {/* generate url button  */}
          <TouchableOpacity
            className={
              color == "dark"
                ? "align-middle bg-white border-2 mt-10 rounded-xl w-48 pt-1 pb-1 mr-auto ml-auto"
                : "align-middle bg-black border-2 mt-10 rounded-xl w-48 pt-1 pb-1 mr-auto ml-auto"
            }
            onPress={downloadFromUrl}
          >
            <Text
              className={
                color == "dark"
                  ? "text-black text-center p- text-lg"
                  : "text-white text-center p- text-lg"
              }
            >
              Generate URL
            </Text>
          </TouchableOpacity>
          {/* generated url  */}

          {/* video button  */}
          <TouchableOpacity
            className="w-48 ml-auto mr-auto"
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
            <Text className="text-center bg-red-800 p-1 text-white text-xl mt-5 border-red-900 border-2 w-48 mr-auto ml-auto rounded-xl font-bold">
              Download Video
            </Text>
          </TouchableOpacity>

          {/* audio button  */}
          <TouchableOpacity
            className="w-48 ml-auto mr-auto"
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
            <Text className="text-center bg-red-800 p-1 text-white text-xl mt-5 border-red-900 border-2 w-48 mr-auto ml-auto rounded-xl font-bold">
              Download Audio
            </Text>
          </TouchableOpacity>
        </View>

        <StatusBar style={color == "light" ? "dark" : "light"} />
      </SafeAreaView>
      {/* github logo  */}
      <TouchableOpacity
        className="absolute "
        style={{ right: "5%", bottom: "5%" }}
        onPress={() => {
          Linking.openURL(
            "https://github.com/BlackHatDevX/ytDownloader-react-native"
          );
        }}
      >
        <Image
          className="w-20 h-20"
          style={
            color == "dark" ? { tintColor: "white" } : { tintColor: "black" }
          }
          source={require("./assets/Images/github.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
