import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Animated, ImageBackground } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddModal, setIsAddModal] = useState(false);

  // Create an animated value for the button scale
  const buttonScale = useRef(new Animated.Value(1)).current;

  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [
      ...currentGoals, 
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddModal(false);    
  } 

  const deleteGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  }

  const cancelGoalHandler = () => {
    setIsAddModal(false);
  }

  // Animation when button is pressed
  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.8, // Scale down
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1, // Scale back to original size
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/564x/27/b4/35/27b43590d9cb26442ef616bf94486101.jpg' }} // Replace with your own image URL or local image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <GoalInput visible={isAddModal} onAddGoal={addGoalHandler} onCancel={cancelGoalHandler} /> 
        <View style={styles.goalsContainer}>
          <FlatList 
            keyExtractor={(item, index) => item.id}
            data={courseGoals}
            renderItem={itemData => (
              <GoalItem id={itemData.item.id} onDelete={deleteGoalHandler} title={itemData.item.value} />
            )}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => setIsAddModal(true)}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Add New Goal</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire background
    justifyContent: 'center', // Ensures content is centered
  },
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Adds a white overlay with transparency
  },
  goalsContainer: {
    flex: 1, // Take up all available space for goals
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30, // Distance from the bottom of the screen
    left: 0,
    right: 0,
    alignItems: 'center', // Center the button horizontally
  },
  button: {
    backgroundColor: '#be123c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5, // Rectangular corners
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
