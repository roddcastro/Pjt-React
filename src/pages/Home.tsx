import React, { useState, useEffect } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    TextInput,
    Platform,
    FlatList
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface Listagem{
    id: string;
    name: string;
    email: string;
    telefone: string;
}

export function Home(){
    const [newNomes, setNewNomes] = useState('')
    const [myNomes, setMyNomes] = useState<Listagem[]>([])
    const [newEmails, setNewEmails] = useState('')
    const [myEmails, setMyEmails] = useState<Listagem[]>([])
    const [newTelefones, setNewTelefones] = useState('')
    const [myTelefones, setMyTelefones] = useState<Listagem[]>([])
    const [greeting, setGreeting] = useState('')

    function handleAddNew(){
        const List = {
            id: String(new Date().getTime()),
            name: newNomes,
            email: newEmails,
            telefone: newTelefones,
        }
        setMyNomes([...myNomes, List])
        setNewNomes('')
        setMyEmails([...myEmails, List])
        setNewEmails('')
        setMyTelefones([...myTelefones, List])
        setNewTelefones('')
    }

    function handleRemove(id: string){
        setMyNomes(myNomes.filter(Listagem=> Listagem.id !== id))

    }

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12){
            setGreeting('Bom dia!')
        }else if (currentHour >= 12 && currentHour < 18){
            setGreeting('Boa tarde!')
        }else {
            setGreeting('Boa noite!')
        }
    }, [])

    useEffect(() => {
        async function loadData() {
            const storageSkills = await AsyncStorage.getItem('@mynomes:nomes')
            if (storageSkills) {
                setMyNomes(JSON.parse(storageSkills))
            }
        }
        loadData()
    }, [])

    useEffect (() => {
        async function saveData() {
            await AsyncStorage.setItem('@mynomes:nomes', JSON.stringify(myNomes))
        }
        saveData()
    }, [myNomes])

    return(
        <>
        <View style={styles.container}>
            <Text style={styles.greetings}>
                {greeting}
            </Text>
            <Text style={styles.title}>Seja bem-vindo, efetue seu Listagem:</Text>

            <TextInput
                    style={styles.input}
                    placeholder= 'Digite seu nome...'
                    value={newNomes}
                    placeholderTextColor='#555'
                    onChangeText={value => setNewNomes(value)}
                    onSubmitEditing={handleAddNew}
                    blurOnSubmit
            />

            <TextInput
                style={styles.input}
                placeholder= 'Digite seu email...'
                keyboardType="email-address"
                value={newEmails}
                placeholderTextColor='#555'
                onChangeText={value => setNewEmails(value)}
                onSubmitEditing={handleAddNew}
                blurOnSubmit
            />

            <TextInput
                style={styles.input}
                placeholder= 'Digite seu telefone...'
                keyboardType="numeric"
                value={newTelefones}
                placeholderTextColor='#555'
                onChangeText={value => setNewTelefones(value)}
                onSubmitEditing={handleAddNew}
                blurOnSubmit
            />

            <Button
                title = 'Cadastrar'
                onPress={handleAddNew}
            />

            <Text style={styles.title}>
                Listagem
            </Text>

            <FlatList showsVerticalScrollIndicator={false}
                data={myNomes}
                keyExtractor={item=> item.id}
                renderItem={({item})=> ( 
                    <SkillCard
                    Nome={item.name}
                    Email={item.email}
                    Telefone={item.telefone}
                    onPress={() => handleRemove(item.id)}
                    />
            )}
            />
            
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B0C4DE',
        paddingHorizontal: 30,
        paddingVertical: 70
    },
    title: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    textInput: {
        color: '#4F4F4F',
        fontSize: 18
    },
    input: {
        backgroundColor: '#D3D3D3',
        color: 'black',
        fontSize: 18,
        marginBottom: 10,
        padding: Platform.OS === 'ios' ? 15 : 12,
        borderRadius: 7
    },
    greetings: {
        color: 'black',
        fontSize: 20
    }
})