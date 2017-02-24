
'use strict';
import React, {
	Component,
} from 'react';
import {
  	Modal,
    StyleSheet,
    WebView,
    Text,
    View
} from 'react-native';

const HTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>

<body>
Content of the document......
</body>

</html>`;
class LoadingCanvas extends Component{
	render(){
		return (
		   <Modal
				animationType={false}
				transparent={true}
				visible={this.props.active}
				>
				  <View style={{

				  	      backgroundColor: 'rgba(0,0,0,0)',
				  	      height: 3000,
				  	      width:300,
				  	      marginTop:100,
				  	      marginLeft:50,
				  	    }}>
				  	 <WebView
				  	  	    style={styles.webView}
		                   source={require('./svg.html')}
		                   scalesPageToFit={false}
		                   scrollEnabled={false}
		                   backgroundColor={'rgba(206,82,111,0)'}
		                 />
				  	</View>
			  </Modal>
		)
	}
}


let styles = StyleSheet.create({
	webView:{
		backgroundColor: 'rgba(206,82,111,0)',
	}
})
module.exports = LoadingCanvas;
