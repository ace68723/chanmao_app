/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './Login/Login';
import Tabs from './Tabs/Tabs';
import Checkout from './Restaurant/Checkout';
import MenuSearch from './Restaurant/MenuSearch';
import AddressList from './Address/AddressList';
export default class Router extends Component {
  constructor(){
    super()
    this.state={
      isAuthed:false,
      showLogin:true,
    }
    this._goToHome = this._goToHome.bind(this);

  }
  _renderScene(route, navigator) {

      switch (route.id) {
          case 'Address':
            return <Address navigator={navigator}  />;
          break;
          case 'AddressList':
            return <AddressList navigator={navigator}  />;
          break;
          case 'Menu':
            route.restaurant.imgUrl = {uri:route.restaurant.mob_banner}
            return <Menu navigator={navigator}
                         restaurant={route.restaurant}
                         reorderItems={route.reorderItems}
                         message={route.message}/>;
          break;
          case 'RestaurantTab':
            return <RestaurantTab navigator={navigator}/>;
          break;
          case 'MenuSearch':
            return <MenuSearch navigator={navigator} restaurant={route.restaurant}/>;
          break;
          case 'Confirm':
            return <Confirm navigator={navigator} restaurant={route.restaurant}/>;
          break;
          case 'Checkout':
            return <Checkout navigator={navigator} restaurant={route.restaurant}/>;
          break;
          case 'AddInfo':
            return <AddInfo navigator={navigator} placeId={route.placeId}/>;
          break
          case 'ArticleHome':
            return <ArticleHome navigator={navigator} />;
          break
          case 'BroadcastHome':
            return <BroadcastHome navigator={navigator} />;
          break
          case 'ActivityHome':
            return <ActivityHome navigator={navigator} />;
          case 'AuthorArticle':
            return <AuthorArticle navigator={navigator}
                                  author={route.author}
                                  category={route.category}
                                  title={route.title}/>;
          break
          case 'JoinUs':
            return <JoinUs navigator={navigator} category={route.category} />;
          break
          case 'WebView':
            return <WebView navigator={navigator} article={route.article} />;
          break
          case 'CommentList':
            return <CommentList navigator={navigator} pid={route.pid}/>;
          break
          case 'AboutUs':
            return <AboutUs navigator={navigator}/>;
          break
          case 'AdView':
            return <AdView  navigator={navigator} url={route.url}/>;
          default:
            return (
              <Tabs
                message={route.message}
                navigator={navigator}
              />
            );

        }
      }

  _transition(route,routeStack){
    const NoBackSwipe ={
        ...Navigator.SceneConfigs.FloatFromBottom,
          gestures: {
            pop: {},
          },
      };
      if(route.id =='Confirm' ||
         route.id == 'RestaurantTab' ||
         route.id == 'Menu' ||
         route.id == 'Checkout'||
         route.id == 'MenuSearch' ||
         route.id == 'AddressList'
       ){
        return NoBackSwipe
      }else{
        return Navigator.SceneConfigs.PushFromRight
      }
    }
  _renderTabs(){
    return (
        <Navigator
           initialRoute={{name: 'Home', index: 0}}
           renderScene={this._renderScene}
           configureScene={this._transition}
         />
      );
  }
  _goToHome(){
    this.setState({
      isAuthed:true,
    })
    setTimeout(()=> {
      this.setState({
        showLogin:false,
      })
    }, 3500);
  }
  _renderLogin(){
    return(
      <Login goToHome = {this._goToHome}/>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.isAuthed? this._renderTabs():null}
        {this.state.showLogin? this._renderLogin():null}


      </View>
    );
  }
}
  // <AddressList />
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});