import { Linking, ScrollView, StyleSheet } from "react-native";
import React from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  Pressable,
  Button,
  Icon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { formatDate } from "./utils/formatDate";
import { LogBox } from "react-native";


const CardDetail = ({ route }) => {
  const { item } = route.params;

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  dialCall = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${process.env.PHONE_CALL}`;
    } else {
      phoneNumber = `telprompt:${process.env.PHONE_CALL}`;
    }
    Linking.openURL(phoneNumber);
  };

  sendWhatsApp = () => {
    let msg = `${item?.name} eğitiminiz hakkında bilgi almak istiyorum `;

    let mobile =
      Platform.OS == "ios"
        ? phoneWithCountryCode
        : "+" + process.env.PHONE_WHATSAPP;
    if (mobile) {
      if (msg) {
        let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
        Linking.openURL(url)
          .then((data) => {
            console.log("WhatsApp Opened");
          })
          .catch(() => {
            alert("Make sure WhatsApp installed on your device");
          });
      } else {
        alert("Please insert message to send");
      }
    } else {
      alert("Please insert mobile no");
    }
  };

  return (
    <ScrollView>
      <Box m={"6"}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: `${item.image}`,
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            {item?.type.toUpperCase()}
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="xl">{item?.name}</Heading>
            <Heading
              size="md"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {formatDate(item?.start_date) +
                " - " +
                formatDate(item?.end_date)}
            </Heading>
            <Text
              color="coolGray.600"
              fontSize={24}
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="400"
            >
              Eğitim Süresi : {item?.duration}
            </Text>
          </Stack>
          <Text fontWeight="400">{item.description}</Text>
        </Stack>
        <Stack
          direction={{
            base: "column",
            md: "row",
          }}
          space={4}
        >
          <Button
            variant="solid"
            colorScheme="blue"
            leftIcon={<Icon as={Ionicons} name="call" size="2xl" />}
            onPress={() => {
              dialCall();
            }}
          >
            <Text fontWeight="600" color="white" fontSize={24}>
              Kayıt Ol
            </Text>
          </Button>
          <Button
            variant="solid"
            colorScheme="emerald"
            leftIcon={<Icon as={Ionicons} name="logo-whatsapp" size="2xl" />}
            onPress={() => {
              sendWhatsApp();
            }}
          >
            <Text fontWeight="600" color="white" fontSize={24}>
              Whatsapp Bilgi Al
            </Text>
          </Button>
        </Stack>
      </Box>
    </ScrollView>
  );
};

export default CardDetail;

const styles = StyleSheet.create({});
