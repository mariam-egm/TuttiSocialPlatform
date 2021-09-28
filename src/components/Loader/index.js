import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import colors from '../../constants/colors';

import styles from './style';

const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.secondaryColor} />
        </View>
    )
}

export default Loader;
