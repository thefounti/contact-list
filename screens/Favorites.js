import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";

import { fetchContacts } from "../utils/api";

import ContactThumbnail from "../components/ContactThumbnail";
import colors from "../utils/colors";
import { MaterialIcons } from '@expo/vector-icons';
import store from "../store";

const keyExtractor = ({ phone }) => phone;

export default Favorites = (props) => {
    const [state, setState] = useState({
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error,
        strError: store.getState().strError,
    })

    useEffect(() => {
        const { contacts } = state;
        const unsuscribe = store.onChange(() => {
            setState({
                contacts: store.getState().contacts,
                loading: store.getState().isFetchingContacts,
                error: store.getState().error,
                strError: store.getState().strError,
            })
        })
        if (contacts.length === 0){
            fetchContactsAsync();
        }
        return () => {
            unsuscribe();
        }
    }, [])

    const fetchContactsAsync = async () => {
        try {
            const contacts = await fetchContacts();

            store.setState({
                contacts,
                isFetchingContacts: false,
            })
        } catch (err) {
            store.setState({
                isFetchingContacts: false,
                error: true,
                strError: err.toString()
            })
        }
    }

    const renderFavoriteThumbnail = ({ item }) => {
        const { navigation: { navigate } } = props;
        const { avatar } = item;

        return (
            <ContactThumbnail
                avatar={avatar}
                onPress={() => navigate('Profile', { contact: item })}
            />
        )
    }

    const favorites = state.contacts.filter((contact) => contact.favorite)

    return (
        <View style={styles.container}>
            {state.loading && <ActivityIndicator size={"large"} />}
            {state.error && <Text>...Error {state.strError}</Text>}

            {!state.loading &&
                !state.error && (
                    <FlatList
                        data={favorites}
                        keyExtractor={keyExtractor}
                        numColumns={3}
                        contentContainerStyle={styles.list}
                        renderItem={renderFavoriteThumbnail}
                    />
                )}
        </View>
    )

}

Favorites.navigationOptions = ({ navigation: { navigate } }) => {
    return {
        title: 'Favorites',
        headerStyle: {
            backgroundColor: 'white',
        },
        headerLeft: (
            <MaterialIcons
                name="menu"
                size={24}
                style={{ color: colors.black, marginLeft: 10 }}
                onPress={() => navigate('DrawerToggle')}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
    list: {
        alignItems: "center",
    }
});