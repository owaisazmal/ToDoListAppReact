import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const GoalItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
      <View
        style={{
          backgroundColor: props.color,  // Apply selected color to task background
          height: 50,
          padding: 10,
          margin: 5,
          justifyContent: 'center',
          borderRadius: 5,
        }}
      >
        <Text style={{ color: '#fff' }}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoalItem;
