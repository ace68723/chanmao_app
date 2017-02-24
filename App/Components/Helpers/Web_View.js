import React, {
	Component,
} from 'react';
import {
  View,
  WebView,
  StyleSheet
} from 'react-native';

class Web_View extends Component{
    render(){
        return(
            <View style= {styles.container}>
                <WebView source= {{uri: this.props.url}} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
  },
});

Web_View.propTypes = {
    url: React.PropTypes.string.isRequired
}

module.exports = Web_View;
