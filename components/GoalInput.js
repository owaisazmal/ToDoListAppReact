import React, { useState, useRef } from 'react';
import { View, TextInput, Modal, StyleSheet, TouchableOpacity, Animated, Text, ImageBackground } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // Picker for selecting color

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [selectedColor, setSelectedColor] = useState('#B0B0B0'); // Default color

  const borderColorAnim = useRef(new Animated.Value(0)).current;

  // Text input focus and blur handlers to animate the border color
  const handleFocus = () => {
    Animated.timing(borderColorAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(borderColorAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccc', '#3498db'], // Grey when not focused, Blue when focused
  });

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal, selectedColor); // Pass the selected color with the goal
    setEnteredGoal('');
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/564x/27/b4/35/27b43590d9cb26442ef616bf94486101.jpg' }} // Background image
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlayContainer}>
          <View style={styles.inputContainer}>
            <Animated.View style={[styles.inputWrapper, { borderColor }]}>
              <TextInput
                placeholder="Write Something"
                onChangeText={goalInputHandler}
                value={enteredGoal}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={styles.input}
              />
            </Animated.View>
          </View>

          {/* Color Picker */}
          <View style={styles.colorPickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedColor(value)}
              items={[
                { label: 'Red', value: '#f28b82' },
                { label: 'Green', value: '#ccff90' },
                { label: 'Blue', value: '#aecbfa' },
                { label: 'Yellow', value: '#fff475' },
                { label: 'Purple', value: '#d7aefb' }
              ]}
              placeholder={{ label: 'Select a color', value: null }}
            />
          </View>

          <View style={styles.buttonContainer}>
            {/* Cancel and Add Buttons */}
            <TouchableOpacity onPress={props.onCancel} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addGoalHandler} style={[styles.button, styles.addButton]}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center', // Ensures content is centered on the background
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Light transparent overlay
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    fontSize: 18,
    color: '#333',
    paddingHorizontal: 10,
    height: 50,
  },
  colorPickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  addButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoalInput;
