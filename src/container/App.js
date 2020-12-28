// Em breve farei uma versão com redux eos seguintes
// redux, users, firebase, cards, directory e o projeto será ampliado para e-commerce
//Este é apenas um modelo de formulário para um testePrático de um programa de estágio

import './App.scss';
import React, { Component, useEffect } from 'react';
//---- database
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//----hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { useColletionData } from 'react-firebase-hooks/firestore';
import SimpleForm from '../components/SimpleForm';
import {auth} from './firebase';
import {firestore} from './firebase';
import {signInWithGoogle} from './firebase';
import {createUserProfileDocument} from './firebase';
import {addCollectionAndDocuments} from './firebase';
import {convertCollectionsSnapshotToMap} from './firebase';
import {getCurrentUser} from './firebase';
import Post from '../components/Post';
import Contacts from '../components/Contacts';
import addOrEdit from '../components/Contacts';


const Header = ({ currentUser }) => (
 

  <div className='header'>

    {currentUser ? (
      <div className='option'>
        <div id='signOut' className='option' onClick={() => auth.signOut()} alt="sair do google">
          SAIR DA CONTA GOOGLE
             </div>
        <section>
          <SimpleForm addOrEdit={addOrEdit}/>
        </section>
      </div>
    ) : (
        <>
          <div >
            <div className='login' to='/signin' >
              FAÇA O LOGIN PARA PREENCHER O FORMULÁRIO
        </div>
          </div>
          <section className="center">
            <section >
              <button className='customButton' onClick={signInWithGoogle} alt="Botão entrar com o google">Entre com o Google</button>
            </section>
          </section>
        </>
      )}
  </div>
  
);


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };

  



  }


  
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App" >
        <Header currentUser={this.state.currentUser} />
        <div className='App-header'>
          <a
            className="App-link"
            href="https://helpper.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <section className="logo" alt="logo" />
          </a>
          <div ></div>
          <section className="info" alt="advertência">
            Por favor, Não use suas informações pessoais para fazer o teste do ChatBot formulário,
        <br /> ex: nome, rua, numero
      </section>
        </div>
      </div>
    );
  }
} export default App;
