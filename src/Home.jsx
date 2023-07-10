import { LogBox, SafeAreaView,  StyleSheet, View } from "react-native";
import React from "react";
import { CardItem } from "./CardItem";
import { FlatList } from "native-base";
import { useTrainingsLister } from "./config/firebase";

const Home = () => {
  
  const trainings = useTrainingsLister();
  LogBox.ignoreLogs([
    "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
  ]);
  return (
    <SafeAreaView style={{ marginVertical: 20 }}>
      <FlatList
        data={trainings}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => <CardItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
