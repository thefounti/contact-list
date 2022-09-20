import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';

import { fetchRandomContact } from "../utils/api";

import colors from "../utils/colors";

export default Profile = ({ navigation }) => {
    const [state, setState] = useState({
        contact: {},
    })

    const { state: { params } } = navigation;
    const { contact } = params;

    const { avatar, name, email, phone, cell } = contact;

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
