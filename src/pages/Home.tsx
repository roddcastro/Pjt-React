import React, { useState, useEffect } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    TextInput,
    Platform,
    FlatList,
    Image
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface Listagem{
    id: string;
    codigo: string;
    nome: string;
}

export function Home(){
    const [newCodigos, setNewCodigos] = useState('')
    const [myCodigos, setMyCodigos] = useState<Listagem[]>([])
    const [newNomes, setNewNomes] = useState('')
    const [myNomes, setMyNomes] = useState<Listagem[]>([])

    function handleAddNew(){
        const List = {
            id: String(new Date().getTime()),
            codigo: newCodigos,
            nome: newNomes
        }
        if(newCodigos.trim() !== '' && newNomes.trim() !== ''){
            setMyCodigos([...myCodigos, List])
            setNewCodigos('')
            setMyNomes([...myNomes, List])
            setNewNomes('')
        }else{
            alert('Preencha todos os campos!')
        }
    }

    function handleRemove(id: string){
        setMyNomes(myNomes.filter(Listagem=> Listagem.id !== id))

    }

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
        <Image style={styles.img} source={require('../../assets/mapa.png')} />
            <Text style={styles.title}>Faça o cadastro abaixo:</Text>

            <TextInput
                    style={styles.input}
                    placeholder= 'Digite o código do país...'
                    keyboardType="numeric"
                    value={newNomes}
                    placeholderTextColor='#555'
                    onChangeText={value => setNewNomes(value)}
                    onSubmitEditing={handleAddNew}
                    blurOnSubmit
            />

            <TextInput
                style={styles.input}
                placeholder= 'Digite o nome do país...'
                value={newCodigos}
                placeholderTextColor='#555'
                onChangeText={value => setNewCodigos(value)}
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
                    Codigo={item.codigo}
                    Nome={item.nome}
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
        backgroundColor: 'black',
        paddingHorizontal: 30,
        paddingVertical: 70
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30
    },
    textInput: {
        color: '#4F4F4F',
        fontSize: 18
    },
    input: {
        backgroundColor: '#1C1C1C',
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
        padding: Platform.OS === 'ios' ? 15 : 12,
        borderRadius: 7
    },
    img: {
        width: 330,
        height: 120,
        marginBottom: 10
    }
})