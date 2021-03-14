import React from 'react';
import { Text, StyleSheet } from 'react-native';

import colors from '../config/colors';

function ResourceListScreen ({ navigation }) {
    return (
        <Text>
            abc
        </Text>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      alignItems: 'center',
      justifyContent: 'center'
    },
});

export default ResourceListScreen;