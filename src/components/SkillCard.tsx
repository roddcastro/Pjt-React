import React from "react";
import {TouchableOpacity, Text, StyleSheet, TouchableOpacityProps} from 'react-native'

interface ISkillCaraProps extends TouchableOpacityProps {
    Nome: string,
    Email: string,
    Telefone: string,

}

export function SkillCard({Nome, Email, Telefone, ...rest}: ISkillCaraProps){
    return (
        <TouchableOpacity 
            style={styles.buttonSkill} 
            {...rest} 
        >
           <Text style={styles.textSkillNome}>
                Nome: {Nome}
            </Text>
            <Text style={styles.textSkillemail}>
                Email: {Email}
            </Text>
            <Text style={styles.textSkillTelefone}>
                Telefone: {Telefone}
           </Text>
       </TouchableOpacity>       
    )
}
const styles = StyleSheet.create({
    buttonSkill: {
        backgroundColor: 'black',
        padding:15,
        borderRadius:15,
        marginBottom: 15
    },
    textSkillNome: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold'
    },
    textSkillemail: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },
    textSkillTelefone: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
})