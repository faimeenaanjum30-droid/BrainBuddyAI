import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./HomeScreen";
import ChatScreenV2 from "./ChatScreenV2";
import QuizScreen from "./QuizScreen";
import NotesScreen from "./NotesScreen";
import StudyPlannerScreen from "./StudyPlannerScreen";
import SmartDocumentAnalyzer from "./SmartDocumentAnalyzer";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "BrainBuddyAI" }}
        />

        <Stack.Screen
          name="Chat"
          component={ChatScreenV2}
          options={{ title: "AI Chat" }}
        />

        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: "Quiz Generator" }}
        />

        <Stack.Screen
          name="Notes"
          component={NotesScreen}
          options={{ title: "Notes Summary" }}
        />

        <Stack.Screen
          name="Planner"
          component={StudyPlannerScreen}
          options={{ title: "Study Planner" }}
        />

        <Stack.Screen
          name="Document Analyzer"
          component={SmartDocumentAnalyzer}
          options={{ title: "Document Analyzer" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}