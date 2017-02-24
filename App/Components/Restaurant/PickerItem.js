import React, {
	Component,
} from 'react';
import {
  StyleSheet,
  Text,
  PickerIOS,
  Animated,
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
const PickerItemIOS = PickerIOS.Item;
const deviceHeight = Dimensions.get('window').height;
class PickerItem extends Component{
    constructor(props){
      super(props);
    }
    componentDidMount() {
        const test = deviceHeight - 600
       Animated.timing(this.props.offSet, {
          duration: 300,
          toValue: test
        }).start()
    }
    closeModal() {
       Animated.timing(this.props.offSet, {
          duration: 300,
          toValue: deviceHeight
       }).start(this.props.closeModal);
        this.props.update()
    }

    render() {
        var pickserList = Object.keys(this.props.pickserList).map((index,i) => {
            return(
                <PickerItemIOS
                  key={index}
                  value={index}
                  label= { this.props.pickserList[index][this.props.descriptionKey] }
                />
            )
        })
        return (
              <Modal
               animationType={'none'}
               transparent={true}
               visible={this.props.active}>
                    <TouchableWithoutFeedback onPress={this.closeModal.bind(this)}>
                      <View style={{flex:1}}>
                      </View>
                    </TouchableWithoutFeedback>
                  <View style={{position:'absolute',right:0,left:0,height:230,bottom:0,backgroundColor:'#ffffff'}}>
                      <View style={styles.closeButtonContainer}>
                          <TouchableOpacity onPress={ this.closeModal.bind(this) }
                                              activeOpacity={0.5}
                                              style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>完成</Text>
                          </TouchableOpacity>
                      </View>
                      <PickerIOS
                              selectedValue = { this.props.index }
                              onValueChange={(index) => this.props.changeSelected(index)}>
                               {pickserList}
                      </PickerIOS>
                    </View>
                </Modal>
        )
      }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  showtimeContainer: {
    borderColor:"#e2e2e4",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  showtime: {
   padding:20,
    textAlign: 'center'
  },
  button: {
    marginTop:25,
    marginBottom:25
  },
  closeButtonContainer: {
    height:40,
    borderColor:"#e2e2e4",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth:StyleSheet.hairlineWidth,
  },
  closeButton: {
    height:40,
    width:60,
    position:'absolute',
    right:0,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonText: {
   textAlign: 'center'
  },
  closeButtonText: {
   color: '#ff8b00',
   fontSize:18,
  },
});
module.exports = PickerItem;
