import React, { Component } from 'react';
import { View, ToastAndroid,Text, TouchableOpacity, ScrollView,StyleSheet ,  FlatList,TouchableHighlight,StatusBar } from 'react-native';
import Datastore from 'react-native-local-mongodb';
db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
import Swipeout from 'react-native-swipeout';
import { AndroidBackHandler } from 'react-navigation-backhandler';

export default class BookmarksScreen extends Component {
  constructor(props) {
     super(props);
     this.state={
       data:[],
       loading:true
     }
   }

   componentDidMount() {
     db.find({}, (err, docs) =>{
       console.log(docs);
       this.state.data=docs;
       this.setState({loading:false});
     });
    }

    onBackButtonPressAndroid = () => {
       StatusBar.setBackgroundColor('#848484', true);
       return false;
     };

 deleteNote(data) {
    let {id,name}=data;
    console.log((data._id));
     db.remove({ _id: data._id}, (err, docs) =>{console.log(data._id);})
     db.find({}, (err, docs) =>{
       console.log(docs);
      this.setState({data:docs});
     });

 }

   render1() {


        if(this.state.loading)
        { console.log("HEYY"+JSON.stringify(this.state.data));
          return(
          <Text>HGeyey</Text>)
        }
        else{
           console.log("222"+JSON.stringify(this.state.data));
            return this.state.data.map((data) => {
              let swipeBtns = [{
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { this.deleteNote(data) }
              }
            ];
            return (
                 <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid} key={data._id}>
              <View  >
              <Swipeout right={swipeBtns}
                autoClose= {true}
                backgroundColor= 'transparent'>
                <TouchableHighlight onPress={()=>{console.log(data._id);this.props.navigation.navigate('SingleBookmark', {id: data._id})}}>
              <View style={{padding:10}}><Text  style={{ fontSize: 20,padding: 15,}}> {data.name}</Text></View>
              </TouchableHighlight>
            </Swipeout>
            </View>
            </AndroidBackHandler>
            )
          })

        }


   }
   render(){
      return(
        <ScrollView contentContainerStyle={{paddingVertical: 20}}>{this.render1()}</ScrollView>
      )
   }

}