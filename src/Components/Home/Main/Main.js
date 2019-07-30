import React from 'react';
import normLoad from '../../../assets/img/norm_load.jpg';
// import nonEfective from '../../../assets/img/non_efective.jpg';
import phonePanel1 from '../../../assets/img/panek1.png';
import phonePanel2 from '../../../assets/img/panek2.png';
import phonePanel5 from '../../../assets/img/panek5.png';
import effectiveDriveDark from '../../../assets/img/effectiveDriveDark.jpg';
import successCharts from '../../../assets/img/successCharts.jpg';
import succsessBusines from '../../../assets/img/succsessBusines.jpg';
import efficientDrivers from '../../../assets/img/efficient_drivers.jpg';

const Main = () => {    
    return (        
        <div className="container">

            <div className= "d-flex-row mt-5">                
                    <h1 className='text-center text-danger'>Redukcja przepałów poprzez optymalizację stylu jazdy</h1>                   
                    <h5 className='text-center text-secondary mt-3'>to jeden ze sposobów zmniejszenia kosztów w firmach transportowych.</h5>
                    <hr></hr>
            </div>

            <div className= "d-flex mt-5 justify-content-center">
                <div className="card" style={{width: "35rem"}}>
                    <img className="card-img-top" src={effectiveDriveDark} alt=""/>
                    <div className="card-body">
                        <h5 className="card-title text-center">Kontrola utrzymania normy spalania to podstawa ekonomicznej przyszłości każdej firmy transportowej.</h5>                                             
                    </div>
                </div> 
            </div>

            <div className= "d-flex-row mt-5">
                <div className="p-2">
                    <h2 className="text-danger">System kontroli 40ton.online</h2>
                </div>                              
                <div className="p-2">
                    <p className="text-justify text-secondary">
                    Program przeznaczony jest dla firm transportowych, dla których istotna jest analiza kosztów wynikających z efektywnego sposobu prowadzenie pojazdów. Podstawą działania aplikacji jest obliczanie średnich rzeczywistego zużycia paliwa oraz wyliczanie norm spalania uzależnionych od wagi przewożonego ładunku na poszczególnych odcinkach tras dla każdego pojazdu i dla każdego kierowcy firmy. Oznacza to, że brane są pod uwagę procentowe udziały odcinków z danym obciążeniem w całości trasy i w wyniku obliczeń otrzymujemy normę do porównania z rzeczywistym zużyciem paliwa.
                    </p>
                </div>
            </div>

            <div className= "d-flex-row mt-4 justify-content-center">
                <div>
                    <h6 className="p-2 text-center text-danger">System posiada cztery typy porównywania danych dla pojazdów i dla kierowców, które odwzorowywane są graficznie w postaci wykresów.
                    </h6>
                </div>
                <div>
                    <img src={normLoad} className="img-fluid mx-auto d-block" alt=""/>
                </div>
                <div className="mt-3">
                    <p className="p-2 text-justify text-secondary">
                    Przykładowe zestawienie okresowe efektywności dla wszystkich wprowadzonych do systemu pojazdów. Wykres obrazuje stopień utrzymania normy dla zależności: spalanie rzeczywiste pojazdu w stosunku do obliczonego spalania przy danym obciążeniu. W tym przypadku im mniejszy współczynnik tym bardziej efektywna jest praca pojazdu, wskazania powyżej wartości 1 oznaczają przekrocznie normy. Ustawienie daty początkowej pozwala na zawężenie "od dołu" okresu obliczeniowego tak aby uzyskać raport wsteczny za miesiąc, kwartał czy dowolny czas do dnia bieżącego.
                    </p>
                </div>
                <div className="mt-2">
                    <p className="p-2 text-justify text-secondary">
                    Jednym ze sposobów na obniżenie kosztów paliwa jest nauka kierowców ekonomicznej jazdy (tak zwany eco-driving). Umiejętność utrzymywania optymalnej prędkości, prawidłowy sposób przyspieszenia, hamowania i pokonywania wzniesień to tylko początek tego jak kierowca może optymalizować spalanie. Jeśli firma będzie zarabiała pieniądze, a analiza danych poprzez nasz system wykaże, że kierowca prowadzi ekonomicznie, to taki pracownik może liczyć na rekompensatę.
                    </p>
                </div>    
            </div>
            <hr></hr>

            <div className= "d-flex-row mt-5 pl-3">                
                <h2 className="text-danger">Aplikacja - Panel kierowcy</h2>
                <div className="">
                    <p className="text-justify text-secondary">Jeden z najważniejszych elementów szybkiego i wydajnego działania programu opiera się na danych wprowadzanych poprzez aplikację "Panel kierowcy",która jest udostępniana każdemu kierowcy na telefonie firmowym. Telefon musi mieć zainstalowaną przeglądarkę Chrome oraz podstawowy dostęp do internetu aby móc na bieżąco przesyłać dane do bazy firmy. Bezpłatna wersja programu dostępna jest po zarejestrowaniu firmy poprzez panel Rejestracja. Więcej informacji na temat działania systemu znajduje się w dziale Instrukcje i szczegółowy opis aplikacji.
                    </p>
                </div>
            </div>




            <div className= "row mt-5 justify-content-center">

                <div className="card p-3 m-3" style={{width: "13.3rem"}}>
                    <img className="card-img-top" src={phonePanel1} alt=""/>
                    <div className="card-body">
                    <p className="card-text">Panel logowania kierowcy do systemu</p>                        
                    </div>
                </div>

                <div className="card p-3 m-3" style={{width: "13.3rem"}}>
                    <img className="card-img-top" src={phonePanel2} alt=""/>
                    <div className="card-body">
                    <p className="card-text">Panel czynności wraz z ostatnim wpisem pojazdu</p>                        
                    </div>
                </div>

                <div className="card p-3 m-3" style={{width: "13.3rem"}}>
                    <img className="card-img-top" src={phonePanel5} alt=""/>
                    <div className="card-body">
                    <p className="card-text">Przykładowy panel dla czynności tankowanie</p>                        
                    </div>
                </div>    
            </div>

            <div className= "d-flex-row mt-4">                                           
                <div className="p-2">
                    <p className="text-justify text-secondary">Dane przesyłane przez aplikację zapisywane są w bazie danych klienta i mogą być doskonałym źródłem szczegóowych informacji na temat każdej trasy pojazdu. Nasz system udostępnia dane w postaci gotowych tabel zawierających datę, kierowcę, rodzaj czynności (załadunek, rozładunek, tankowanie, zmiana kierowcy), wagę ładunku, ilość tankowanego paliwa, stan licznika, kod pocztowy oraz kraj. Istnieje możliwość wydruku tabeli dla każdego pojazdu w zadanym okresie, co umożliwia zastąpienie stosowanych jeszcze często papierowych kart drogowych wypełnianych przez kierowców. 
                    </p>
                    <p className="text-justify text-secondary">W przypadku kiedy kierowcy firmy nie są wyposażeni w telefony typu smartfon z podstawowym dostępem do internetu istnieje możliwość "ręcznego" wpisywania tras poprzez osobę obsługującą system w firmie porzez panel udostępniony w systemie klienta. 
                    </p>
                </div>
            </div>
            
            <hr></hr>

            <div className= "d-flex-row mt-4 justify-content-center">
                <div>
                    <h6 className="p-2 text-center text-danger">Dzięki aplikacji firma otrzymuje dokładne rozliczenie paliwowe każdej trasy wraz z danymi umożliwiającymi ocenę efektywności każdego kierowcy.
                    </h6>
                </div>
                <div>
                    <img src={efficientDrivers} className="img-fluid mx-auto d-block" alt=""/>
                </div>
                <div className="mt-3">
                    <p className="p-2 text-justify text-secondary">
                    Wykres porównawczy utrzymania normy dla wielu wybranych kierowców. Na jednym układzie współrzędnych można umieścić wyliczenia stopnia utrzymania normy kilku kierowców w celu analizy różnic pomiędzy efektywnością ich jazdy. Wykres jasno ilustruje różnice w efektywności różnych kierowców. Do obliczeń norm przyjmowane są wartości średniej zużycia paliwa dla zestawu bez ładunku oraz współczynnika zwiększenia spalania "od tony ładunku". Wartości te przyjęto na poziomie: 24 l/100 km dla zestawu bez ładunku oraz wzrost 0,4 l dla każdej tony przewożonego ładunku, jednak każda z nich może być ustawiona indywidualnie przez użytkownika dla różnych pojazdów firmy.
                    </p>
                </div>                 
            </div>
            <hr></hr>

            <div className= {["row mt-5 justify-content-center"].join(' ')}>
                
                <div className="card m-3" style={{width: "20rem"}}>
                    <img className="card-img-top" src={successCharts} alt=""/>
                    <div className="card-body">
                        <h5 className="card-title">Wersja Demo</h5>
                        <p className="card-text">Zapraszamy do zapoznania się z funkcjonalością systemu poprzez wersję demonstarcyjną.</p>
                        <button className="btn btn-primary">Demo</button>
                    </div>
                </div>

                <div className="card m-3" style={{width: "20rem"}}>
                    <img className="card-img-top" src={succsessBusines} alt=""/>
                    <div className="card-body">
                        <h5 className="card-title">40 dni gratis</h5>
                        <p className="card-text">Rejestracja pozwala na bezpłatne testowanie aplikacji dla każdego pojazdu firmy przez 40 dni. </p>
                        <button className="btn btn-primary">SignIn</button>
                    </div>
                </div>

            </div>

            <div className="card">
                <h5 className="card-header">Featured</h5>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <button className="btn btn-primary">Go somewhere</button>
                </div>
            </div>
            
        </div>
    
    )
}
export default Main;