import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Modal, TouchableOpacity, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
   
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddModal, setIsAddModal] = useState(false);
  
  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [
      ...courseGoals, 
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

  return (
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
        <Button title="Add New Goal" onPress={() => setIsAddModal(true)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 50,
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
});
