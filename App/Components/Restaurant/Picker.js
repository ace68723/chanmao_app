import React, {
	Component,
} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  PickerIOS,
  Dimensions,
  TouchableHighlight,
  View
} from 'react-native';
// import PickerItem from './PickerItem';
import AddressCard from './AddressCard';
import RestaurantStore from '../../Stores/RestaurantStore';
const deviceHeight = Dimensions.get('window').height;


class picker extends Component {
    constructor(props){
        super(props)
        this.state = {
            index:0,
            modal: false,
            offSet: new Animated.Value(deviceHeight),
            dltypeList:[
              {dltype:0,
               description:'请先选择地址信息'
              }],
            selected:{},
        }
        this._update = this._update.bind(this);
        this._onChange = this._onChange.bind(this);
        this.changeSelected = this.changeSelected.bind(this)
    };

    componentDidMount(){
      RestaurantStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
      RestaurantStore.removeChangeListener(this._onChange);
    }
    _onChange(){
        if(this.props.descriptionKey == 'description'){
            const dltypeList = RestaurantStore.getCheckoutSate().dltypeList;
            if(dltypeList){
              this.setState({
                dltypeList:dltypeList,
                selected:dltypeList[this.state.index]
              });
            }
        }
    }
    changeSelected(index){
        this.setState({
            selected:this.props.pickserList[index],
            index: index
        })
        this._update()
    }
    _update(selected){
      this.props.update(this.state.selected)
    }
    _addressDescription(apartmentNumber,addressDescription){
      if(apartmentNumber){
        return(
            <Text  style={styles.text}numberOfLines={2}>{apartmentNumber} - {addressDescription}</Text>
        )
      }else{
          return(
            <Text  style={styles.text}numberOfLines={2}>{addressDescription}</Text>
          )
      }
    }
    _renderSelected(){
      if(this.props.descriptionKey == 'addr'){
        const nameKey = 'name';
        const telKey = 'tel';
        const apartKey = 'apt_no';
        if(this.state.selected && this.state.selected[this.props.descriptionKey]){
          return(
            <AddressCard addressDescription ={this.state.selected[this.props.descriptionKey]}
                         name={this.state.selected[nameKey]}
                         phoneNumber={this.state.selected[telKey]}
                         apartmentNumber={this.state.selected[apartKey]}/>
          )
        }else{

        }
      }else{
        return(
          <Text style={[styles.showtime,{color:'#ff8b00',padding:0,marginLeft:5,fontSize:15,}]}>
            {this.state.selected[this.props.descriptionKey]}
          </Text>
        )
      }
    }
    _pickerContainer(){
      if(this.props.descriptionKey === 'addr'){
        return(
          <TouchableHighlight underlayColor="transparent"
                              onPress={ () => this.setState({modal: true,selected:this.props.pickserList[this.state.index],}) }>
              <View style={[styles.pickerContainer,{ justifyContent:'center',}]}>
                  <Text style={[styles.pickerText,{color:'#ff8b00',}]}>
                    {this.props.title}
                  </Text>
                  {this._renderSelected()}
              </View>
          </TouchableHighlight>
        )
      }else{
        return(
          <TouchableHighlight underlayColor="transparent"
                              onPress={ () => this.setState({modal: true}) }>
              <View style={[styles.pickerContainer,{height:50,flexDirection: 'row',alignItems:'center'}]}>
                  <Image source={this.props.icon}
                         resizeMode={'contain'}
                         style={styles.icon}/>
                  <Text style={{color:'#808080',marginLeft:10}}>
                    {this.props.title}:
                  </Text>
                  {this._renderSelected()}
              </View>
          </TouchableHighlight>
        )
      }

    }
    render(){
        return(
            <View style={styles.container}>
                {this._pickerContainer()}
                <PickerItem closeModal={() => this.setState({ modal: false })}
                        active={this.state.modal}
                        offSet={this.state.offSet}
                        changeSelected={this.changeSelected}
                        selected = {this.state.selected}
                        index = {this.state.index}
                        pickserList = {this.props.pickserList}
                        style= {styles.picker}
                        update = {this._update}
                        descriptionKey = {this.props.descriptionKey}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
 container: {
     flex: 1,
   },
   pickerContainer: {
     flex:1,
     borderColor:"#e2e2e4",
     borderBottomWidth: StyleSheet.hairlineWidth,
     height:80,
    //  justifyContent:'center',
   },
   showtime: {
     padding:20,
     textAlign: 'center'
   },
   icon:{
     marginLeft:20,
     height:28,
     width:28,
   },
   closeButtonContainer: {
     flexDirection: 'row',
     justifyContent: 'flex-end',
     borderColor:"#e2e2e4",
     borderBottomWidth: StyleSheet.hairlineWidth,
     borderTopWidth:StyleSheet.hairlineWidth,
   },
   closeButton: {
     paddingRight:10,
     paddingTop:10,
     paddingBottom:10
   },
   pickerText: {
     textAlign: 'center',
     position:'absolute',
     color:'#808080',
     fontSize:15,
     left:0,
     right:0,
   },
   closeButtonText: {
     color: '#027afe'
   },
   picker:{
     marginBottom:100
   }

})


module.exports = picker
