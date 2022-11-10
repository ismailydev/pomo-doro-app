import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";

export default function App() {
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

    return (
        <LinearGradient
            colors={["#FFF7EC", "#F2DCBF"]}
            style={styles.container}
            className={`bg-[#F4981F]/10 flex-1 ${
                height > 700 ? "py-20" : "py-12"
            } items-center justify-between gap-y-8`}
        >
            <Text
                style={styles.red}
                className="text-5xl font-extrabold text-center"
            >
                POMO
            </Text>
            <View className="">
                <Text className="text-3xl text-center py-2">
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
                                <Text className="text-6xl text-white">
                                    {formatTime(remainingTime)}
                                </Text>
                            </View>
                        )}
                    </CountdownCircleTimer>
                </View>
                <View>
                    <View className="w-full flex-row justify-between">
                        <View className="justify-center w-20 h-20 bg-[#7E3C21] mx-auto rounded-full">
                            <Text
                                onPress={() => {
                                    setIsPlaying(false);
                                    console.log("break", duration);
                                    setDuration(5 * 60);
                                    setIsPlaying(true);
                                    setKey((prevKey) => prevKey + 1);
                                }}
                                className="text-white text-center"
                            >
                                Break
                            </Text>
                        </View>
                        <View className="justify-center w-20 h-20 bg-[#7E3C21] mx-auto rounded-full">
                            <Text
                                onPress={() => {
                                    setIsPlaying(false);
                                    console.log("focus", duration);
                                    setDuration(25 * 60);
                                    setIsPlaying(true);
                                    setKey((prevKey) => prevKey + 1);
                                }}
                                className="text-white text-center"
                            >
                                Focus
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="flex-row items-center gap-2">
                <View className="justify-center w-16 h-16 bg-[#7E3C21] mx-auto rounded-full">
                    <Text className="text-white text-center">
                        <FontAwesome5
                            onPress={() => {
                                setIsPlaying(false);
                                console.log(duration);
                                setDuration(duration);
                                setKey((prevKey) => prevKey + 1);
                            }}
                            name={"stop"}
                        />
                    </Text>
                </View>
                <View className="justify-center w-24 h-24 bg-[#7E3C21] mx-auto rounded-full">
                    <Text className="text-white text-center">
                        <FontAwesome5
                            onPress={() => setIsPlaying(true)}
                            name={"play"}
                        />
                    </Text>
                </View>
                <View className="justify-center w-16 h-16 bg-[#7E3C21] mx-auto rounded-full">
                    <Text className="text-white text-center">
                        <FontAwesome5
                            onPress={() => setIsPlaying(false)}
                            name={"pause"}
                        />
                    </Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({});
