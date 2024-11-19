import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@Requests";

const initBuddies = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEY);
    if (jsonValue == null) {
      // Initialise data
      const jsonlist = JSON.stringify([]);
      await AsyncStorage.setItem(KEY, jsonlist);
    }
  } catch (e) {
    console.error(e);
  }
};

export const addBuddy = async (name: string) => {
  try {
    initBuddies();
    const jsonValue = await AsyncStorage.getItem(KEY);
    if (jsonValue != null) {
      const data: string[] = JSON.parse(jsonValue);
      data.push(name);
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(KEY, jsonData);
    }
  } catch (e) {
    console.error(e);
  }
};

export const isBuddy = async (name: string) => {
  try {
    initBuddies();
    const jsonValue = await AsyncStorage.getItem(KEY);
    if (jsonValue != null) {
      const data: string[] = JSON.parse(jsonValue);
      return data.includes(name);
    }
  } catch (e) {
    console.error(e);
  }
  return false;
};

export const areNotBuddies = async (names: string[]) => {
  try {
    initBuddies();
    const jsonValue = await AsyncStorage.getItem(KEY);
    if (jsonValue != null) {
      const data: string[] = JSON.parse(jsonValue);
      const filteredArray = names.filter((name) => !data.includes(name));
      return filteredArray
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}