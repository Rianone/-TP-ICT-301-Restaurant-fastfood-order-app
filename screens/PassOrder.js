import React, { useState, useRef, useEffect } from "react";
import {
    Button,
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Animated,
    Platform,
    Dimensions,
    SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tw from "tailwind-react-native-classnames";
import { BoltLightText, BoltSemiBoldText } from "../components/CustomText";
import { useValue } from "react-native-reanimated";
// import { interpolate, Extrapolate } from "react-native-reanimated";
// import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Picker } from "react-native-web";

function PassOrder({ navigation, route }) {
    const { banner, itemName, rating, price, menu } = route.params;
    const scrollY = useRef(new Animated.Value(0.01)).current;
    const [toggleBar, setToggleBar] = useState(false);
    const searchBarAnim = useRef(
        new Animated.Value(
            Platform.OS === "android"
                ? 0 - Constants.statusBarHeight * 6
                : 0 - Constants.statusBarHeight * 3
        )
    ).current;

    useEffect(() => {
        if (toggleBar) {
            Animated.timing(searchBarAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(searchBarAnim, {
                toValue:
                    Platform.OS === "android"
                        ? 0 - Constants.statusBarHeight * 6
                        : 0 - Constants.statusBarHeight * 3,
                duration: 150,
                useNativeDriver: true,
            }).start();
        }
    }, [toggleBar]);

    return ( 
        <View style={tw`flex relative bg-white`}>
            <View
                style={tw.style(
                    "bg-white w-full absolute flex items-center px-5 shadow-lg",
                    {
                        transform: [{ translateY: searchBarAnim }],
                        zIndex: 100,
                        elevation: 10000,
                        paddingTop: Constants.statusBarHeight,
                    }
                )}
            >
                <View
                    style={tw.style(
                        "flex flex-col w-full justify-between h-full pt-5",
                        {
                            zIndex: 100,
                            elevation: 100,
                        }
                    )}
                >
                    <View
                        style={tw.style(
                            "w-full flex pt-1 flex-row justify-between pb-2.5",
                            {
                                // "items-center": Platform.OS === "android",
                                // "justify-between flex-row": Platform.OS === "ios",
                            }
                        )}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                                name="ios-arrow-back-outline"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>

                        <BoltSemiBoldText
                            style={tw.style(
                                "my-auto text-black my-auto mx-auto",
                                {
                                    fontSize:
                                        Platform.OS === "ios"
                                            ? 20
                                            : Dimensions.get("window").width /
                                            25,
                                }
                            )}
                        >
                            {itemName}
                        </BoltSemiBoldText>
                    </View>

                </View>

                <BoltSemiBoldText style={tw`text-2xl`}>
                        Current Balance
                </BoltSemiBoldText>
                
                <BoltSemiBoldText style={{color:"red",fontSize:"1.2rem"}}>
                    2500 FCFA
                </BoltSemiBoldText>
                
                {/* <Picker
                    selectedValue={"java"}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ language: itemValue })
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker> */}
                
            </View>
            
            <View>
                <Text>Hello there</Text>
            </View>
        </View>
     );
}

export default PassOrder;