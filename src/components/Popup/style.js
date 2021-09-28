import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const centeredView = {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.5)'
}

const styles = StyleSheet.create({
	endBottomView: {
        ...centeredView,
        justifyContent: "flex-end"
	},
	endModalView: {
		backgroundColor: colors.white,
		paddingTop: 20,
		borderRadius: 10,
		width: '100%',
		maxHeight: '70%'
	},
    centeredView: {
        ...centeredView,
        justifyContent: 'center'
    }
});

export default styles;
