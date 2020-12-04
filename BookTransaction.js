import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class BookTransaction extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedStudentId: '',
            scannedBookId: '',
            buttonState: 'normal'
        }
    }

    getCameraPermissions = async (id) => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status === 'granted',
            buttonState: id,
            scanned: false
        })
        console.log(this.state.hasCameraPermissions);
    }

    handleBarcodeScanned = async ({type, data}) => {
        const buttonState = this.state.buttonState;
        console.log(buttonState)

        if(buttonState == 'studentId'){
            this.setState({
                scanned: true,
                scannedStudentId: data,
                buttonState: 'normal'
            })
        }

        else if(buttonState == 'bookId'){
            this.setState({
                scanned: true,
                scannedBookId: data,
                buttonState: 'normal'
            })
        }
        
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const buttonState = this.state.buttonState;
        const scanned = this.state.scanned;

        if(buttonState !== 'normal' && hasCameraPermissions){
            return(
                <BarCodeScanner 
                    onBarCodeScanned = {scanned ? undefined : this.handleBarcodeScanned}
                    style = {StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState == 'normal'){
            return(
                <View style = {styles.container} >
                    
                    <View style = {styles.inputView} >
                        <TextInput 
                            placeholder = 'Student ID' 
                            style = {styles.inputBox}
                            value = {this.state.scannedStudentId}
                        />
                        <TouchableOpacity 
                            onPress = {()=>{this.getCameraPermissions('studentId')}} 
                            style = {styles.scanButton}
                        >
                            <Text>Scan Student Id</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {styles.inputView} >
                        <TextInput 
                            placeholder = 'Book ID' 
                            style = {styles.inputBox}
                            value = {this.state.scannedBookId}
                        />
                        <TouchableOpacity 
                            onPress = {()=>{this.getCameraPermissions('bookId')}} 
                            style = {styles.scanButton}
                        >
                            <Text>Scan Book Id</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    scanButton:{
        backgroundColor: 'pink',
        height: 30,
        borderRadius: 30,
        justifyContent: 'center'
    },
    inputView:{
        flexDirection: 'row'
    },
    inputBox:{
        borderWidth: 2
    }
})