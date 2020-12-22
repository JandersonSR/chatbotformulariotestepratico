import React, { Component, useEffect, useState } from 'react';
import SimpleForm from './SimpleForm';
import firebaseDb from '../container/firebase';
import firebase from 'firebase';

const Contacts = () => {

    var [contactObjects, setContactObjects] = useState({})

    useEffect(()=>{
        firebase.database().ref().child('contacts').on('value', snapshot =>{
            
            if(snapshot.val() != null)
                setContactObjects({
                    ...snapshot.val()
                })    
        })
    },[])
    
    const addOrEdit = obj =>{
        firebase.database().ref().child('contacts').push(
            obj,
            error =>{
            if(error)console.log(error);
            }
        )
    }
    return (
        <>
            <div className='jumbo'>
                <div className='container'>
                    <h1 className="display">Contatos Cadastrados</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-5'>
                    <SimpleForm addOrEdit={addOrEdit}/>
                </div>
                <div className='col-md-7'>
                    <div className='list'>Lista de Contatos</div>

                </div>
            </div>

        </>
    )
}
export default Contacts;