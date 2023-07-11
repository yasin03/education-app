import { Alert, LogBox, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { CardItem } from "./CardItem";
import {
  Box,
  Divider,
  FlatList,
  Icon,
  Input,
  Pressable,
  Stack,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { db, useTrainingsLister, trainingsRef } from "./config/firebase";
import { query, where, getDocs } from "firebase/firestore";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleSearch = async (text) => {
    setSearchText(text);

    const q = query(
      trainingsRef,
      where("name", "<=", searchText),
      where("name", ">=", searchText)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(" => ", doc.data());
    });
  };

  const trainings = useTrainingsLister();
  LogBox.ignoreLogs([
    "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
  ]);
  return (
    <SafeAreaView style={{ marginVertical: 20 }}>
      {/* <Stack space={4} w="100%" alignItems="center" marginBottom={6}>
        <Input
          placeholder="Eğitim Ara"
          width="80%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="14"
          onChangeText={(text) => handleSearch(text)}
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
        />
        {searchText.length > 2 && (
          <Box
            width="80%"
            bg="muted.100"
            p="4"
            mt={-4}
            shadow={2}
            _text={{
              fontSize: "md",
              fontWeight: "bold",
              color: "black",
            }}
          >
            <Pressable onPress={() => Alert.alert("press")}>
              <Text>This is a Box</Text>
              <Divider
                my="2"
                _light={{
                  bg: "muted.300",
                }}
                _dark={{
                  bg: "muted.50",
                }}
              />
            </Pressable>
            <Text>This is a Box</Text>
          </Box>
        )}
      </Stack> */}

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
