const app = require('../app').app,
    testEmail = process.env.E2E_TEST_EMAIL,
    testNip = process.env.E2E_TEST_NIP,
    testPassword = process.env.E2E_TEST_PASSWORD;

beforeEach(() => {
	browser.maximizeWindow();
 	browser.url('/');
});

describe('Register and login tests', () => {    

  it('Test1: Get page title', () => {
  	const title = browser.getTitle();
    $('#langPl').click();  	
    assert.equal(title, 'System kontroli zuzycia paliwa. Efektywność jazdy online.');
  });
  it('Test2: Registration form test', () => {    
    const sendData = $('#sendData');
    const messBtn = $('#messBtn');
    const formErrorText = 'Zaznaczone pola zostały błędnie wypełnione';
        
    $('#langPl').click();
    $('#regBtn').click();
    $("[type='checkbox']").click();

    $("[name='name']").setValue('TestName');
    sendData.click();
    assert.equal($('p#messText').getText(), formErrorText);
    messBtn.click();

    $("[name='lastName']").setValue('TestLastName');
    sendData.click();
    assert.equal($('p#messText').getText(), formErrorText);
    messBtn.click();
    
    $("[name='company']").setValue('TestEmail');
    sendData.click();
    assert.equal($('p#messText').getText(), formErrorText);
    messBtn.click();
    
    $("[name='nip']").setValue('1111111111');
    sendData.click();
    assert.equal($('p#messText').getText(), formErrorText);
    messBtn.click();
    
    $("[name='street']").setValue('TestStreet');
    sendData.click();
    assert.equal($('p#messText').getText(), formErrorText);
    messBtn.click();
    
    $("[name='city']").setValue('TestCity');
    sendData.click();
    assert.equal($('p#messText').getText(), formErrorText);
    messBtn.click();
    
    $("[name='post']").setValue('TestPost');
    sendData.click();
    assert.equal($('p#messText').getText(), formErrorText);
    messBtn.click();
    
    $("[name='country']").setValue('TestCountry');
    sendData.click();
    assert.equal($('p#messText').getText(), formErrorText);
    messBtn.click();
    
    $("form#register [name='email']").setValue('testemail@test');    
    sendData.click();
    assert.equal($('p#messText').getText(), formErrorText);
    messBtn.click();
    
    $("[name='email2']").setValue('testemail@test');
    sendData.click();
    assert.equal($('p#messText').getText(), formErrorText);
    messBtn.click();

    $("form#register [name='password']").setValue('TestPassword');
    sendData.click();
    assert.equal($('p#messText').getText(), formErrorText);
    messBtn.click();

    $("[name='password2']").setValue('TestOtherPassword');
    sendData.click();
    assert.equal($('p#messText').getText(), formErrorText);
    messBtn.click();
    
    $("[name='email2']").setValue('other@test');
    $("[name='password2']").setValue('TestPassword');
    sendData.click();
    assert.equal($('p#messText').getText(), formErrorText);
    messBtn.click();

    $("[name='email2']").setValue('testemail@test');
    $("[name='nip']").setValue(testNip);
    sendData.click();
    browser.waitUntil(() => {
      return $('p#messText').getText() === 'W systemie istnieje klient o podanym adresie e-mail lub numerze NIP';
    }, 10000, 'expected text to be after 10s');
    messBtn.click();
    
    $("form#register [name='email']").setValue(testEmail);
    $("[name='email2']").setValue(testEmail);
    $("[name='nip']").setValue('1111111111');   
    sendData.click();    
    browser.waitUntil(() => {
      return $('p#messText').getText() === 'W systemie istnieje klient o podanym adresie e-mail lub numerze NIP';
    }, 10000, 'expected text to be after 10s');
    messBtn.click();    
  });

  it('Test3: Login form', () => {
    const messBtn = $('#messBtn');
    $('#langPl').click();
    $('#logBtn').click();
    const submit = $("#formLog [type='submit']");
    const logErrorText = 'Nieprawidłowo wypełnione pola formularza';
    submit.click();
    assert.equal($('p#messText').getText(), logErrorText);
    messBtn.click();
    
    $("form#formLog [name='password']").setValue("TestPassword");
    submit.click();
    assert.equal($('p#messText').getText(), logErrorText);
    messBtn.click();

    $("form#formLog [name='email']").setValue("testemail@test");
    $("form#formLog [name='password']").setValue("");
    submit.click();
    assert.equal($('p#messText').getText(), logErrorText);
    messBtn.click();
        
    $("form#formLog [name='email']").setValue(testEmail);
    $("form#formLog [name='password']").setValue("TestPassword");
    submit.click();
    browser.waitUntil(() => {
      return $('p#messText').getText() === 'Nieprawidłowy adres email lub hasło';
    }, 10000, 'expected text to be after 10s');
    messBtn.click();

    $("form#formLog [name='email']").setValue("testemail@test");
    $("form#formLog [name='password']").setValue(testPassword);
    submit.click();
    browser.waitUntil(() => {
      return $('p#messText').getText() === 'Nieprawidłowy adres email lub hasło';
    }, 10000, 'expected text to be after 10s');
    messBtn.click();

    $("form#formLog [name='email']").setValue(testEmail);
    $("form#formLog [name='password']").setValue(testPassword);
    submit.click();
    browser.waitUntil(() => {
      return $('.page-header h2').getText() === 'System kontroli zużycia paliwa dla - 40ton.online';
    }, 10000, 'expected text to be after 10s');   
  });
});