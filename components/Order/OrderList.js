import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import IonIcons from "react-native-vector-icons/Ionicons";
import { BoltSemiBoldText } from "../CustomText";
import OrderCard from "./OrderCard";
import { discounts, myOrders } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";

export default function OrderList() {
	var pending = 0, delivered = 0, cancelled = 0;
	

	myOrders.forEach(element => {
		if (element.status == "Pending") {
			pending++;
		}
		else if (element.status == "Delivered") {
			delivered++;
		}
		else {
			cancelled++;
		}
	});
	return (
		<>
		<View style={tw`w-full flex items-center px-5 mt-2`}>
			<BoltSemiBoldText>Stats: {pending} Pending, {delivered} Delivered, {cancelled} Cancelled </BoltSemiBoldText> 
		</View>
		
		<ScrollView style={tw`flex mt-4 pb-5`}>
				<FlatList
					style={tw`mx-5 pb-96`}
					data={myOrders}
					renderItem={({ item }) => <OrderCard data={item} />}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
				/>
		</ScrollView>
		</>
	);
}
