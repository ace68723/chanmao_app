
import React,{ Component } from 'react';
import ReactNative from 'react-native';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import Button from './Button';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../fontConfig.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const {width,height} = Dimensions.get('window');

class DefaultTabBar extends Component {
  constructor(props) {
    super(props);
    this.renderTab   = this.renderTab.bind(this);
    this.state = {
      showTabBar:props.showTabBar,
      top:new Animated.Value(0),
    }
  }
  componentWillReceiveProps(props){

    if(props.tabBarPosition == 'bottom' && this.state.top._value != 0){
        this.state.top.setValue(0);
    }else if (props.tabBarPosition == 'overlayBottom' && this.state.top._value != height){
      this.state.top.setValue(height-50);
    }

    if(props.showTabBar != this.state.showTabBar){
      this.setState({
          showTabBar:props.showTabBar,
      })
      if(props.showTabBar){
        this._showTabBar()
      }else{
        this._hideTabBar()
      }
    }

  }
  _showTabBar(){
    Animated.timing(
      this.state.top,
      {toValue: height-50,
       duration: 200,
      }
    ).start();
  }
  _hideTabBar(){
    Animated.timing(
      this.state.top,
      {toValue: height,
       duration: 200,
      }
    ).start();
  }
  renderTabOption(name, page) {
  }

  renderTab(name, page, isTabActive, onPressHandler) {
        const activeTextColor = this.props.activeTextColor;
        const inactiveTextColor = this.props.inactiveTextColor;
        const textStyle = this.props.textStyle;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;

        const fontWeight = isTabActive ? 'bold' : 'normal';
        let iconName;
        switch (page) {
          case 0:
            iconName = 'cm-home_page';
            break;
          case 1:
            iconName = 'cm-my_order';
            break;
          case 2:
            iconName = 'cm-setting';
            break;
          default:

        }
        return (
          <Button
              style={{flex: 1, }}
              key={name}
              accessible={true}
              accessibilityLabel={name}
              accessibilityTraits='button'
              onPress={() => onPressHandler(page)}
            >
              <View style={[styles.tab, this.props.tabStyle, ]}>
                <Icon style={{top:5}} name={iconName} size={30} color={textColor} />
                <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
                  {name}
                </Text>
              </View>
          </Button>
        );
      }

  render() {
    // bdc8d9
    return (
      <Animated.View style={[styles.tabs, {backgroundColor: this.props.backgroundColor,
                                           top:this.state.top,
                                           borderTopColor:"#bdc8d9",
                                           borderTopWidth:StyleSheet.hairlineWidth,
                                           },
                                           this.props.style, ]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}

      </Animated.View>
    );
  }
}
DefaultTabBar.propTypes = {
  goToPage: React.PropTypes.func,
  activeTab: React.PropTypes.number,
  tabs: React.PropTypes.array,
  backgroundColor: React.PropTypes.string,
  activeTextColor: React.PropTypes.string,
  inactiveTextColor: React.PropTypes.string,
  textStyle: Text.propTypes.style,
  tabStyle: View.propTypes.style,
  renderTab: React.PropTypes.func,
  underlineStyle: View.propTypes.style,
};

DefaultTabBar.defaultProps = {
  activeTextColor: 'navy',
  inactiveTextColor: 'black',
  backgroundColor: null,
};

export default DefaultTabBar;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});
