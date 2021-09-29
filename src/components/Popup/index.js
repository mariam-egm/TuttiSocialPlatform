import React from 'react';
import { View, Modal } from 'react-native';

import { SCREEN_CENTER, SCREEN_END } from '../../constants/popupType';
import styles from './style';


/** 
 * Popup component that is a Modal that could have children to render 
 * and had a type for the children (centered or at the end of the screen)
*/
const Popup = ({children, showPopup, type}) => {
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPopup}
            >
                <View style={getContainerStyle(type)}>
                    <View style={styles.endModalView}>
                        {children}
                    </View>
                </View>
            </Modal>
        </>
    )
}

const getContainerStyle = (type) => {
    switch(type) {
        case SCREEN_END:
            return styles.endBottomView;
        case SCREEN_CENTER:
            return styles.centeredView;
    }
}

export default Popup;
