import React from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    TouchableOpacityProps,
    Text
} from 'react-native'

interface IButtonProps extends TouchableOpacityProps{
    title: string;
}

export function Button({ title, ...rest }: IButtonProps) {
    return (
        <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.7}
            onPressIn={Keyboard.dismiss}
            {...rest}
        >
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
})