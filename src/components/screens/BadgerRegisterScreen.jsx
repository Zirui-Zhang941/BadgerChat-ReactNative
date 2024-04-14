import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";

function BadgerRegisterScreen(props) {
    const [username,setUsername]=useState();
    const [Password,setPassword]=useState();
    const [Repassword,setRepassword]=useState();

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
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
        <Text>Confirm Password:</Text>
        <TextInput
            placeholder="Confirm Password"
            value={Repassword}
            onChangeText={setRepassword}
            autoCapitalize="none"
            secureTextEntry
        />
        {
            (!Password)&&(<Text style={{ color: 'red' }}>Please enter a password!</Text>)
        }
        {
            Password !== Repassword && <Text style={{ color: 'red' }}>Passwords do not match!</Text>
        }
        <Button color="crimson" title="Signup" onPress={() => props.handleSignup(username, Password)} disabled={!username||!Password || !Repassword || Password !== Repassword}/>
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
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

export default BadgerRegisterScreen;