import React,{ Component } from 'react';
import ReactNative from 'react-native';
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Animated,
} from 'react-native';
import Button from './Button';

const deviceWidth = Dimensions.get('window').width;

class DefaultTabBar extends Component {


  constructor(props) {
    super(props);
    this.renderTab = this.renderTab.bind(this);

  }
  componentWillReceiveProps(props){
    const page = props.activeTab
    if( this.refs['tabBtn'+page]){
      this.refs['tabBtn'+page].measure((ox, oy, width, height, px, py) => {
          if(ox>deviceWidth/2){
            this.tabScrollView.scrollTo({x: ox - deviceWidth/2+width/2 ,animated:true});
          }else{
            this.tabScrollView.scrollTo({x: 0 ,animated:true});
          }
      });
    }
  }
  renderTabOption(name, page) {
  }
  handleTabPress(page){
    this.props.goToPage(page)
  }
  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';



    // this.scrollViewRefs[ref.index].scrollView.scrollTo({y: 200,animated:false});
    return (
        <View key={name} ref={"tabBtn"+page}>

          <Button
              style={{flex: 1, marginLeft:25 }}
              accessible={true}
              accessibilityLabel={name}
              accessibilityTraits='button'
              onPress={() => onPressHandler(page)}>
            <View style={[styles.tab, this.props.tabStyle, ]}>
              <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
                {name}
              </Text>
            </View>
          </Button>
          </View>
        )
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      // marginLeft:containerWidth / numberOfTabs/10,
      height: 4,
      backgroundColor: '#ff8b00',
      bottom: 0,
    };

    // const left = this.props.scrollValue.interpolate({
    //   inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    // });
    const left = this.props.scrollValue.interpolate({
      // inputRange: [0, 1, ], outputRange: [0,  containerWidth / 5, ],
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });
    const tabTop = this.props.scrollY.interpolate({
      inputRange: [0, this.props.HEADER_SCROLL_DISTANCE+50],
      outputRange: [this.props.HEADER_SCROLL_DISTANCE+60, 10 ],
      extrapolate: 'clamp',
    });
    // ========Tab bar under line============
    //   <Animated.View style={[tabUnderlineStyle, { left, }, this.props.underlineStyle, ]} />
    // ======================================



      // <View style={{width:deviceWidth,}}>
      // </View>


    return (
        <Animated.View style={{height:40,width:deviceWidth,position:"absolute",top: tabTop,}}>

        <ScrollView style={[styles.tabs,
                                    {backgroundColor: this.props.backgroundColor,
                                      width:deviceWidth,
                                    },
                                    this.props.style, ]}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    removeClippedSubviews={false}
                    ref={(tabScrollView) => { this.tabScrollView = tabScrollView; }}>
          {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            const renderTab = this.props.renderTab || this.renderTab;
            return renderTab(name, page, isTabActive, this.props.goToPage);
          })}
        </ScrollView>
        <Image  source={require('./Images/feather_cover.png')}
                style={{ position:"absolute",height:40,width:50,top:0,right:-30,}}/>
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
    justifyContent: 'center',
  },
  tabs: {
    height: 40,
    flexDirection: 'row',
  },
});
