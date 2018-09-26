import React, { Component } from 'react';
import data from '../../data-layer/data';

import fonImgSrc from './img/fon.jpg';
import cafeImgSrc from './img/cafe.jpg';
import closedPromoImgSrc from './img/closed-promo.jpg';
import questionImgSrc from './img/question.jpg';
import starsImgSrc from './img/stars.jpg';
import teaImgSrc from './img/tea.jpg';
import vilageImgSrc from './img/village.png';

import './App.css';

const { defaultPromo } = data;
let promoCodesFromData = data.promoCodes;
const localStorage = window.localStorage;
const PROMO_CODES_LOCAL_STORAGE = 'promoCodes';

const imageUrlsForPromo = {
	cafe: cafeImgSrc,
	closedPromo: closedPromoImgSrc,
	question: questionImgSrc,
	stars: starsImgSrc,
	tea: teaImgSrc,
	village: vilageImgSrc,
};

if (localStorage) {
	try {
		const promoCodesFromStorage = localStorage.getItem(PROMO_CODES_LOCAL_STORAGE);

		if (promoCodesFromStorage) {
			promoCodesFromData = JSON.parse(promoCodesFromStorage);
		} else {
			localStorage.setItem(PROMO_CODES_LOCAL_STORAGE, JSON.stringify(promoCodesFromData));
		}
	} catch(error) {
		console.log(error);
	}
}

const VIEWPORT_DESKTOP = 'viewport-desktop';
const VIEWPORT_MOBILE = 'viewport-mobile';

