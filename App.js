import React, { useState, useRef } from 'react';
import { StyleSheet, View, FlatList, Animated, TouchableOpacity, ImageBackground, Text } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddModal, setIsAddModal] = useState(false);

  const buttonScale = useRef(new Animated.Value(1)).current;

  const addGoalHandler = (goalTitle, goalColor) => {
    setCourseGoals(currentGoals => [
      ...currentGoals, 
      { id: Math.random().toString(), value: goalTitle, color: goalColor }  // Save the color with the task
    ]);
    setIsAddModal(false);
  };

  const deleteGoalHandler = goalId => {
    setCourseGoals(currentGoals => currentGoals.filter(goal => goal.id !== goalId));
  };

  const cancelGoalHandler = () => {
    setIsAddModal(false);
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/564x/27/b4/35/27b43590d9cb26442ef616bf94486101.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <GoalInput visible={isAddModal} onAddGoal={addGoalHandler} onCancel={cancelGoalHandler} />
        <View style={styles.goalsContainer}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={courseGoals}
            renderItem={itemData => (
              <GoalItem
                id={itemData.item.id}
                title={itemData.item.value}
                color={itemData.item.color}  // Pass the color to the GoalItem
                onDelete={deleteGoalHandler}
              />
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
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  goalsContainer: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#be123c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
