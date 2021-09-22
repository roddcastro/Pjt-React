import React from "react";
import {TouchableOpacity, Text, StyleSheet, TouchableOpacityProps} from 'react-native'

interface ISkillCardProps extends TouchableOpacityProps {
    Nome: string,
    Codigo: string

}

export function SkillCard({Nome, Codigo, ...rest}: ISkillCardProps){
    return (
        <TouchableOpacity 
            style={styles.buttonSkill} 
            {...rest} 
        >
            <Text style={styles.textResult}>
                {Nome}
            </Text>
            <Text style={styles.textResult}>
                {Codigo}
            </Text>
       </TouchableOpacity>       
    )
}
const styles = StyleSheet.create({
    buttonSkill: {
        backgroundColor: 'lightgrey',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        alignItems: 'center'
    },
    textResult: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    }
})