const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const viewport = windowWidth > 650 ? VIEWPORT_DESKTOP : VIEWPORT_MOBILE;

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			promoCode: '',
			promoCodes: promoCodesFromData,
			showPromoCodeDialog: false,
			showHamburgerMenu: false,
		};
	}

	onNavLinkClick = ({ linkId }) => (e) => {
		e.preventDefault();

		const elem = document.getElementById(linkId);
		const rect = elem.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		window.scrollTo({
			top: rect.top + scrollTop,
			behavior: "smooth"
		});
	};

	onInputChange = (e) => {
		const value = e.target.value;

		this.setState({
			promoCode: value,
		});
	};

	onInputKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.getPromo();
		}
	};

	onCloseIconClick = () => {
		this.setState({
			showPromoCodeDialog: false,
		});
	};

	onHamburgerMenuClick = () => {
		this.setState(({ showHamburgerMenu }) => ({
			showHamburgerMenu: !showHamburgerMenu,
		}));
	};

	getPromo = () => {
		this.setState((prevState) => {
			const { promoCode, promoCodes } = prevState;
			const newPromos = promoCodes.map((promo) => {
				const { code } = promo;

				if (code === promoCode) {
					return {
						...promo,
						isOpen: true,
					};
				}

				return promo;
			});

			try {
				localStorage.setItem(PROMO_CODES_LOCAL_STORAGE, JSON.stringify(newPromos));
			} catch (error) {
				console.log(error);
			}

			return {
				showPromoCodeDialog: true,
				promoCodes: newPromos,
			};
		});
	};

	openPromoDialog = (promoCode) => () => {
		this.setState({
			promoCode,
			showPromoCodeDialog: true,
		})
	}

	renderArticles() {
		const { promoCodes } = this.state;

		return promoCodes.map((promo, index) => {
			const { isOpen } = promo;
			let title;
			let place;
			let src;
			let alt;
			let code;
			let time;

			if (isOpen) {
				({ code, title, time, place, src, alt } = promo);
			} else {
				({ title, place, src, alt } = defaultPromo);
			}

			return (
				<div key={index} className="article" onClick={isOpen ? this.openPromoDialog(code) : () => {}}>
					<img src={imageUrlsForPromo[src]} alt={alt} className="article__image" />
					<h4 className="article__title">
						{title}
					</h4>
					<div className="article__description">
						<div className="dialog__time">
							{time}
						</div>
						<div>
							{place}
						</div>
					</div>
				</div>
			);
		});
	}

	renderNavigationSection() {
		const navigationLinks = [
			{
				id: 'home',
				name: 'Day4You',
			},
			{
				id: 'promo',
				name: 'Вввести промо-код',
			},
			{
				id: 'description',
				name: 'Открытые промо-коды',
			},
			{
				id: 'contacts',
				name: 'О нас',
			}
		];

		const navLinks = ({ classNames = [] } = {}) => (
			<ul className={`navigation-links ${classNames.join(' ')}`}>
				{navigationLinks.map((link, index) => {
					const { id, name } = link;

					return (
						<li
							onClick={this.onNavLinkClick({ linkId: id })}
							className="navigation-item"
							key={index}>
							<a className="navigation-item__link" target="_self" href={`#${id}`}>
								{name}
							</a>
						</li>
					);
				})}
			</ul>
		);

		if (viewport === VIEWPORT_MOBILE) {
			const { showHamburgerMenu } = this.state;
			const classNames = showHamburgerMenu ? ['navigation-links--expanded'] : [];

			return (
				<nav className="navigation-panel navigation-panel--mobile">
					<button
						className={`hamburger-menu ${showHamburgerMenu ? 'hamburger-menu--expanded' : ''}`}
				        onClick={this.onHamburgerMenuClick}
					>
						<div className="bar1" />
						<div className="bar2" />
						<div className="bar3" />
					</button>
					{navLinks({ classNames })}
				</nav>
			);
		}

		return (
			<nav className="navigation-panel">
				<div className="app-container">
					{navLinks()}
				</div>
			</nav>
		)
	}

	renderPromoCodeDialog({ promo } = {}) {
		const {
			promoCode,
			promoCodes,
			showPromoCodeDialog,
		} = this.state;

		if (!showPromoCodeDialog) {
			return null;
		}

		const selectedPromo = promoCodes.find(({ code }) => code === promoCode);
		let title = 'Неверный промо-код';
		let description = 'Вы ввели неверный промо-код. Проверьте введенные и попробуйте еще раз.';
		let src = defaultPromo.src;
		let alt = '';
		let time = '';
		let place = '';
		let placeUrl = '';

		if (selectedPromo) {
			({ title, time, place, placeUrl, description, src, alt } = selectedPromo)
		}

		return (
			<div className="modal-dialog">
				<div className="modal-overlay"/>
				<div className="dialog-overlay" >
					<div className="dialog">
						<div className="dialog__header">
							<span className="dialog__header-text">
								{title}
							</span>
						</div>
						<div className="dialog__body">
							<div className="dialog__body-description">
								<div className="dialog__image-container">
									<img src={imageUrlsForPromo[src]} alt={alt} className="dialog__image" />
								</div>
								<div className="dialog__text">
									<div className="dialog__time">
										{time}
									</div>
									<div className="dialog__place" onClick={() => { window.open(placeUrl, '_blank'); }}>
										{place}
									</div>
									<div className="dialog__description">
										{description}
									</div>
								</div>
							</div>
						</div>
						<span
							onClick={this.onCloseIconClick}
							className="close-icon"
						/>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const {
			promoCode,
		} = this.state;

		return (
			<div className={`app ${viewport}`}>
				<header className="app__header">
					{this.renderNavigationSection()}
				</header>
				<main className="app__main">
					<div className="title-section" style={{ backgroundImage: `url(${fonImgSrc})` }} id="home">
						<div className="app-container">
							<h2 className="title-section__header">Day For You</h2>
						</div>
					</div>
					<div className="congrats-section">
						<div className="app-container">
							<h2 className="congrats-section__title">
								Поздравляем, ваш день 28.09.2018г.! 
							</h2>
							<div className="congrats-section__description">
								Вы стали победителем рекламной игры  от сети наших партнёров. От Вас требуется только наличие свободного времени и желание хорошо провести  день. 
								Промо-коды буду действительны только в течение одного дня 28 сентября 2018г. Все наши мероприятия являются для Вас абсолютно бесплатными и доступны к посещению компанией  до 2-х человек. 
								<br />
								Правила использования промо-кодов:
								<ol className="steps-list">
									<li>
										Активируйте полученный промо-код на сайте day4you.by.
									</li>
									<li>
										Предоставить карточку с промо-кодом в месте проведения мероприятия. 
									</li>
									<li>
										После каждого посещенного мероприятия, Вы получаете карту для активации последующего промо-кода. 
									</li>
								</ol>

								Желаем Вам хорошего дня)
							</div>
						</div>
					</div>
					<div className="promo-section" id="promo">
						<div className="app-container">
							<div className="promo-section__form">
								<label className="promo-label" htmlFor="promo-code-input">
									Введите промо-код:
								</label>
								<input
									value={promoCode}
									id="promo-code-input"
									className="promo-section__input"
									type="text"
									onChange={this.onInputChange}
									onKeyPress={this.onInputKeyPress}
									maxLength={8}
								/>
								<button
									onClick={this.getPromo}
									className="promo-button"
								>
									Посмотреть промо-код
								</button>
							</div>
						</div>
					</div>
					<div className="project-description-section" id="description">
						<div className="app-container">
							<div className="description-section">
								<h3 className="description__title">
									Открытые промо-коды
								</h3>
								<div className="description__body">
									{this.renderArticles()}
								</div>
							</div>
						</div>
					</div>
				</main>
				<footer className="app__footer" id="contacts">
					<div className="app-container">
						<div className="footer__text">
						Ваша жизнь — это комплекс действий, решений и идей. Опыт, который вы получаете на протяжении своей жизни, зависит только от того, как вы выстраиваете свой день. Любые события способны превратить вашу жизнь в прекрасный калейдоскоп событий. Даже самые незначительные решения помогут вам достичь самой далёкой цели. 
						<br />
						<br />
						администрация day4you.by 
						<br />
						<br />
							<div className="footer__email">
								E-mail: <a href="mailto:280918@day4you.by">280918@day4you.by</a> 
							</div>
							<div className="web-development">
								Веб разработка <a href="https://www.linkedin.com/in/hleb-shautsou-1726ba109/" target="_blank">Lamsbeg Group</a>
							</div>
						</div>
					</div>
				</footer>
				{this.renderPromoCodeDialog()}
			</div>
		);
	}
}

export default App;
