import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

import ContactListItem from '../components/ContactListItem';

import { fetchContacts } from '../utils/api';

import { MaterialIcons } from '@expo/vector-icons';
import colors from "../utils/colors";

const keyExtractor = ({ phone }) => phone;



export default Contacts = (props) => {
    const { navigation: { navigate } } = props;

    const [state, setState] = useState({
        contacts: [],
        loading: false,
        error: false,
        strError: ""
    });

    useEffect(() => {
        ObtenerContactosAsync();
    }, [])

    const ObtenerContactosAsync = async () => {
        try {
            const contacts = await fetchContacts();
            setState({
                ...state,
                contacts,
                loading: false,
                error: false,
                strError: "",
            })
        } catch (err) {
            console.log(err);
            setState({
                ...state,
                loading: false,
                error: true,
                strError: err.toString(),
            })
        }
    }

    const renderContact = ({ item }) => {
        const { name, avatar, phone } = item;

        return <ContactListItem name={name} avatar={avatar} phone={phone} onPress={() => navigate('Profile', { contact: item })} />
    }

    const contactsSorted = state.contacts.sort((a, b) => a.name.localeCompare(b.name));
    return (
        <View style={styles.container}>
            {/* {state.loading && <ActivityIndicator size={"large"} />} */}
            {state.error && <Text>Error: {state.strError}.</Text>}
            {!state.loading &&
                !state.error && (
                    <FlatList
                        data={contactsSorted}
                        keyExtractor={keyExtractor}
                        renderItem={renderContact}
                    />
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    }
})

Contacts.navigationOptions = ({ navigation: { navigate } }) => {
    return {
        title: 'Contacts',
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