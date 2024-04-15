import { Text ,View} from "react-native";
import BadgerCard from "./BadgerCard"
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { Button} from "react-native-paper";

function BadgerChatMessage(props) {

    const dt = new Date(props.created);
    const [username,setUsername]=useState();
    useEffect(()=>{
        SecureStore.getItemAsync("username").then(result=>{
            setUsername(result);
        })
    },[])

    const handleDelete=()=>{
        fetch(`https://cs571.org/api/s24/hw9/messages?id=${props.Id}`,{
            method:"Delete",
            headers:{
                "X-CS571-ID": 'bid_f797898160368bd8134003297afb0e1e9caa655bdd7e50fd71dda9b6872f0f4a',
                "Content-Type": "application/json",
                "Authorization": "Bearer "+props.token
            }
        }).then(response=>{
            if(response.ok){
                alert("Delete Successful");
                props.refresh();
            }else{
                response.json().then(data=>{
                    alert(data.msg);
                })
            }
        }).then

    }
    return <BadgerCard style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}>
        <Text style={{fontSize: 28, fontWeight: 600}}>{props.title}</Text>
        <Text style={{fontSize: 12}}>by {props.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
        <Text></Text>
        <Text>{props.content}</Text>
        <View>
            {
                (username===props.poster)&&(<Button onPress={handleDelete}>Delete Post</Button>)
            }
        </View>
    </BadgerCard>
}

export default BadgerChatMessage;