import { StatusBar } from "expo-status-bar";
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Icon } from "react-native-elements";
import { useState } from "react";
import { useFonts } from "expo-font";
import Logo from "./assets/pomo_doro.svg";

export default function App() {
    const [loaded] = useFonts({
        "lora-bold": require("./assets/fonts/Lora-Bold.ttf"),
        poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    });

    const height = Dimensions.get("window").height;
    const [key, setKey] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(25 * 60);

    const formatTime = (secs) => {
        let secNum = parseInt(secs, 10);
        let minutes = Math.floor(secNum / 60)
            .toString()
            .padStart(2, "0");
        let seconds = (secNum - minutes * 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    if (!loaded) return null;

    return (
        <LinearGradient
            colors={["#FFF7EC", "#F2DCBF"]}
            style={styles.container}
            className={`bg-[#F4981F]/10 flex-1 ${
                height > 700 ? "py-20" : "py-12"
            } items-center justify-between gap-y-8`}
        >
            <View className="h-18 flex flex-row items-start justify-start">
                <Text className="text-5xl" style={{ fontFamily: "lora-bold" }}>
                    POMO-
                </Text>
                <View>
                    <Logo width={40} height={40} />
                </View>
            </View>
            <View>
                <Text
                    className="text-3xl text-center py-2"
                    style={{ fontFamily: "poppins" }}
                >
                    {duration === 25 * 60 ? "Focus" : "Break"}
                </Text>
                <View className="flex justify-center items-center">
                    <CountdownCircleTimer
                        key={key}
                        size={250}
                        isPlaying={isPlaying}
                        duration={duration}
                        colors="#F4981F"
                        trailColor="#FEDDB2"
                    >
                        {({ remainingTime }) => (
                            <View className="bg-[#7E3C21] w-[230px] h-[230px] rounded-full items-center justify-center">
                                <Text
                                    accessibilityRole="timer"
                                    accessibilityLiveRegion="assertive"
                                    importantForAccessibility="yes"
                                    className="text-6xl text-white"
                                >
                                    {formatTime(remainingTime)}
                                </Text>
                            </View>
                        )}
                    </CountdownCircleTimer>
                </View>
                <View>
                    <View className="w-full flex-row justify-between">
                        <TouchableOpacity
                            onPress={() => {
                                setIsPlaying(false);
                                setDuration(5 * 60);
                                setIsPlaying(true);
                                setKey((prevKey) => prevKey + 1);
                            }}
                            className="flex justify-center items-center w-20 h-20 bg-[#7E3C21] mx-auto rounded-full"
                        >
                            <Text className="text-white align-middle">
                                Break
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setIsPlaying(false);
                                setDuration(25 * 60);
                                setIsPlaying(true);
                                setKey((prevKey) => prevKey + 1);
                            }}
                            className="justify-center w-20 h-20 bg-[#7E3C21] mx-auto rounded-full"
                        >
                            <Text className="text-white text-center">
                                Focus
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className="flex-row items-center gap-2">
                <TouchableOpacity
                    onPress={() => {
                        setIsPlaying(false);
                        setDuration(duration);
                        setKey((prevKey) => prevKey + 1);
                    }}
                    className="justify-center w-16 h-16 bg-[#7E3C21] mx-auto rounded-full"
                >
                    <Text className="text-white text-center">
                        <Icon
                            name="stop"
                            type="material-community"
                            color="white"
                            size={30}
                        />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setIsPlaying(true)}
                    className="justify-center w-24 h-24 bg-[#7E3C21] mx-auto rounded-full"
                >
                    <Text className="text-white text-center">
                        <Icon
                            name="play"
                            type="material-community"
                            color="white"
                            size={50}
                        />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setIsPlaying(false)}
                    className="justify-center w-16 h-16 bg-[#7E3C21] mx-auto rounded-full"
                >
                    <Text className="text-white text-center">
                        <Icon
                            name="pause"
                            type="material-community"
                            color="white"
                            size={30}
                        />
                    </Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({});
