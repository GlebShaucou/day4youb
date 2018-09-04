import React, { Component } from 'react';
import data from '../../data-layer/data';
import './App.css';

const { defaultPromo } = data;
let promoCodesFromData = data.promoCodes;
const localStorage = window.localStorage;
const PROMO_CODES_LOCAL_STORAGE = 'promoCodes';

if (localStorage) {
	const promoCodesFromStorage = localStorage.getItem(PROMO_CODES_LOCAL_STORAGE);

	if (promoCodesFromStorage) {
		promoCodesFromData = JSON.parse(promoCodesFromStorage);
	} else {
		localStorage.setItem(PROMO_CODES_LOCAL_STORAGE, JSON.stringify(promoCodesFromData));
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

			localStorage.setItem(PROMO_CODES_LOCAL_STORAGE, JSON.stringify(newPromos));

			return {
				showPromoCodeDialog: true,
				promoCodes: newPromos,
			};
		});
	};

	renderArticles() {
		const { promoCodes } = this.state;

		return promoCodes.map((promo, index) => {
			const { isOpen } = promo;
			let title;
			let description;
			let src;
			let alt;

			if (isOpen) {
				({ title, description, src, alt } = promo);
			} else {
				({ title, description, src, alt } = defaultPromo);
			}

			return (
				<div key={index} className="article">
					<img src={src} alt={alt} className="article__image" />
					<h4 className="article__title">
						{title}
					</h4>
					<div className="article__description">
						{description}
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

	renderPromoCodeDialog() {
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

		if (selectedPromo) {
			({ title, description, src, alt } = selectedPromo)
		}

		return (
			<div className="modal-dialog">
				<div className="modal-overlay" />
				<div className="dialog-overlay">
					<div className="dialog">
						<div className="dialog__header">
							<span className="dialog__header-text">
								{title}
							</span>
						</div>
						<div className="dialog__body">
							<div className="dialog__body-description">
								<div className="dialog__image-container">
									<img src={src} alt={alt} className="dialog__image" />
								</div>
								<p className="dialog__text">
									{description}
								</p>
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
					<div className="title-section" id="home">
						<div className="app-container">
							<h2 className="title-section__header">Day For You</h2>
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
						footer
					</div>
				</footer>
				{this.renderPromoCodeDialog()}
			</div>
		);
	}
}

export default App;
