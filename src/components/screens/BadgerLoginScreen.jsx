import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View,TextInput } from "react-native";

function BadgerLoginScreen(props) {
    const [username,setUsername]=useState();
    const [Password,setPassword]=useState();

    const handleGuest=()=>{
        props.setIsLoggedIn(true);
        props.setIsGuest(true);
    }

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <Text>Username:</Text>
        <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
        />
        <Text>Password:</Text>
        <TextInput
            placeholder="Password"
            value={Password}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry
        />
        
        <Button color="crimson" title="Login" onPress={() => {
            props.handleLogin(username, Password)
        }} disabled={!username||!Password}/>
        <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />

        <Button color="grey" title="Continue As Guest" onPress={handleGuest}  />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerLoginScreen;