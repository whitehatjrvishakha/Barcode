import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Search extends React.Component{
  render(){
    return(
        <View style = {styles.container}>
            <Text >Search</Text>
        </View>
      
    )
  }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
})