import {default as React,Component} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default (props) =>{
  // <Image
  // style={ styles.gif }
  // source = { require('../../Image/chanmao_logo.gif') }
  // />
		return (
		   <Modal
				animationType={"none"}
				transparent={true}
				visible={props.active}>
				  <View style={styles.mainContainer}>
					  <View style={styles.gifBox}>

						  <Text >快到碗里来 </Text>
					  </View>
				  </View>
			  </Modal>
		)

}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor:  'rgba(0, 0, 0, 0.1)',
	},
	gifBox: {
		position: 'absolute',
		left: 150,
		top:  200,
		height: 100,
		width:100,
    borderRadius:10,
		flexDirection: 'column',
		justifyContent: 'center',
    alignItems:'center',
		backgroundColor: '#ffffff'
	  },
	gif: {
		  height: 70,
		  width:70,
	  },
})
