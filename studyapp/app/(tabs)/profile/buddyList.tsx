import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from "@/components/ui/button"
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar"
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { Input, InputField  } from "@/components/ui/input"
import { Textarea, TextareaInput } from "@/components/ui/textarea"

export default function BuddyList() {
    const navigation = useNavigation();

}
