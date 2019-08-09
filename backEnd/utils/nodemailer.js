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

    const text_pl = `Witaj ${name}.

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

        ${etarget}`;

    const text_es = `Bienvenida ${name}.

        Gracias por su interés en nuestro sistema.
        completar el proceso de registro, haga clic en el siguiente enlace:

        ${etarget}/activation/${id}

        Después de la activación exitosa, simplemente inicie sesión 
        en la página principal del sistema para ir al panel de cliente individual.

        Si tiene alguna duda, quedamos a su disposición: ${eUser}
              
        Le deseamos un aumento sucesivo en las ganancias de la compañía 
        al utilizar nuestro sistema de control de consumo de combustible.
        
        Se envió un correo electrónico a esta dirección porque se proporcionó 
        al completar el formulario de inicio de sesión en la página:

        ${etarget}`;

    const subject_pl = '40ton.online - Potwierdzenie rejestracji';
    const subject_es = '40ton.online - Confirmación de inscripción';

    let def = Q.defer();
    var transporter = nodemailer.createTransport(transporData);
    var mailOptions = {
        from: eUser,
        to: [clientEmail, eUser],
        subject: global.language === 'es' ? subject_es : subject_pl,
        text: global.language === 'es' ?  text_es : text_pl   
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {def.reject(400);}
        else {def.resolve(info.accepted[0]);}
    });
    return def.promise;
}

function emailChPsw(clientEmail, psw, name) {

    const text_pl = `Witaj ${name}.
        Zostało odnotowane zgłoszenie zmiany hasła logowania do
        systemu ${etarget}

        Podajemy tymczasowe hasło umożliwiające logowanie: ${psw}

        Aby zmienić hasło tymczasowe należy w panelu administracyjnym
        firmy wybrać opcję edycji danych firmy, wprowadzić własne hasło 
        i zatwierdzić zmiany.

        W przypadku jakichkolwiek pytań pozostajemy do dyspozycji 
        pod adresem: ${eUser}`;

    const text_es = `Bienvenida ${name}.
        Se ha registrado una notificación sobre el cambio 
        de la contraseña de inicio de sesión del sistema ${etarget}
        
        Proporcionamos una contraseña temporal para iniciar sesión: ${psw}

        Para cambiar la contraseña temporal, debe elegir la opción de edición 
        de datos de la compañía en el panel de administración de la compañía, 
        ingresar su propia contraseña y aprobar los cambios.

        Si tiene alguna duda, quedamos a su disposición: ${eUser}`;

    const subject_pl = '40ton.online - Zgłoszenie zmiany hasła logowania';
    const subject_es = '40ton.online - Informe de cambio de contraseña de inicio de sesión';

    let def = Q.defer();
    var transporter = nodemailer.createTransport(transporData);
    var mailOptions = {
        from: eUser,
        to: clientEmail,
        subject: global.language === 'es' ? subject_es : subject_pl,
        text: global.language === 'es' ?  text_es : text_pl
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) { def.reject(400); }
        else {def.resolve(info.accepted[0]);}
    });
    return def.promise;
}

function sendOrder(clientEmail, orderId, name) {

    const text_pl = `Witaj ${name}.

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

        ${etarget}`;

    const text_es = `Bienvenida ${name}.

        Gracias por su interés en nuestro sistema. 
        El pedido # ${orderId} ha sido aceptada y está pendiente de pago. 
        El estado del pedido puede ser verificado por el panel de administración, 
        la pestaña de la compañía, los pedidos.

        Después de recibir la confirmación del pago, se enviará 
        una factura de compra a esta dirección de correo electrónico.

        Si tiene alguna duda, quedamos a su disposición: ${eUser}
              
        Le deseamos un aumento sucesivo en las ganancias de la compañía 
        al utilizar nuestro sistema de control de consumo de combustible.

        Se envió un correo electrónico a esta dirección porque 
        se proporcionó al completar el formulario de pedido en la página:

        ${etarget}`;

    const subject_pl = '40ton.online - Potwierdzenie zamówienia';
    const subject_es = '40ton.online - Confirmación del pedido.';

    let def = Q.defer();
    var transporter = nodemailer.createTransport(transporData);

    var mailOptions = {
        from: eUser,
        to: clientEmail,
        subject: global.language === 'es' ? subject_es : subject_pl,
        text: global.language === 'es' ?  text_es : text_pl
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) { def.reject(400); }
        else {def.resolve(info.accepted[0]);}
    });
    return def.promise;
}
function sendForm(data) {
    const text_pl = `Od ${data.name}
        email: ${data.email}
        Treść: ${data.messg}`;

    const text_es = `De ${data.name}
        email: ${data.email}
        Contenido: ${data.messg}`;

    const subject_pl = `Wiadomość ze strony ${etarget}`;
    const subject_es = `Mensaje del sitio web ${etarget}`;

    let def = Q.defer();
    var transporter = nodemailer.createTransport(transporData);
    var mailOptions = {
        from: data.email,
        to: eUser,
        subject: global.language === 'es' ? subject_es : subject_pl,
        text: global.language === 'es' ?  text_es : text_pl
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

