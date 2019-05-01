import React from 'react';
import { StyleSheet, 
	Text, 
	View, 
  KeyboardAvoidingView,
	TextInput, 
	ScrollView,
	TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Note from './Note';

export default class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    }
  }

  addNote(){
    if(this.state.noteText){
      var d = new Date();
      this.state.noteArray.push({
        'date': d.getFullYear() +
        "/" + (d.getMonth() + 1) +
        "/" + d.getDate(),
        'note': this.state.noteText
      });
      this.setState({noteArray : this.state.noteArray})
      this.setState({noteText: ''})
    }
  }

  deleteNote(key){
    this.state.noteArray.splice(key, 1);
    this.setState({ noteArray: this.state.noteArray })
  }

  saveData(){
    let obj ={
      name: 'John Doe',
      email: 'tet@gmail.com',
      city: 'New York',
    }
    AsyncStorage.setItem('user', JSON.stringify(obj));
  }

  displayData = async () => {
    try{
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);

      alert(parsed.city);

    }
    catch(error){
      alert(error);
    }

  }

  render() {

    let notes = this.state.noteArray.map((val, key) => {
      return <Note key={key} keyval={key} val={val} deleteMethod={ () => this.deleteNote(key)} />
    })

    return (
      <View style={styles.container}>
      	<View style={styles.header}> 
      		<Text style={styles.headerText}>- NOTER -</Text>
      	</View>

      	<ScrollView style={styles.scrollContainer}>
          {notes}
      	</ScrollView>

      	<KeyboardAvoidingView style={styles.footer}>
      		<TextInput 
      			style={styles.textInput}
            onChangeText={(noteText) => this.setState({noteText})}
            value={this.state.noteText}
      			placeholder='>note'
      			placeholderTextColor='white'
      			underlineColorAndroid='transparent'>

      		</TextInput>
      	</KeyboardAvoidingView>

        <TouchableOpacity onPress={this.saveData} style={styles.saveButton}>
          <Text> Click me to save data </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.displayData} style={styles.displayButton}>
          <Text> Click me to display data</Text>
        </TouchableOpacity>

      	<TouchableOpacity onPress={ this.addNote.bind(this)} style={styles.addButton}>
      		<Text style={styles.addButtonText}>+</Text>

      	</TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  	flex: 1,
  },
  header: {
  	backgroundColor: 'red',
  	alignItems: 'center',
  	justifyContent: 'center',
  	borderBottomWidth: 10,
  	borderBottomColor: '#ddd',
  },
  headerText: {
  	color: 'white',
  	fontSize: 18,
  	padding: 26,
  },
  scrollContainer: {
  	flex: 1,
  	marginBottom: 100,
  },
  footer: {
  	position: 'absolute',
  	bottom: 0,
  	left: 0,
  	right: 0,
  	zIndex: 10,
  },
  textInput:{
  	alignSelf: 'stretch',
  	color: '#fff',
  	padding: 20,
  	backgroundColor:'#252525',
  	borderTopWidth: 2,
  	borderTopColor: '#ededed',
  },
  addButton:{
  	position: 'absolute',
  	zIndex: 11,
  	right: 20,
  	bottom: 90,
  	backgroundColor: 'red',
  	width: 90,
  	height: 90,
  	borderRadius: 50,
  	alignItems: 'center',
  	justifyContent: 'center',
  	elevation: 8,
  },
  saveButton:{
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 140,
    backgroundColor: 'yellow',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  displayButton:{
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 200,
    backgroundColor: 'green',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText:{
  	color:'#fff',
  	fontSize: 24,
  }
});
