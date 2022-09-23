import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import ContactThumbnail from "../components/ContactThumbnail";

import colors from "../utils/colors";
import { fetchUserContact } from "../utils/api";
import { MaterialIcons } from '@expo/vector-icons';
import store from "../store";

export default User = () => {

    const [state, setState] = useState({
        user: store.getState().user,
        loading: store.getState().isFetchingUser,
        error: store.getState().error,
        strError: store.getState().strError,
    });

    useEffect(() => {
        const unsuscribe=store.onChange(() => {
            setState({
                user:store.getState().user,
                loading:store.getState().isFetchingUser,
                error:store.getState().error,
                strError:store.getState().error,
            })
        })
        fetchUserContactAsync();

        return () =>{
            unsuscribe();
        }
    }, [])

    const fetchUserContactAsync = async () => {
        try {
            const user = await fetchUserContact();
            store.setState({
                isFetchingUser: false,
                user,
                error:false,
                strError:''
            })
        } catch (err) {
            store.setState({
                isFetchingUser: false,
                error: true,
                strError: err.toString(),
            })
        }
    }

    const { loading, user, error, strError } = state;
    const { avatar, name, phone } = user;

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size={"large"} />}
            {error && <Text>Error: {strError}</Text>}
            {!loading &&
                !error && (
                    <ContactThumbnail avatar={avatar} name={name} phone={phone} />
                )}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: colors.blue,
    }
})

User.navigationOptions = ({ navigation: { navigate } }) => {
    return {
        title: 'Me',
        headerTintColor: 'white',
        headerLeft: (
            <MaterialIcons
                name="menu"
                size={24}
                style={{ color: colors.black, marginLeft: 10 }}
                onPress={() => navigate('DrawerToggle')}
            />
        ),
        headerRight: (
            <MaterialIcons
                name="settings"
                size={24}
                style={{ color: 'white', marginRight: 10 }}
                onPress={() => navigate('Options')}
            />
        ),
    }
}
