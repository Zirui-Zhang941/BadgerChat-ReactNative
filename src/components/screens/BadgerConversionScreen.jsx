import { Alert, Button, StyleSheet, Text, View } from "react-native";

function BadgerConversionScreen(props) {
    const handleConvert=()=>{
        props.setIsLoggedIn(false);
        props.setIsRegistering(true);
        props.setIsGuest(false);
    }
    return <View style={styles.container}>
        <Text style={{fontSize: 24, marginTop: -100}}>Ready to signup?</Text>
        <Text>Join BadgerChat to be able to make posts!</Text>
        <Text/>
        <Button title="Signup!" color="darkred" onPress={handleConvert}/>

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerConversionScreen;