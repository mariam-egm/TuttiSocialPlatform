import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundColor, 
        flex: 1,
        padding: 20
    }, 
    ownerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    personalImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: colors.secondaryColor,
        borderWidth: 4
    },
    ownerName: {
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 26
    },
    postContainer: {
        backgroundColor: colors.white,
        borderRadius: 10,
        flex: 1,
        padding: 20
    },
    postText: {
        color: colors.primaryInk,
        fontSize: 20,
        fontWeight: 'bold'
    },
    postImage: {
        width: '75%',
        height: '70%',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10
    },
    likesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondaryColor,
        height: '5%',
        width: '40%',
        alignSelf: 'center',
        marginVertical: 5,
        borderRadius: 10
    },
    likesText: {
        color: colors.white
    }
});

export default styles;
