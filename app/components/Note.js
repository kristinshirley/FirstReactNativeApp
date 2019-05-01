import React from 'react';
import { StyleSheet, 
	Text, 
	View, 
	TextInput, 
	TouchableOpacity} from 'react-native';

export default class Note extends React.Component {
  render() {
    return (
      <View key={this.props.keyval} style={styles.note}>
        <Text style={styles.noteText}> {this.props.val.date} </Text>
        <Text style={styles.noteText}> {this.props.val.note} </Text>
        <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
          <Text style={styles.noteDeleteText}>D</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 20,
    borderLeftColor: 'red'
  },
  noteDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10
  },
  noteDeleteText:{
    color: 'white',
  }
  
});
