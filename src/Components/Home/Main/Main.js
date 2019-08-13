import React, { useContext, useState } from 'react';
import AppContext from '../../../context/app-context';
import classes from './Main.css';
import fuelEfficient_pl from '../../../assets/img/fuel_efficient_pl.jpg';
import fuelEfficient_es from '../../../assets/img/fuel_efficient_es.jpg';
import allRoutes_pl from '../../../assets/img/all_routes_pl.jpg';
import allRoutes_es from '../../../assets/img/all_routes_es.jpg';
import phonePanel1_pl from '../../../assets/img/panel1_pl.jpg';
import phonePanel2_pl from '../../../assets/img/panel2_pl.jpg';
import phonePanel3_pl from '../../../assets/img/panel3_pl.jpg';
import phonePanel1_es from '../../../assets/img/panel1_es.jpg';
import phonePanel2_es from '../../../assets/img/panel2_es.jpg';
import phonePanel3_es from '../../../assets/img/panel3_es.jpg';
import effectiveDriveDark from '../../../assets/img/effectiveDriveDark.jpg';
import successCharts from '../../../assets/img/successCharts.jpg';
import succsessBusines from '../../../assets/img/succsessBusines.jpg';
import contactUs from '../../../assets/img/contact-us.jpg';
import oneTruck_pl from '../../../assets/img/one_truck_pl.jpg';
import oneTruck_es from '../../../assets/img/one_truck_es.jpg';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

