import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import ContactThumbnail from "../components/ContactThumbnail";

import colors from "../utils/colors";
import { fetchUserContact } from "../utils/api";

export default User = () => {

    const [state, setState] = useState({
        user: [],
        loading: true,
        error: false,
        strError: '',
    });

    useEffect(() => {
        fetchUserContactAsync();
    }, [])

    const fetchUserContactAsync = async () => {
        try {
            const user = await fetchUserContact();
            setState({
                ...state,
                loading: false,
                user
            })
        } catch (err) {
            setState({
                ...state,
                loading: false,
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

User.navigationOptions = {
    title: 'Me',
    headerTintColor: 'white',
}
