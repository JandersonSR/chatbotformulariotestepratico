import React, { Component, useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeConsumer, ThemeProvider } from 'styled-components';
import Post from './Post';
import './style.scss';
import Contacts from './Contacts';


const theme = {
    background: '#f5f8fb',
    headerBgColor: '#14A939',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#fff',
    botFontColor: '#000',
    userBubbleColor: '#14A939',
    userFontColor: '#fff',
};

const config = {
    width: "400px",
    height: "500px",
    floating: true,
    hideUserAvatar: true,
    placeholder: 'Escreva aqui.',
    headerTitle: "Formulário de cadastro Helpper"


};



const SimpleForm = (props) => {
    const initialFieldValues ={
        consent: '',
        fullname: '',
        emailcaptura: '',
        document: '',
        cpf: '',
        cnpj: '',
        cep: '',
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
        number: ''

    }
    

    var [values, setValues]  = useState (initialFieldValues)
  
    const handleInputChange = e => {
        var {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
        
    }

    const handleFormSubmit = e =>{
        e.preventDefault();
        props.addOrEdit(values);
    }
        return (

            <>
                <form >
                    
                    <ThemeProvider theme={theme}>
                        <ChatBot onSubmit={handleFormSubmit}
                            steps={[
                                {
                                    id: 'welcome',
                                    message: 'Olá, sou a assitente virtual Helpper',
                                    trigger: '1',
                                },
                                {
                                    id: '1',
                                    message: 'Antes de começarmos, você concorda com os Termos de Uso, Politíca de Privacidade, e Gerencie seus Cookies',
                                    trigger: 'consent',
                                },
                                {
                                    id: 'consent',
                                    options: [
                                        { value: '1', label: 'Sim', trigger: 'q-fullname' },
                                        { value: '0', label: 'Não', trigger: 'no-consent' },
                                    ],
                                },
                                {
                                    id: 'no-consent',
                                    message: "Que pena, não poderemos prosseguir com o seu cadastro.",
                                    trigger: 'reload',
                                },
                                {
                                    id: 'reload',
                                    options: [
                                        { value: 'reload', label: 'Por favor me pergunte novamente', trigger: '1' },
                                    ]
                                },

                                {
                                    id: 'q-fullname',
                                    message: 'Qual é seu nome completo?',
                                    trigger: 'fullname'
                                    
                                },
                                {
                                    id: 'fullname',
                                    user: true,
                                    validator: (value) => {
                                        if (/^[A-Za-z0-9]+$/.test(value)) {
                                     
                                            return 'Por favor apenas letras, seu nome e sobrenome';
                                        }
                                        else {
                                                   
                                    onchange = {handleInputChange};
                                    value = values.fullname;
                                            return true;
                                        }
                                        
                                    },
                                    trigger: 'q-email'
                                },

                                {
                                    id: 'q-email',
                                    message: 'Olá, {previousValue}. Qual é o seu email para cadastro?',
                                    trigger: 'emailcaptura'
                                    
                                },
                                {
                                    id: 'emailcaptura',
                                    user: true,
                                    validator: (value) => {
                                        
                                        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)) {
                                        onchange = {handleInputChange};
                                        value = values.emailcaptura;
                                            return true;
                                        }
                                        else {
                                            return 'Coloque um e-mail valido.';
                                        }
                                    },
                                    
                                    trigger: 'q-document'
                                },

                                {
                                    id: 'q-document',
                                    message: 'Qual o seu tipo de documento?',
                                    trigger: 'document',
                                },
                                {
                                    id: 'document',
                                    options: [
                                        { value: 'CPF', label: 'CPF', trigger: 'q-cpf' },
                                        { value: 'CNPJ', label: 'CNPJ', trigger: 'q-cnpj' },

                                    ]
                                },

                                //-------cpf
                                {
                                    id: 'q-cpf',
                                    message: 'Qual o numero do seu CPF?' + 'Por favor digite sem pontos e traços',
                                    trigger: 'cpf',
                                },
                                {
                                    id: 'cpf',
                                    user: true,
                                    validator: (value) => {
                                        
                                        if (value.length == 11) {
                                            var cpf = value.trim();

                                            cpf = cpf.replace(/\./g, '');
                                            cpf = cpf.replace('-', '');
                                            cpf = cpf.split('');

                                            var v1 = 0;
                                            var v2 = 0;
                                            var aux = false;

                                            for (var i = 1; cpf.length > i; i++) {
                                                if (cpf[i - 1] != cpf[i]) {
                                                    aux = true;
                                                }
                                            }

                                            if (aux == false) {
                                                return 'CPF inválido';
                                            }

                                            for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
                                                v1 += cpf[i] * p;
                                            }

                                            v1 = ((v1 * 10) % 11);

                                            if (v1 == 10) {
                                                v1 = 0;
                                            }

                                            if (v1 != cpf[9]) {
                                                return 'CPF inválido';
                                            }

                                            for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
                                                v2 += cpf[i] * p;
                                            }

                                            v2 = ((v2 * 10) % 11);

                                            if (v2 == 10) {
                                                v2 = 0;
                                            }

                                            if (v2 != cpf[10]) {
                                                return 'CPF inválido';
                                            } else {                                                
                                                return true;
                                            }
                                        } else {
                                            return 'CPF deve conter 11 números';
                                        }
                                        onchange = {handleInputChange};
                                        value = values.cpf;  
                                    },
                                    trigger: 'q-cep'

                                },
                                //-------cnpj
                                {
                                    id: 'q-cnpj',
                                    message: 'Qual o numero do seu CNPJ?' + 'Por favor digite sem pontos e traços',
                                    trigger: 'cnpj',
                                },
                                {
                                    id: 'cnpj',
                                    user: true,
                                    validator: (value) => {
                                       
                                        if (value.length == 14) {
                                            var cnpj = value.trim();

                                            cnpj = cnpj.replace(/\./g, '');
                                            cnpj = cnpj.replace('-', '');
                                            cnpj = cnpj.replace('/', '');
                                            cnpj = cnpj.split('');

                                            var v1 = 0;
                                            var v2 = 0;
                                            var aux = false;

                                            for (var i = 1; cnpj.length > i; i++) {
                                                if (cnpj[i - 1] != cnpj[i]) {
                                                    aux = true;
                                                }
                                            }

                                            if (aux == false) {
                                                return 'CNPJ inválido';
                                            }

                                            for (var i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
                                                if (p1 >= 2) {
                                                    v1 += cnpj[i] * p1;
                                                } else {
                                                    v1 += cnpj[i] * p2;
                                                }
                                            }

                                            v1 = (v1 % 11);

                                            if (v1 < 2) {
                                                v1 = 0;
                                            } else {
                                                v1 = (11 - v1);
                                            }

                                            if (v1 != cnpj[12]) {
                                                return 'CNPJ inválido';
                                            }

                                            for (var i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
                                                if (p1 >= 2) {
                                                    v2 += cnpj[i] * p1;
                                                } else {
                                                    v2 += cnpj[i] * p2;
                                                }
                                            }

                                            v2 = (v2 % 11);

                                            if (v2 < 2) {
                                                v2 = 0;
                                            } else {
                                                v2 = (11 - v2);
                                            }

                                            if (v2 != cnpj[13]) {
                                                return 'CNPJ inválido';
                                            } else {
                                                return true;
                                            }
                                        } else {
                                            return 'CNPJ deve conter 14 números';
                                        }
                                        onchange = {handleInputChange};
                                        value = values.cpf;
                                    },
                                    trigger: 'q-cep'

                                },

                                {
                                    id: 'q-cep',
                                    message: 'Estamos quase acabando. Digite o seu CEP neste formato:' + " " +
                                        "12345-678",
                                    trigger: 'cep',
                                },
                                {
                                    id: 'cep',
                                    user: true,
                                    validator: (value) => {
                                       
                                        if (/^[0-9]{5}(?:-[0-9]{3})?$/.test(value) == false) {
                                            return 'Por favor digite um CEP valido';
                                        }
                                        else {
                                            onchange = {handleInputChange};
                                            value = values.cpf;
                                            return true;
                                        }
                                    },
                                    trigger: 'q-logradouro'
                                },


                                //---------logradouro

                                {
                                    id: 'q-logradouro',
                                    message: 'Qual o nome da sua rua?',
                                    trigger: 'logradouro',
                                },
                                {
                                    id: 'logradouro',
                                    user: true,
                                    validator: (value) => {
                                        onchange = {handleInputChange};
                                        value = values.logradouro;
                                        return true;
                                    },
                                    trigger: 'q-number'
                                },
                                //--------number
                                {
                                    id: 'q-number',
                                    message: 'Qual o número da sua residência?',
                                    trigger: 'number',
                                  
                                },
                                {
                                    id: 'number',
                                    user: true,
                                    validator: (value) => {
                                        onchange = {handleInputChange};
                                        value = values.number;
                                        return true;
                                    },
                                    trigger: 'q-bairro'
                                },

                                //---------Bairro

                                {
                                    id: 'q-bairro',
                                    message: 'Seu Bairro?',
                                    trigger: 'bairro',
                                },
                                {
                                    id: 'bairro',
                                    user: true,
                                    validator: (value) => {
                                        onchange = {handleInputChange};
                                        value = values.bairro;
                                        return true;
                                    },
                                    trigger: 'q-city'
                                },
                                //---------Cidade

                                {
                                    id: 'q-city',
                                    message: 'Cidade em que mora?',
                                    trigger: 'localidade',
                                },
                                {
                                    id: 'localidade',
                                    user: true,
                                    validator: (value) => {
                                        onchange = {handleInputChange};
                                        value = values.localidade;
                                        return true;
                                    },
                                    trigger: 'q-states'
                                },
                                //---------estado

                                {
                                    id: 'q-states',
                                    message: 'Estado? Apenas a sigla '+
                                             'Ex: SP para São Paulo',
                                    trigger: 'uf',
                                },
                                {
                                    id: 'uf',
                                    user: true,
                                    validator: (value) => {
                                        onchange = {handleInputChange};
                                        value = values.uf;
                                        return true;
                                    },
                                    trigger: 'q-submit'
                                },
                                //---------submit

                                {
                                    id: 'q-submit',
                                    message: 'Prosseguir para o Envio dos seus dados?',
                                    trigger: 'submit'
                                },
                                {
                                    id: 'submit',
                                    options: [
                                        { value: 'submit', label: 'Yes', trigger: 'end-message' },
                                        { value: 'no', label: 'No', trigger: 'no-submit' },
                                    ]
                                },
                                {
                                    id: 'no-submit',
                                    message: 'Suas informações não foram enviadas',
                                    end: true,
                                },
                                {
                                    id: 'end-message',
                                    component: <Post />,
                                    
                                    asMessage: true,
                                    end: true,
                                },
                            ]}

                            {...config}
                        />
                          
                    </ThemeProvider>
                </form>
            </>
        );
    }



export default SimpleForm;