const Main = props => {

	const { setShowContactForm, setShowRegister } = useContext(AppContext);
	const [showRegulations, setShowRegulations] = useState(false);
	const [showPolicy, setShowPolicy] = useState(false);
	const onDemoHandler = () => {
		const data = {
			email: props.demoData.email,
			password: props.demoData.pass,
			_csrf: props._csrf
		};
		props.onDemo(data);
	};

	return (
		<main className="container">

			<section id="section_1">
				<div className="d-flex-row mt-5">
					<h1 className='text-center text-danger'>{props.text.section_1_h1}</h1>
					<h5 className='text-center text-secondary mt-3'>{props.text.section_1_h5}</h5>
					<hr></hr>
				</div>
			</section>

			<section id="section_2">
				<div className="d-flex mt-5 justify-content-center">
					<div className="card" style={{ width: "35rem" }}>
						<img className="card-img-top" src={effectiveDriveDark} alt="" />
						<div className="card-body">
							<h5 className="card-title text-center">{props.text.section_2_h5}</h5>
						</div>
					</div>
				</div>
			</section>

			<section id="section_3">
				<article>
					<div className="d-flex-row mt-5">
						<div className="p-2">
							<h2 className="text-danger">{props.text.section_3_h2}</h2>
						</div>
						<div className="p-2">
							<p className="text-justify text-secondary">{props.text.section_3_p}</p>
						</div>
					</div>
				</article>
			</section>

			<section id="section_4">
				<article>
					<div className="d-flex-row mt-4 justify-content-center">
						<div>
							<h6 className="p-2 text-center text-danger">{props.text.section_4_h6}</h6>
						</div>
						<div>
							<img src={props.lang === 'pl' ? fuelEfficient_pl : fuelEfficient_es} className="img-fluid mx-auto d-block" alt="" />
						</div>
						<div className="mt-3">
							<p className="p-2 text-justify text-secondary">{props.text.section_4_p1}</p>
						</div>
						<div className="mt-2">
							<p className="p-2 text-justify text-secondary">{props.text.section_4_p2}</p>
						</div>
					</div>
				</article>
			</section>

			<hr></hr>

			<section id="section_5">
				<div className="d-flex-row mt-5 justify-content-center">
					<article>
						<div>
							<h6 className="p-2 text-center text-danger">{props.text.section_5_h6}</h6>
						</div>
						<div>
							<img src={props.lang === 'pl' ? oneTruck_pl : oneTruck_es} className="img-fluid mx-auto" alt="" />
						</div>
						<div className="mt-3">
							<p className="p-2 text-justify text-secondary">{props.text.section_5_p}</p>
						</div>
					</article>
				</div>
			</section>

			<hr></hr>

			<section id="section_6">
				<div className="d-flex-row mt-5 pl-3">
				
					<article>
						<h2 className="text-danger">{props.text.section_6_h2}</h2>
						<div className="">
							<p className="text-justify text-secondary">{props.text.section_6_p}</p>
						</div>
					</article>
				</div>
			</section>
			
			<section id="section_7">
				<div className="row mt-5 justify-content-center">
					
					<div className="card p-3 m-3" style={{ width: "15.3rem", boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)" }}>
						<img className="card-img-top" src={props.lang === 'pl' ? phonePanel1_pl : phonePanel1_es} alt="" />
						<div className="card-body">
							<h6 className="card-title">{props.text.section_7_t1}</h6>
							<p className="card-text">{props.text.section_7_p1}</p>
						</div>
					</div>

					<div className="card p-3 m-3" style={{ width: "15.3rem", boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)" }}>
						<img className="card-img-top" src={props.lang === 'pl' ? phonePanel2_pl : phonePanel2_es} alt="" />
						<div className="card-body">
							<h6 className="card-title">{props.text.section_7_t2}</h6>
							<p className="card-text">{props.text.section_7_p2}</p>
						</div>
					</div>

					<div className="card p-3 m-3" style={{ width: "15.3rem", boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)" }}>
						<img className="card-img-top" src={props.lang === 'pl' ? phonePanel3_pl : phonePanel3_es} alt="" />
						<div className="card-body">
							<h6 className="card-title">{props.text.section_7_t3}</h6>
							<p className="card-text">{props.text.section_7_p3}</p>
						</div>
					</div>

				</div>
			</section>

			<section id="section_8">
				<div className="row mt-2">
					<h3 className="text-danger m-3">{props.text.section_8_h3}</h3>
				</div>
			</section>

			<section id="section_9">
				<article>
					<div className="row m-0">
						<div className="card pr-2 mr-3" style={{ width: "40%", border: "none" }}>
							<div className="card-body pl-1">
								<p className="text-justify text-secondary">{props.text.section_9_p1}</p>
								<p className="text-justify text-secondary">{props.text.section_9_p2}</p>
							</div>
						</div>
						<div className="card m-3 pl-5" style={{ width: "50%", border: "none" }}>
							<div className="card-body" style={{ padding: 0 }}>
								<div className={props.lang === 'pl' ?  classes.HandPhone_pl : classes.HandPhone_es}>
									<div className={classes.Hand}></div>
									<div className={props.lang === 'pl' ? classes.Phone_pl : classes.Phone_es}></div>
								</div>
							</div>
						</div>
						<div>
							<h3 className="text-danger mt-5">{props.text.section_9_h3}</h3>
							<img src={props.lang === 'pl' ? allRoutes_pl : allRoutes_es} className="img-fluid mx-auto" alt="" />
						</div>
					</div>
				</article>
			</section>			

			<hr></hr>

			<section id="section_10">
				<div className="row mt-2">
					<h3 className="text-danger m-3">{props.text.section_10_h3}</h3>
				</div>

				<div className={["row justify-content-center"].join(' ')}>
					<div className="card m-3" style={{ width: "20rem" }}>
						<img className="card-img-top" src={successCharts} alt="" />
						<div className="card-body">
							<h5 className="card-title">{props.text.section_10_card_1_h5}</h5>
							<p className="card-text">{props.text.section_10_card_1_p}</p>
							<button
								onClick={() => onDemoHandler()}
								className="btn btn-outline-info btn-sm">
								{props.text.section_10_card_1_button}
							</button>
						</div>
					</div>

					<div className="card m-3" style={{ width: "20rem" }}>
						<img className="card-img-top" src={succsessBusines} alt="" />
						<div className="card-body">
							<h5 className="card-title">{props.text.section_10_card_2_h5}</h5>
							<p className="card-text">{props.text.section_10_card_2_p}</p>
							<button
								onClick={() => setShowRegister(true)}
								className="btn btn-outline-info btn-sm">
								{props.text.section_10_card_2_button}
							</button>
						</div>
					</div>

					<div className="card m-3" style={{ width: "20rem" }}>
						<img className="card-img-top" src={contactUs} alt="" />
						<div className="card-body">
							<h5 className="card-title">{props.text.section_10_card_3_h5}</h5>
							<p className="card-text">{props.text.section_10_card_3_p}</p>
							<button
								onClick={() => setShowContactForm(true)}
								className="btn btn-outline-info btn-sm">
								{props.text.section_10_card_3_button}
							</button>
						</div>
					</div>
				</div>
			</section>
			
			<hr></hr>

			<footer>
				<div className="card m-5">
					<h5 className="card-header">{props.text.footer_header}</h5>
					<div className="card-body m-3">
						<h5 className="card-title">{props.text.footer_body_h5}</h5>
						<p className="card-text">{props.text.footer_body_p1}</p>
						<p className="card-text">{props.text.footer_body_p2}</p>
						<button
							className="btn btn-outline-secondary btn-sm mr-3"
							onClick={() => {
								if (showPolicy) setShowPolicy(false)
								setShowRegulations(!showRegulations)
							}}>
							{props.text.regTitle}
						</button>
						<button
							className="btn btn-outline-secondary btn-sm"
							onClick={() => {
								if (showRegulations) setShowRegulations(false);
								setShowPolicy(!showPolicy)
							}}>
							{props.text.policyTitle}
						</button>

						<div className="card m-5" hidden={!showRegulations} >
							<h5 className="card-header">{props.text.regTitle}</h5>
							<div className="card-body m-3" dangerouslySetInnerHTML={{ __html: props.text.regulations }}></div>
							<button
								className="btn btn-outline-secondary btn-sm"
								onClick={() => setShowRegulations(!showRegulations)}>
								{props.text.back}
							</button>
						</div>

						<div className="card m-5" hidden={!showPolicy} >
							<h5 className="card-header">{props.text.policyTitle}</h5>
							<div className="card-body m-3" dangerouslySetInnerHTML={{ __html: props.text.policy }}></div>
							<button
								className="btn btn-outline-secondary btn-sm"
								onClick={() => setShowPolicy(!showPolicy)}>
								{props.text.back}
							</button>
						</div>
					</div>
				</div>
			</footer>			
		</main>
	)
};
const mapStateToProps = state => {
	return {
		demoData: state.initLang.textHome.demoData,
		_csrf: state.initLang._csrf,
		lang: state.initLang.language,
		text: state.initLang.textHomeInside
	}
};
const mapDispatchToProps = dispatch => {
	return {
		onDemo: (data) => dispatch(actions.authProcess(data))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);