import {default as React,Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';


export default (props) => {
    return(
        <TouchableHighlight style={ styles.button }
                            onPress= { props.handler } >
            <Text style={ styles.buttonText }>{ props.txt } </Text>
        </TouchableHighlight>
    )
}



const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'red',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});
