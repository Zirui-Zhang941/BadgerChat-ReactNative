import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList,Pressable,Modal,TextInput, Button } from "react-native";
import BadgerChatMessage from "../helper/BadgerChatMessage";
import { getItemAsync } from "expo-secure-store";
import * as SecureStore from 'expo-secure-store';

function BadgerChatroomScreen(props) {
    const [Allmessage,setAllMessage]=useState();
    const [isLoading, setIsLoading] = useState(false);
    const [ifModal,setIfModal]=useState(false);
    const [title,setTitle]=useState();
    const [Body,setBody]=useState();
    const [token,setToken]=useState();
    const [user,setUser]=useState();
    SecureStore.getItemAsync("username").then(result=>{
            setUser(result);
    })
    SecureStore.getItemAsync(user).then(result=>{
            setToken(result);
    })
    function refresh() {
        setIsLoading(true);
        fetch(`https://cs571.org/api/s24/hw9/messages?chatroom=${props.name}`,{
            method:"Get",
            headers:{
                "X-CS571-ID": 'bid_f797898160368bd8134003297afb0e1e9caa655bdd7e50fd71dda9b6872f0f4a'
            }
        }).then(response=>{
            if(response.ok){
                return response.json();
            }else{
                response.json().then(data => {
                  alert(data.msg);
              });
            }
        }).then(data=>{
            setAllMessage(data.messages);
            setIsLoading(false);
        })
    }
    useEffect(() => {
        refresh();
    }, [])
    //console.log(user);
    //console.log(token);
    const handleCreatePost=()=>{
        fetch(`https://cs571.org/api/s24/hw9/messages?chatroom=${props.name}`,{
            method:"Post",
            headers:{
                "X-CS571-ID": 'bid_f797898160368bd8134003297afb0e1e9caa655bdd7e50fd71dda9b6872f0f4a',
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
            },
            body:JSON.stringify({
                "title": title,
                "content": Body,
            })
        }).then(response => {
            if(response.ok){
                alert(`Successfully Posted!`);
                setIfModal(o=>!o);
                refresh();
            }else{
              response.json().then(data => {
                alert(data.msg);
            });
            }
        })
    }



    return <View style={{ flex: 1 }}>
        <FlatList
        data={Allmessage}
        onRefresh={refresh}
        refreshing={isLoading}
        keyExtractor={p => p.id}
        // Be warned! renderItem takes a callback function, where the parameter is
        // an object of `index` and the current `item`
        renderItem={renderObj => <BadgerChatMessage
            Id={renderObj.item.id}
            refresh={refresh}
            token={token}
            title={renderObj.item.title}
            poster={renderObj.item.poster}
            contect={renderObj.item.content}
            //chatroom={renderObj.item.chatroom}
            created={renderObj.item.created}
            />
        }
      >
      </FlatList>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ifModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIfModal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text>Title:</Text>
            <TextInput
            value={title}
            onChangeText={setTitle}
            autoCapitalize="none"
            style={styles.inputtitle}
            />
            <Text>Body:</Text>
            <TextInput
            value={Body}
            onChangeText={setBody}
            autoCapitalize="none"
            multiline
            numberOfLines={4}
            style={styles.inputbody}
            />
            <View>
                <Button color="crimson" title="CreatePost" onPress={handleCreatePost} disabled={!title||!Body}/>
                <Button color="gray" title="Cancel" onPress={()=>setIfModal(o=>!o)}/>
            </View>
          </View>
        </View>
      </Modal>
        {
            !props.isguest&&(<Pressable style={styles.button} onPress={()=>setIfModal(true)}>
            <Text style={styles.buttonText}>Add Post</Text>
            </Pressable>)
        }

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputtitle: {
        height: 30, 
        width:100,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
    },
    inputbody: {
        height: 50,
        width:100,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 75,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        backgroundColor: 'red',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
    }
});

export default BadgerChatroomScreen;