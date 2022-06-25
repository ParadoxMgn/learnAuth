'use strict';

const indexPath = window.location.href.slice(0, window.location.href.lastIndexOf('/'));

const index = indexPath + '/index.html';
const home = indexPath + '/home.html';

const userList = [];
const localUserList = JSON.parse(localStorage.getItem('users')) || [];
let authEMail = JSON.parse(localStorage.getItem('auth')) || '';

const containerIndex = document.querySelector('.container-index');
const containerHome = document.querySelector('.container-home');
const btnAuth = document.getElementById('btn-auth');
const btnReg = document.getElementById('btn-reg');
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnExit = document.getElementById('btn-exit');
const textEmail = document.getElementById('text-email');
const textDate = document.getElementById('text-date');
const tBody = document.querySelector('tbody');
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popup_close');
const popupBody = document.getElementById('popup__body');
const popupEmail = document.getElementById('popup__email');
const popupPassword = document.getElementById('popup__password');
const popupPasswordCheck = document.getElementById('popup__password-check');
const popupBtnSave = document.getElementById('popup__btn-save');
const popupEmailErr = document.getElementById('popup__email-err');
const popupPasswordErr = document.getElementById('popup__password-err');
const textErr = document.getElementById('text-err');
const emailErr = document.getElementById('email-err');
const passwordErr = document.getElementById('password-err');
