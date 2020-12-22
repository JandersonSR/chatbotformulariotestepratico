import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { auth, createUserProfileDocument } from '../container/firebase';
import { convertCollectionsSnapshotToMap } from '../container/firebase';
import { firestore } from '../container/firebase';
//import SimpleForm from './SimpleForm';
import firebaseDb from '../container/firebase';



class Post extends Component {
    constructor(props) {
        super(props);

        const { steps } = this.props;
        const { consent, fullname, emailcaptura, document, cpf = 0, cnpj = 0, cep, logradouro, bairro, localidade,
            uf, number } = steps;

        this.state = {

            consent:'', fullname:'', emailcaptura:'', document:'', cpf:'',
            cnpj:'', cep:'', logradouro:'', bairro:'',localidade:'',number:''
        };

    }
  
   

    unsubscribeFromSnapshot = null;
    componentDidMount() {
        const collectionRef = firestore.collection('users');

        collectionRef.onSnapshot(async snapshot => {
            convertCollectionsSnapshotToMap(snapshot);
        })

        const userObject =  {

            consent: this.state.consent,
            fullname: this.state.fullname,
            emailcaptura: this.state.emailcaptura,
            document: this.state.document,
            cpf: this.state.cpf,
            cnpj: this.state.cnpj,
            cep: this.state.cep,
            logradouro: this.state.logradouro,
            bairro: this.state.bairro,
            localidade: this.state.localidade,
            uf: this.state.uf,
            number: this.state.number,

        };
        


        axios.post(`/api`, userObject)
            .then(res => {
                console.log(res.status)
            }).catch(function (error) {
                console.log(error);
            });
    }




    render() {
        return (
            <>
                <div>Obrigado! Seus dados foram enviados com sucesso!</div>
                <section className="center2">
                    <section >
                        <input type="submit" value='SALVAR' className='customButton2' />
                    </section>
                </section>
            </>
        );
    }
};


export default Post;


