import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	FlatList,
	TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import IonIcons from "react-native-vector-icons/Ionicons";
import { BoltLightText, BoltSemiBoldText } from "../components/CustomText";
import DiscountList from "../components/Discount/DiscountList";
import RestaurantList from "../components/Restaurant/RestaurantList";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { popularFoods } from "../constants";

export default function Search({ navigation, route }) {
	const [search, setSearch] = useState("");
	const [filteredList, setFilteredList] = useState(popularFoods)
	var itemName;

	return (
		<View
			style={{
				...tw`flex pt-2 h-full`,
				marginTop: Constants.statusBarHeight,
			}}
		>
			<StatusBar style="auto" />
			<View style={tw`flex flex-col mx-5 mt-5`}>
				<BoltSemiBoldText style={tw`text-2xl`}>Search</BoltSemiBoldText>

				<View style={tw`bg-gray-200 p-4 rounded-md flex flex-row mt-3`}>
					<Ionicons
						name="ios-search"
						size={18}
						color="black"
						style={tw`my-auto`}
					/>
					<TextInput
						style={tw`ml-3`}
						placeholder="Research for menu item"
						value = {search}
						onChange={(e) => {
							var filter = popularFoods.filter((item) => {
							   return item.name.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())
							})
							setFilteredList(filter)
							setSearch(e.target.value)
						}}
					/>
				</View>
			</View>

			<View style={tw`mx-5 mt-8 pb-3`}>
				<BoltSemiBoldText style={tw`text-sm`}>
					All Menus
				</BoltSemiBoldText>
			</View>

			<ScrollView style={tw`pb-5`}>
				<FlatList
					style={tw`mx-5`}
					data={filteredList}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							style={tw.style(
								"flex flex-row justify-between items-center w-full border-b border-gray-200",
								{
									"py-4": !!item.image,
									"opacity-50":
										!!item.isUnavailable,
								}
							)}
							key={index}
							disabled={item.isUnavailable}
							onPress={() => {
								itemName = item.name
								navigation.navigate("Restaurant", {
									screen: "PassOrder",
									params: {
										itemName,
									},
								})
							
							}}
						>
							<View style={tw`w-3/5 pr-5`}>
								<View
									key={item.id}
									style={tw`w-full py-5 flex flex-col items-start`}
								>
									<BoltSemiBoldText
										style={tw`text-lg`}
									>
										{item.name}
									</BoltSemiBoldText>

									{item.description && (
										<BoltLightText
											style={tw`my-2`}
										>
											{item.description}
										</BoltLightText>
									)}

									<View
										style={tw`flex flex-row items-center`}
									>
										<BoltLightText
											style={tw.style(
												item.discount && {
													textDecorationLine:
														"line-through",
													textDecorationStyle:
														"solid",
												}
											)}
										>
											{item.price + " "}FCFA
										</BoltLightText>
										{item.discount && (
											<View
												style={tw`ml-2 bg-red-500 px-2 rounded-full py-0.5`}
											>
												<BoltSemiBoldText
													style={tw`text-white`}
												>
													FCFA
													{item.discount}
												</BoltSemiBoldText>
											</View>
										)}
									</View>
								</View>
							</View>
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
				/>
			</ScrollView>
		</View>
	);
}
