import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';

import { fetchRandomContact } from "../utils/api";

import colors from "../utils/colors";

import store from "../store";

export default Profile = ({ navigation }) => {
    const [state, setState] = useState({
        contact: {},
    })

    const { state: { params } } = navigation;
    const { id } = params;
    // console.log("contact", contact);

    const { avatar, name, email, phone, cell } = store.getState().contacts.find(contact => contact.id === id);

    // useEffect(() => {
    //     fetchRandomContactAsync();
    // }, [])

    // const fetchRandomContactAsync = async () => {
    //     const contact = await fetchRandomContact();

    //     setState({ ...state, contact });
    // }

    return (
        <View style={styles.container}>
            <View style={styles.avatarSection}>
                <ContactThumbnail avatar={avatar} name={name} phone={phone} />
            </View>
            <View style={styles.detailsSection}>
                <DetailListItem icon="mail" title="Email" subtitle={email} />
                <DetailListItem icon="phone" title="Work" subtitle={phone} />
                <DetailListItem icon="smartphone" title="Personal" subtitle={cell} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    avatarSection: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.blue,
    },
    detailsSection: {
        flex: 1,
        backgroundColor: 'white',
    }
})

Profile.navigationOptions = ({ navigation: { state: { params } } }) => {
    const { id } = params;
    // const { contact: { name } } = params;

    const { name } = store.getState().contacts.find(contact => contact.id === id)

    return {
        title: name.split(' ')[0],
        headerTintColor: 'white',
    }
}
