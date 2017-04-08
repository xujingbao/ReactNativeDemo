/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    ListView,
    Image,
    TouchableHighlight,
} from 'react-native';
import {
    Button,
    Icon,
    Grid,
    Carousel,
} from 'antd-mobile'
import {StackNavigator, TabNavigator} from 'react-navigation';

//
class ChatPage extends Component {
    static navigationOptions = {
        title: ({state}) => `chat with ${state.params.name}`,
    };

    render() {
        return <View><Text>Chat Recent</Text></View>;
    }
}
//
class ChatRecentPage extends Component {
    //
    static navigationOptions = {
        title: '首页',
        tabBar: {
            label: '最近',
            icon: ({tintColor}) => (
                <Image source={require('./img/user.png')} style={[styles.icon, {tintColor: tintColor}]}/>
            ),
        },
        header: {visible: false},
    };
    state = {
        data: ['', '', ''],
        initialHeight: 200,
    };

    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'AiyWuByWklrrUDlFignR'],
            });
        }, 100);
    };

    render() {
        const data = Array.from(new Array(9)).map((_val, i) => ({
            icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
            text: `名字${i}`,
        }));
        const {navigate} = this.props.navigation;
        const hProp = this.state.initialHeight ? {height: this.state.initialHeight} : {};
        return (
            <View>
                <Carousel className="my-carousel" autoplay={false} infinite selectedIndex={1}>
                    {this.state.data.map(ii => (
                        <Image key={ii} source={{uri: `https://zos.alipayobjects.com/rmsportal/${ii}.png`}}
                               style={{width: 400, height: 200}}/>
                    ))}
                </Carousel>
                <Grid data={data} columnNum={3} isCarousel onClick={(_el, index) => alert(index)}/>
            </View>
        );
    }
}
//
class ChatAllPage extends Component {
    static navigationOptions = {
        title: 'All',
        tabBar: {
            label: '最近',
            icon: ({tintColor}) => (
                <Icon type="ellipsis" size="md"/>
            ),
        },
        header: {visible: true},
    };

    render() {
        const {navigate} = this.props.navigation;
        return <View style={styles.container}><Button type="ghost"
                                                      onClick={() => {
                                                          navigate('Chat', {name: "xujingbao"});
                                                          console.log("navigate to chat page")
                                                      }}>Chat</Button></View>;
    }
}
//
const HomeTabNavigator = TabNavigator({
    ChatRecent: {screen: ChatRecentPage},
    ChatAll: {screen: ChatAllPage},
}, {
    tabBarOptions: {
        activeTintColor: '#e91e63',
    },
});
//
const rndemo = StackNavigator({
    Home: {screen: HomeTabNavigator},
    Chat: {screen: ChatPage},
}, {headerMode: 'screen'}); /// <------ !!!!! 隐藏导航航
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyblue',
    },
    icon: {
        height: 26,
        width: 26,
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        flex: 3,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
//
AppRegistry.registerComponent('rndemo', () => rndemo);