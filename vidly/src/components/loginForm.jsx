import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './common/input';

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
    // boş string ya da server'dan çekilen değer ile init edilmeli. null ya da
    // tanımsız ( account: {  password: '' }, gibi ) OLAMAZ. Hata alırız...
    errors: {
      // username: '',
    },
    //errors['username'] ile direkt erişim kullanılabilir.
  };

  // gerçek DOM'da bir şeye erişmek için kullanılır. Mümkün olduğu kadar kullanmamaya
  // ya da en az sayıda kullanmaya çalışılır. (kodun dibinde yorum olarak bırakılan
  // kısımda nasıl kullanıldığı gözüküyor: ref={this.username} kısmı)
  //username = React.createRef();

  // Lifecycle Hook
  //   componentDidMount() {
  //     // sayfa yüklenince bu komponent'e gidilip yazı kısmı aktif olacak
  //     // bunu aşağıda autoFocus ile yaptık. Her zaman bu yöntemi kullanmamalıyız.
  //     // Gerçekten gerekli ise kullanmalıyız.
  //     this.username.current.focus();
  //   }

  // submit durumunda tüm sayfa tekrar yüklenmesin diye e(event) normal davranışında
  // kullanılmayacak (preventDefault)
  handleSubmit = e => {
    e.preventDefault();
    // Call the server, save the changes, redirect user to different page

    const errors = this.validate();
    // eğer hata yoksa null dönecekmiş gibi düşündük.

    this.setState({ errors: errors || {} });
    // eğer hata yoksa null.username'e erişmeye çalışılıp hata alınır. Bunun yerine
    // empty object dönmek sorunu çözüyor. null bir obje olmayacağı için sorun olur.

    if (errors) return;

    // const username = document.getElementById("username").value; << javascript'te böyle
    // const username = this.username.current.value; // DOM'a erişip dom elementinin değerini alabiliriz.
    // console.log(username);
    //console.log(this.state.account);
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account }; // kopya oluştur
    // account.username (account["username"]) ve account.password'e erişip
    // e.currentTarget.value'dan gelen değeri kaydeder. (e.currentTarget >> input olarak içeri alındı)
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  // "label" kısmı, hata durumunda listelenecek şekli
  schema = {
    username: Joi.string().min(3).max(32).required().label('Username'),
    password: Joi.string().min(4).required().label('Password'),
  };

  validateProperty = ({ name, value }) => {
    const objToValidate = { [name]: value }; // username: ... ya da password: ... şeklinde bir obje oluşturur.
    const schemaToUse = { [name]: this.schema[name] };

    const { error } = Joi.validate(objToValidate, schemaToUse);
    return error ? error.details[0].message : null;

    // Temel doğrulama (yukarıdaki gelişmiş doğrulama bunun yerine kullanıldı)
    // if (name === 'username') {
    //   if (value.trim() === '') return 'Username is required';
    //   if (value.trim().length <= 2) return 'Username must be at least 3 characters long';
    // }

    // if (name === 'password') {
    //   if (value.trim() === '') return 'Password is required';
    //   if (value.trim().length <= 3) return 'Password must be at least 4 characters long';
    // }
  };

  validate = () => {
    const joiOptions = { abortEarly: false };
    // son parametre ilk hatayı bulduğunda Joi durmasın diye
    const { error } = Joi.validate(this.state.account, this.schema, joiOptions);
    if (!error) return null;

    const errors = {};
    // Aşağıdaki kısımda .map() de kullanılabilirdi.
    // item.path[0]'de "username" ya da "password" yazacak. Joi şemasında tanımladığımız
    // değişkenlere ait bir validation hatası oluşursa bu isimler kullanılacak.
    // item.message'da ise hataya ilişkin detaylar olacak. Biz errors objesi içine [] erişimi
    // ile bu değerleri push'luyoruz.
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;

    //Yukardaki kodlar aşağıdakilerin yerine yazıldı
    // const errors = {};
    // const { account } = this.state;

    // // Temel doğrulama (gelişmişi ile değişecek)
    // if (account.username.trim() === '') errors.username = 'Username is required';
    // if (account.password.trim() === '') errors.password = 'Password is required';

    // //return errors;
    // return Object.keys(errors).length === 0 ? null : errors;
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Please Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='username'
            value={account.username}
            error={errors.username} // errors['username'] de olur
            onChange={this.handleChange}
          />
          <Input
            name='password'
            value={account.password}
            error={errors.password}
            onChange={this.handleChange}
          />
          <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='exampleCheck1'
            />
            <label
              className='form-check-label'
              htmlFor='exampleCheck1'
            >
              Keep me logged in
            </label>
          </div>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={this.validate()} //null dönerse false, diğer durumda true kabul edilir
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;

{
  /* <div className='mb-3'>
    <label
        htmlFor='username'
        className='form-label'
    >
        Username
    </label>
    <input
        // autoFocus
        // ref={this.username}
        value={account.username}
        name='username'
        // input field artık kendi state'i yerine bu class'ın state'ine bağlandı
        // controlled element oldu. Mutlaka value değeri buraya yazılmalı !!!
        onChange={this.handleChange}
        type='text'
        className='form-control'
        id='username'
        aria-describedby='usernameHelp'
    />
    <div
        id='usernameHelp'
        className='form-text'
    >
        Enter your username
    </div>
    </div>
    <div className='mb-3'>
    <label
        htmlFor='password'
        className='form-label'
    >
        Password
    </label>
    <input
        value={account.password}
        name='password'
        onChange={this.handleChange}
        type='password'
        className='form-control'
        id='password'
        aria-describedby='passwordHelp'
    />
    <div
        id='passwordHelp'
        className='form-text'
    >
        Enter your password
    </div>
    </div> */
}
