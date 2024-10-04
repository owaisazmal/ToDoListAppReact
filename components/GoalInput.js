import React, { useState, useRef } from 'react';
import { View, TextInput, Modal, StyleSheet, TouchableOpacity, Animated, Text } from 'react-native';

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState('');

  // Create animated values for both buttons
  const addButtonScale = useRef(new Animated.Value(1)).current;
  const cancelButtonScale = useRef(new Animated.Value(1)).current;

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  // Animation handlers for "Add" button
  const handleAddPressIn = () => {
    Animated.spring(addButtonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handleAddPressOut = () => {
    Animated.spring(addButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Animation handlers for "Cancel" button
  const handleCancelPressIn = () => {
    Animated.spring(cancelButtonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handleCancelPressOut = () => {
    Animated.spring(cancelButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Write Something"
            onChangeText={goalInputHandler}
            value={enteredGoal}
            style={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          {/* Cancel Button (Red) */}
          <Animated.View style={{ transform: [{ scale: cancelButtonScale }] }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPressIn={handleCancelPressIn}
              onPressOut={handleCancelPressOut}
              onPress={props.onCancel}
            >
              <View style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Add Button (Blue) */}
          <Animated.View style={{ transform: [{ scale: addButtonScale }] }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPressIn={handleAddPressIn}
              onPressOut={handleAddPressOut}
              onPress={() => {
                if (!enteredGoal.trim()) {
                  alert("Please enter a valid goal");
                  return;
                }
                props.onAddGoal(enteredGoal);
              }}
            >
              <View style={[styles.button, styles.addButton]}>
                <Text style={styles.buttonText}>Add</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 120,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'blue', // Add button in blue
  },
  cancelButton: {
    backgroundColor: 'red', // Cancel button in red
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoalInput;
