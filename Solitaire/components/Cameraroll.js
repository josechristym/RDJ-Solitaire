import React from 'react'
import { View, Image, TouchableOpacity, Text, FlatList, PermissionsAndroid, Platform, AsyncStorage } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import { POSITIONS } from '../assets/styles/styles'
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { BannerView } from 'react-native-fbads';
export default class CamerarRoll extends React.Component {

  static navigationOptions = { title: 'Welcome', header: null };

  constructor() {
    super()
    this.state = {
      isShown: false,
      arrImages: [require('../assets/images/green_felt.png'),
      require('../assets/images/green_felt1.jpg'),
      require('../assets/images/green_felt2.png')]
    }
  }

  async hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      this.cameraImages()
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    this.cameraImages()
    return status === 'granted';
  }

  componentDidMount() {
    // this.hasAndroidPermission()
  }

  cameraImages = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        console.log("r", r)
        let local = [require('../assets/images/green_felt.png'),
        require('../assets/images/green_felt1.jpg'),
        require('../assets/images/green_felt2.png')]
        this.setState({ arrImages: [...local, ...r.edges] });
      })
      .catch((err) => {
        //Error Loading Images
        console.log(err)
      });
  }

  onPressClose = () => {
    this.props.navigation.pop()
  }

  onPressImage = (data) => {
    AsyncStorage.setItem('board_bg',JSON.stringify(data.index))
    this.props.route.params.onbgSelected()
  }

  renderFlatList = (data) => {
   return (<TouchableOpacity onPress={()=>this.onPressImage(data)} style={{ height: 200, width: "33.33%", justifyContent: 'center', alignItems: 'center' }}>
      {/* {item.node !== undefined ? 
              (<Image source={{uri: item.node.image.uri}} resizeMode="cover" style={{ justifyContent: 'center', alignItems: 'center', height: "98%", width: "98%", borderColor: 'gray', borderWidth: 2 }} />)
              : */}
      <Image source={data.item} resizeMode="cover" style={{ justifyContent: 'center', alignItems: 'center', height: "98%", width: "98%", borderColor: 'gray', borderWidth: 2 }} />
    </TouchableOpacity>)
  }

  render() {
    return (
      <View style={POSITIONS.APP}>
        <Image source={require('../assets/images/green_felt2.png')} resizeMode="contain" style={{ position: 'absolute' }} />
        <View style={{ height: 50, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: "center", flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.onPressClose}><Icon name="chevron-back" size={25} color="#F9F3F1" style={{ marginLeft: 20, height: 30, width: 30 }} /></TouchableOpacity>
          <View style={{ alignItems: "center", flex: 1, justifyContent: "center", marginLeft: -30 }}>
            <Text style={{ backgroundColor: 'transparent', fontSize: 18, color: '#F9F3F1', textAlign: 'center', fontWeight: "bold", marginRight: 20, height: 30, lineHeight: 30 }}>
              Pick Background
            </Text>
          </View>
        </View>
        <FlatList
          data={this.state.arrImages}
          extraData={this.state}
          renderItem={this.renderFlatList}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
        <BannerView
          placementId="950980425405826_950981308739071"
          type="standard"
          onPress={() => console.log('click')}
          onLoad={() => console.log('loaded')}
          onError={err => { this.setState({ showFBAds: false }) }}
        />
      </View>
    )
  }
}
