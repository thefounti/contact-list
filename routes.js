import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons'

import Contacts from "./screens/Contacts";
import Favorites from "./screens/Favorites";
import Profile from "./screens/Profile";
import User from "./screens/User";
import colors from "./utils/colors";

// export default StackNavigator({
//     Contacts: {
//         screen: Contacts,
//     },
//     Profile: {
//         screen: Profile,
//     },
// }, {
//     navigationOptions: {
//         headerStyle: {
//             backgroundColor: colors.blue
//         },
//         headerTintColor:'black'
//     },
//     initialRouteName: 'Contacts',
// })
const getTabBarIcon = ({ icon, tintColor }) => (
    <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
)


const defNavOptions = {
    headerStyle: {
        backgroundColor: colors.blue
    },
    headerTintColor: colors.black
}

const ContactsScreens = StackNavigator({
    Contacts: {
        screen: Contacts,
    },
    Profile: {
        screen: Profile,
    },
}, {
    navigationOptions: {
        ...defNavOptions,
        tabBarIcon: ({ tintColor }) => { return getTabBarIcon({ icon: 'list', tintColor }) },
    },
    initialRouteName: 'Contacts',
})

const FavoritesScreens = StackNavigator({
    Favorites: {
        screen: Favorites,
    },
    Profile: {
        screen: Profile,
    },
}, {
    navigationOptions: {
        ...defNavOptions,
        tabBarIcon: ({ tintColor }) => { return getTabBarIcon({ icon: 'star', tintColor }) },
    },
    initialRouteName: 'Favorites',
})

const UserScreens = StackNavigator({
    User: {
        screen: User,
    },
}, {
    navigationOptions: {
        ...defNavOptions,
        tabBarIcon: ({ tintColor }) => { return getTabBarIcon({ icon: 'person', tintColor }) },
    },
    initialRouteName: 'User',
})

export default TabNavigator({
    Contacts: {
        screen: ContactsScreens,
    },
    Favorites: {
        screen: FavoritesScreens,
    },
    User: {
        screen: UserScreens,
    }
}, {
    initialRouteName: 'Contacts',
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style: {
            backgroundColor: colors.greyLight
        },
        showLabel: false,
        showIcon: true,
        activeTintColor: colors.blue,
        inactiveTintColor: colors.greyDark,
        renderIndicator: () => null,
    },
})

