const nodemailer = require("nodemailer"),
    eUser = process.env.eUser,    
    etarget = process.env.etarget,   
    transporData = {
        host: process.env.eHost,
        port: parseInt(process.env.ePort),
        secure: process.env.eSecure,
        auth: {
            user: process.env.eUser,
            pass: process.env.ePasw
        }
    },
    Q = require("q");

function activation(clientEmail, id, name) {

    let def = Q.defer();
    var transporter = nodemailer.createTransport({
        transporData
    });
    var mailOptions = {
        from: eUser,
        to: [clientEmail, eUser],
        subject: '40ton.online Potwierdzenie rejestracji',
        text:   `Witaj ${name}.

        Dziękujemy za zainteresowanie naszym systemem. 
        Aby zakończyć proces rejestracji , proszę kliknąć w poniższy odnośnik:

        ${etarget}/activation/${id}

        Po udanej aktywacji wystarczy zalogować się na stronie głównej systemu
        aby przejść do indywidualnego panelu klienta.

        W przypadku jakichkolwiek pytań pozostajemy do dyspozycji 
        pod adresem: ${eUser}
              
        Życzymy sukcesywnego wzrostu zysków firmy 
        przy korzystaniu z naszego systemu kontroli zużycia paliwa.

        Wiadomość e-mail została wysłana na ten adres, ponieważ
        został on podany przy wypełnianiu formularza logowania na stronie:

        ${etarget}`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {def.reject(400);}
        else {def.resolve(info.accepted[0]);}
    });
    return def.promise;
}

function emailChPsw(clientEmail, psw, name) {
    let def = Q.defer();
    var transporter = nodemailer.createTransport({
        transporData
    });
    var mailOptions = {
        from: eUser,
        to: clientEmail,
        subject: '40ton.online - Zgłoszenie zmiany hasła logowania',
        text: `Witaj ${name}.
        Zostało odnotowane zgłoszenie zmiany hasła logowania do
        systemu ${etarget}
        
        Podajemy tymczasowe hasło umożliwiające logowanie: ${psw}

        Aby zmienić hasło tymczasowe należy w panelu administracyjnym
        firmy wybrać opcję edycji danych firmy, wprowadzić własne hasło 
        i zatwierdzić zmiany.

        W przypadku jakichkolwiek pytań pozostajemy do dyspozycji 
        pod adresem: ${eUser}`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) { def.reject(400); }
        else {def.resolve(info.accepted[0]);}
    });
    return def.promise;
}

function sendOrder(clientEmail, orderId, name) {
    let def = Q.defer();
    var transporter = nodemailer.createTransport({
        transporData
    });

    var mailOptions = {
        from: eUser,
        to: clientEmail,
        subject: '40ton.online Potwierdzenie zamówienia',
        text:   `Witaj ${name}.

        Dziękujemy za zainteresowanie naszym systemem. 
        Zamówienie nr ${orderId} zostało przyjęte i oczekuje na
        potwierdzenie płatności. Stan zamówienia można sprawdzić
        w panelu administracyjnym, zakładka firma, zamówienia.

        Po otrzymaniu potwierdzenia zapłaty na ten adres e-mail
        zostanie przesłana faktura zakupu.

        W przypadku jakichkolwiek pytań pozostajemy do dyspozycji 
        pod adresem: ${eUser}
              
        Życzymy sukcesywnego wzrostu zysków firmy 
        przy korzystaniu z naszego systemu kontroli zużycia paliwa.

        Wiadomość e-mail została wysłana na ten adres, ponieważ
        został on podany przy wypełnianiu formularza zamówienia na stronie:

        ${etarget}`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) { def.reject(400); }
        else {def.resolve(info.accepted[0]);}
    });
    return def.promise;
}
function sendForm(data) {

    let def = Q.defer();
    var transporter = nodemailer.createTransport({
        transporData
    });
    var mailOptions = {
        from: data.email,
        to: eUser,
        subject: `Wiadomość ze strony ${etarget}`,
        text: `Od ${data.name}
        email: ${data.email}
        Treść: ${data.messg}`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {def.reject(400);}
        else {def.resolve(200);}
    });
    return def.promise;
}
module.exports =  {
    activation: activation,
    emailChPsw: emailChPsw,
    sendForm: sendForm,
    sendOrder: sendOrder
};

